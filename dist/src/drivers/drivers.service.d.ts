import { PrismaService } from '../prisma/prisma.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class DriversService {
    private prisma;
    constructor(prisma: PrismaService);
    findAvailable(latitude?: number, longitude?: number): Promise<{
        id: any;
        name: any;
        photoUrl: any;
        vehicleModel: any;
        vehiclePlate: any;
        vehicleColor: any;
        rating: any;
        totalRides: any;
        currentLatitude: any;
        currentLongitude: any;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        photoUrl: string | null;
        phone: string;
        vehicleModel: string;
        vehiclePlate: string;
        vehicleColor: string;
        rating: number;
        totalRides: number;
    }>;
    updateStatus(userId: string, updateStatusDto: UpdateStatusDto): Promise<{
        isAvailable: boolean;
        currentLatitude: number | null;
        currentLongitude: number | null;
    }>;
    updateLocation(userId: string, updateLocationDto: UpdateLocationDto): Promise<{
        currentLatitude: number | null;
        currentLongitude: number | null;
    }>;
}
