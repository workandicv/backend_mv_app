import { PrismaService } from '../prisma/prisma.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { CompleteRideDto } from './dto/complete-ride.dto';
import { CancelRideDto } from './dto/cancel-ride.dto';
import { RateRideDto } from './dto/rate-ride.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class RidesService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    private calculateDistance;
    private toRadians;
    private calculatePrice;
    private estimateDuration;
    create(passengerId: string, createRideDto: CreateRideDto): Promise<{
        id: string;
        passengerId: string;
        pickupAddress: string;
        destinationAddress: string;
        estimatedPrice: number;
        distance: number;
        estimatedDuration: number;
        status: import("@prisma/client").$Enums.RideStatus;
        createdAt: Date;
    }>;
    findAll(userId: string, userType: string, status?: string): Promise<({
        passenger: {
            id: string;
            name: string;
            phone: string;
            photoUrl: string | null;
        };
        driver: {
            id: string;
            name: string;
            phone: string;
            photoUrl: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        pickupAddress: string;
        pickupLatitude: number;
        pickupLongitude: number;
        destinationAddress: string;
        destinationLatitude: number;
        destinationLongitude: number;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
        finalPrice: number | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        passengerId: string;
        driverId: string | null;
        estimatedPrice: number;
        distance: number;
        estimatedDuration: number;
        status: import("@prisma/client").$Enums.RideStatus;
        acceptedAt: Date | null;
        completedAt: Date | null;
        cancelledAt: Date | null;
    })[]>;
    findOne(id: string, userId: string, userType: string): Promise<{
        passenger: {
            id: string;
            name: string;
            phone: string;
            photoUrl: string | null;
        };
        driver: {
            id: string;
            name: string;
            phone: string;
            photoUrl: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        pickupAddress: string;
        pickupLatitude: number;
        pickupLongitude: number;
        destinationAddress: string;
        destinationLatitude: number;
        destinationLongitude: number;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
        finalPrice: number | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        passengerId: string;
        driverId: string | null;
        estimatedPrice: number;
        distance: number;
        estimatedDuration: number;
        status: import("@prisma/client").$Enums.RideStatus;
        acceptedAt: Date | null;
        completedAt: Date | null;
        cancelledAt: Date | null;
    }>;
    accept(id: string, driverId: string): Promise<{
        id: string;
        driverId: string | null;
        status: import("@prisma/client").$Enums.RideStatus;
        acceptedAt: Date | null;
    }>;
    start(id: string, driverId: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.RideStatus;
    }>;
    complete(id: string, driverId: string, completeRideDto: CompleteRideDto): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.RideStatus;
        finalPrice: number | null;
        completedAt: Date | null;
    }>;
    cancel(id: string, userId: string, cancelRideDto: CancelRideDto): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.RideStatus;
        cancelledAt: Date | null;
    }>;
    rate(id: string, passengerId: string, rateRideDto: RateRideDto): Promise<{
        id: string;
        rideId: string;
        rating: number;
        comment: string | null;
        createdAt: Date;
    }>;
    updatePayment(id: string, userId: string, updatePaymentDto: UpdatePaymentDto): Promise<{
        id: string;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }>;
}
