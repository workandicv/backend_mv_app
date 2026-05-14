import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async findAvailable(latitude?: number, longitude?: number) {
    const drivers = await this.prisma.driverProfile.findMany({
      where: {
        isAvailable: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            photoUrl: true,
          },
        },
      },
    });

    return drivers.map((driver: { user: { id: any; name: any; photoUrl: any; }; vehicleModel: any; vehiclePlate: any; vehicleColor: any; rating: any; totalRides: any; currentLatitude: any; currentLongitude: any; }) => ({
      id: driver.user.id,
      name: driver.user.name,
      photoUrl: driver.user.photoUrl,
      vehicleModel: driver.vehicleModel,
      vehiclePlate: driver.vehiclePlate,
      vehicleColor: driver.vehicleColor,
      rating: driver.rating,
      totalRides: driver.totalRides,
      currentLatitude: driver.currentLatitude,
      currentLongitude: driver.currentLongitude,
    }));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        driverProfile: true,
      },
    });

    if (!user || !user.driverProfile) {
      throw new NotFoundException('Driver not found');
    }

    return {
      id: user.id,
      name: user.name,
      photoUrl: user.photoUrl,
      phone: user.phone,
      vehicleModel: user.driverProfile.vehicleModel,
      vehiclePlate: user.driverProfile.vehiclePlate,
      vehicleColor: user.driverProfile.vehicleColor,
      rating: user.driverProfile.rating,
      totalRides: user.driverProfile.totalRides,
    };
  }

  async updateStatus(userId: string, updateStatusDto: UpdateStatusDto) {
    const driverProfile = await this.prisma.driverProfile.findUnique({
      where: { userId },
    });

    if (!driverProfile) {
      throw new NotFoundException('Driver profile not found');
    }

    const updated = await this.prisma.driverProfile.update({
      where: { userId },
      data: {
        isAvailable: updateStatusDto.isAvailable,
        currentLatitude: updateStatusDto.currentLatitude,
        currentLongitude: updateStatusDto.currentLongitude,
      },
    });

    return {
      isAvailable: updated.isAvailable,
      currentLatitude: updated.currentLatitude,
      currentLongitude: updated.currentLongitude,
    };
  }

  async updateLocation(userId: string, updateLocationDto: UpdateLocationDto) {
    const driverProfile = await this.prisma.driverProfile.findUnique({
      where: { userId },
    });

    if (!driverProfile) {
      throw new NotFoundException('Driver profile not found');
    }

    const updated = await this.prisma.driverProfile.update({
      where: { userId },
      data: {
        currentLatitude: updateLocationDto.latitude,
        currentLongitude: updateLocationDto.longitude,
      },
    });

    return {
      currentLatitude: updated.currentLatitude,
      currentLongitude: updated.currentLongitude,
    };
  }
}