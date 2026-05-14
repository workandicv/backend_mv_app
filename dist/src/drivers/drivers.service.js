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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DriversService = class DriversService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAvailable(latitude, longitude) {
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
        return drivers.map((driver) => ({
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
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                driverProfile: true,
            },
        });
        if (!user || !user.driverProfile) {
            throw new common_1.NotFoundException('Driver not found');
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
    async updateStatus(userId, updateStatusDto) {
        const driverProfile = await this.prisma.driverProfile.findUnique({
            where: { userId },
        });
        if (!driverProfile) {
            throw new common_1.NotFoundException('Driver profile not found');
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
    async updateLocation(userId, updateLocationDto) {
        const driverProfile = await this.prisma.driverProfile.findUnique({
            where: { userId },
        });
        if (!driverProfile) {
            throw new common_1.NotFoundException('Driver profile not found');
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
};
exports.DriversService = DriversService;
exports.DriversService = DriversService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DriversService);
//# sourceMappingURL=drivers.service.js.map