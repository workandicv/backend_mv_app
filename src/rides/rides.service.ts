import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { CompleteRideDto } from './dto/complete-ride.dto';
import { CancelRideDto } from './dto/cancel-ride.dto';
import { RateRideDto } from './dto/rate-ride.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class RidesService {
  private readonly logger = new Logger(RidesService.name);

  constructor(private prisma: PrismaService) {}

  // Calculate distance using Haversine formula (in km)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Calculate price: Base fare 200 CVE + 50 CVE per km
  private calculatePrice(distance: number): number {
    const baseFare = 200;
    const perKm = 50;
    return baseFare + distance * perKm;
  }

  // Estimate duration (assuming average speed of 40 km/h)
  private estimateDuration(distance: number): number {
    const avgSpeed = 40; // km/h
    return Math.round((distance / avgSpeed) * 60); // minutes
  }

  async create(passengerId: string, createRideDto: CreateRideDto) {
    const distance = this.calculateDistance(
      createRideDto.pickupLatitude,
      createRideDto.pickupLongitude,
      createRideDto.destinationLatitude,
      createRideDto.destinationLongitude,
    );

    const estimatedPrice = this.calculatePrice(distance);
    const estimatedDuration = this.estimateDuration(distance);

    const ride = await this.prisma.ride.create({
      data: {
        passengerId,
        pickupAddress: createRideDto.pickupAddress,
        pickupLatitude: createRideDto.pickupLatitude,
        pickupLongitude: createRideDto.pickupLongitude,
        destinationAddress: createRideDto.destinationAddress,
        destinationLatitude: createRideDto.destinationLatitude,
        destinationLongitude: createRideDto.destinationLongitude,
        distance,
        estimatedPrice,
        estimatedDuration,
        paymentMethod: createRideDto.paymentMethod,
        status: 'REQUESTED',
      },
    });

    this.logger.log(`Ride created: ${ride.id} by passenger ${passengerId}`);

    return {
      id: ride.id,
      passengerId: ride.passengerId,
      pickupAddress: ride.pickupAddress,
      destinationAddress: ride.destinationAddress,
      estimatedPrice: ride.estimatedPrice,
      distance: ride.distance,
      estimatedDuration: ride.estimatedDuration,
      status: ride.status,
      createdAt: ride.createdAt,
    };
  }

  async findAll(userId: string, userType: string, status?: string) {
    const where: any = {};
  
    if (userType === 'PASSENGER') {
      where.passengerId = userId;
    } else if (userType === 'DRIVER') {
      where.driverId = userId;
    }
  
    if (status) {
      where.status = status;
    }
  
    const rides = await this.prisma.ride.findMany({
      where,
      include: {
        passenger: {
          select: {
            id: true,
            name: true,
            phone: true,
            photoUrl: true,
          },
        },
        driver: {
          select: {
            id: true,
            name: true,
            phone: true,
            photoUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  
    const ridesWithDriverProfile = await Promise.all(
      rides.map(async (ride) => {
        if (!ride.driver) return ride;
  
        const driverProfile = await this.prisma.driverProfile.findUnique({
          where: { userId: ride.driver.id },
          select: {
            vehicleModel: true,
            vehiclePlate: true,
            rating: true,
          },
        });
  
        return {
          ...ride,
          driver: {
            ...ride.driver,
            ...driverProfile,
          },
        };
      }),
    );
  
    return ridesWithDriverProfile;
  }

  async findOne(id: string, userId: string, userType: string) {
    const ride = await this.prisma.ride.findUnique({
      where: { id },
      include: {
        passenger: {
          select: {
            id: true,
            name: true,
            phone: true,
            photoUrl: true,
          },
        },
        driver: {
          select: {
            id: true,
            name: true,
            phone: true,
            photoUrl: true,
          },
        },
      },
    });

    if (!ride) {
      throw new NotFoundException('Ride not found');
    }

    // Check if user has access to this ride
    if (ride.passengerId !== userId && ride.driverId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    // Include driver profile if driver exists
    if (ride.driver) {
      const driverProfile = await this.prisma.driverProfile.findUnique({
        where: { userId: ride.driver.id },
        select: {
          vehicleModel: true,
          vehiclePlate: true,
          vehicleColor: true,
          rating: true,
        },
      });

      return {
        ...ride,
        driver: {
          ...ride.driver,
          ...driverProfile,
        },
      };
    }

    return ride;
  }

  async accept(id: string, driverId: string) {
    const ride = await this.prisma.ride.findUnique({ where: { id } });

    if (!ride) {
      throw new NotFoundException('Ride not found');
    }

    if (ride.status !== 'REQUESTED') {
      throw new BadRequestException('Ride cannot be accepted in current status');
    }

    // Update driver availability to false
    await this.prisma.driverProfile.update({
      where: { userId: driverId },
      data: { isAvailable: false },
    });

    const updatedRide = await this.prisma.ride.update({
      where: { id },
      data: {
        driverId,
        status: 'ACCEPTED',
        acceptedAt: new Date(),
      },
    });

    this.logger.log(`Ride ${id} accepted by driver ${driverId}`);

    return {
      id: updatedRide.id,
      driverId: updatedRide.driverId,
      status: updatedRide.status,
      acceptedAt: updatedRide.acceptedAt,
    };
  }

  async start(id: string, driverId: string) {
    const ride = await this.prisma.ride.findUnique({ where: { id } });

    if (!ride) {
      throw new NotFoundException('Ride not found');
    }

    if (ride.driverId !== driverId) {
      throw new ForbiddenException('Only the assigned driver can start this ride');
    }

    if (ride.status !== 'ACCEPTED') {
      throw new BadRequestException('Ride cannot be started in current status');
    }

    const updatedRide = await this.prisma.ride.update({
      where: { id },
      data: { status: 'IN_PROGRESS' },
    });

    this.logger.log(`Ride ${id} started by driver ${driverId}`);

    return {
      id: updatedRide.id,
      status: updatedRide.status,
    };
  }

  async complete(id: string, driverId: string, completeRideDto: CompleteRideDto) {
    const ride = await this.prisma.ride.findUnique({ where: { id } });

    if (!ride) {
      throw new NotFoundException('Ride not found');
    }

    if (ride.driverId !== driverId) {
      throw new ForbiddenException('Only the assigned driver can complete this ride');
    }

    if (ride.status !== 'IN_PROGRESS') {
      throw new BadRequestException('Ride cannot be completed in current status');
    }

    const updatedRide = await this.prisma.ride.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        finalPrice: completeRideDto.finalPrice,
        completedAt: new Date(),
      },
    });

    // Update driver availability back to true
    await this.prisma.driverProfile.update({
      where: { userId: driverId },
      data: { isAvailable: true },
    });

    this.logger.log(`Ride ${id} completed by driver ${driverId}`);

    return {
      id: updatedRide.id,
      status: updatedRide.status,
      finalPrice: updatedRide.finalPrice,
      completedAt: updatedRide.completedAt,
    };
  }

  async cancel(id: string, userId: string, cancelRideDto: CancelRideDto) {
    const ride = await this.prisma.ride.findUnique({ where: { id } });

    if (!ride) {
      throw new NotFoundException('Ride not found');
    }

    if (ride.passengerId !== userId && ride.driverId !== userId) {
      throw new ForbiddenException('Only passenger or driver can cancel this ride');
    }

    if (ride.status === 'COMPLETED' || ride.status === 'CANCELLED') {
      throw new BadRequestException('Ride cannot be cancelled in current status');
    }

    const updatedRide = await this.prisma.ride.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
      },
    });

    // If driver was assigned, update their availability back to true
    if (ride.driverId) {
      await this.prisma.driverProfile.update({
        where: { userId: ride.driverId },
        data: { isAvailable: true },
      });
    }

    this.logger.log(`Ride ${id} cancelled by user ${userId}${cancelRideDto.reason ? ` - Reason: ${cancelRideDto.reason}` : ''}`);

    return {
      id: updatedRide.id,
      status: updatedRide.status,
      cancelledAt: updatedRide.cancelledAt,
    };
  }

  async rate(id: string, passengerId: string, rateRideDto: RateRideDto) {
    const ride = await this.prisma.ride.findUnique({ where: { id } });

    if (!ride) {
      throw new NotFoundException('Ride not found');
    }

    if (ride.passengerId !== passengerId) {
      throw new ForbiddenException('Only the passenger can rate this ride');
    }

    if (ride.status !== 'COMPLETED') {
      throw new BadRequestException('Only completed rides can be rated');
    }

    if (!ride.driverId) {
      throw new BadRequestException('Ride has no driver to rate');
    }

    // Check if already rated
    const existingRating = await this.prisma.rating.findUnique({
      where: { rideId: id },
    });

    if (existingRating) {
      throw new BadRequestException('Ride already rated');
    }

    const rating = await this.prisma.rating.create({
      data: {
        rideId: id,
        passengerId,
        driverId: ride.driverId,
        rating: rateRideDto.rating,
        comment: rateRideDto.comment,
      },
    });

    // Update driver's average rating and total rides
    const driverRatings = await this.prisma.rating.findMany({
      where: { driverId: ride.driverId },
    });

    const avgRating = driverRatings.reduce((sum: any, r: { rating: any; }) => sum + r.rating, 0) / driverRatings.length;

    await this.prisma.driverProfile.update({
      where: { userId: ride.driverId },
      data: {
        rating: avgRating,
        totalRides: { increment: 1 },
      },
    });

    this.logger.log(`Ride ${id} rated ${rateRideDto.rating} stars by passenger ${passengerId}`);

    return {
      id: rating.id,
      rideId: rating.rideId,
      rating: rating.rating,
      comment: rating.comment,
      createdAt: rating.createdAt,
    };
  }

  async updatePayment(id: string, userId: string, updatePaymentDto: UpdatePaymentDto) {
    const ride = await this.prisma.ride.findUnique({ where: { id } });

    if (!ride) {
      throw new NotFoundException('Ride not found');
    }

    if (ride.passengerId !== userId && ride.driverId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    const updatedRide = await this.prisma.ride.update({
      where: { id },
      data: { paymentStatus: updatePaymentDto.paymentStatus },
    });

    this.logger.log(`Ride ${id} payment status updated to ${updatePaymentDto.paymentStatus}`);

    return {
      id: updatedRide.id,
      paymentStatus: updatedRide.paymentStatus,
    };
  }
}