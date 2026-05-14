"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RidesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RidesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RidesService = RidesService_1 = class RidesService {
    prisma;
    logger = new common_1.Logger(RidesService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(lat1)) *
                Math.cos(this.toRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    calculatePrice(distance) {
        const baseFare = 200;
        const perKm = 50;
        return baseFare + distance * perKm;
    }
    estimateDuration(distance) {
        const avgSpeed = 40;
        return Math.round((distance / avgSpeed) * 60);
    }
    async create(passengerId, createRideDto) {
        const distance = this.calculateDistance(createRideDto.pickupLatitude, createRideDto.pickupLongitude, createRideDto.destinationLatitude, createRideDto.destinationLongitude);
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
    async findAll(userId, userType, status) {
        const where = {};
        if (userType === 'PASSENGER') {
            where.passengerId = userId;
        }
        else if (userType === 'DRIVER') {
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
        const ridesWithDriverProfile = await Promise.all(rides.map(async (ride) => {
            if (!ride.driver)
                return ride;
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
        }));
        return ridesWithDriverProfile;
    }
    async findOne(id, userId, userType) {
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
            throw new common_1.NotFoundException('Ride not found');
        }
        if (ride.passengerId !== userId && ride.driverId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
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
    async accept(id, driverId) {
        const ride = await this.prisma.ride.findUnique({ where: { id } });
        if (!ride) {
            throw new common_1.NotFoundException('Ride not found');
        }
        if (ride.status !== 'REQUESTED') {
            throw new common_1.BadRequestException('Ride cannot be accepted in current status');
        }
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
    async start(id, driverId) {
        const ride = await this.prisma.ride.findUnique({ where: { id } });
        if (!ride) {
            throw new common_1.NotFoundException('Ride not found');
        }
        if (ride.driverId !== driverId) {
            throw new common_1.ForbiddenException('Only the assigned driver can start this ride');
        }
        if (ride.status !== 'ACCEPTED') {
            throw new common_1.BadRequestException('Ride cannot be started in current status');
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
    async complete(id, driverId, completeRideDto) {
        const ride = await this.prisma.ride.findUnique({ where: { id } });
        if (!ride) {
            throw new common_1.NotFoundException('Ride not found');
        }
        if (ride.driverId !== driverId) {
            throw new common_1.ForbiddenException('Only the assigned driver can complete this ride');
        }
        if (ride.status !== 'IN_PROGRESS') {
            throw new common_1.BadRequestException('Ride cannot be completed in current status');
        }
        const updatedRide = await this.prisma.ride.update({
            where: { id },
            data: {
                status: 'COMPLETED',
                finalPrice: completeRideDto.finalPrice,
                completedAt: new Date(),
            },
        });
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
    async cancel(id, userId, cancelRideDto) {
        const ride = await this.prisma.ride.findUnique({ where: { id } });
        if (!ride) {
            throw new common_1.NotFoundException('Ride not found');
        }
        if (ride.passengerId !== userId && ride.driverId !== userId) {
            throw new common_1.ForbiddenException('Only passenger or driver can cancel this ride');
        }
        if (ride.status === 'COMPLETED' || ride.status === 'CANCELLED') {
            throw new common_1.BadRequestException('Ride cannot be cancelled in current status');
        }
        const updatedRide = await this.prisma.ride.update({
            where: { id },
            data: {
                status: 'CANCELLED',
                cancelledAt: new Date(),
            },
        });
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
    async rate(id, passengerId, rateRideDto) {
        const ride = await this.prisma.ride.findUnique({ where: { id } });
        if (!ride) {
            throw new common_1.NotFoundException('Ride not found');
        }
        if (ride.passengerId !== passengerId) {
            throw new common_1.ForbiddenException('Only the passenger can rate this ride');
        }
        if (ride.status !== 'COMPLETED') {
            throw new common_1.BadRequestException('Only completed rides can be rated');
        }
        if (!ride.driverId) {
            throw new common_1.BadRequestException('Ride has no driver to rate');
        }
        const existingRating = await this.prisma.rating.findUnique({
            where: { rideId: id },
        });
        if (existingRating) {
            throw new common_1.BadRequestException('Ride already rated');
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
        const driverRatings = await this.prisma.rating.findMany({
            where: { driverId: ride.driverId },
        });
        const avgRating = driverRatings.reduce((sum, r) => sum + r.rating, 0) / driverRatings.length;
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
    async updatePayment(id, userId, updatePaymentDto) {
        const ride = await this.prisma.ride.findUnique({ where: { id } });
        if (!ride) {
            throw new common_1.NotFoundException('Ride not found');
        }
        if (ride.passengerId !== userId && ride.driverId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
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
};
exports.RidesService = RidesService;
exports.RidesService = RidesService = RidesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RidesService);
//# sourceMappingURL=rides.service.js.map