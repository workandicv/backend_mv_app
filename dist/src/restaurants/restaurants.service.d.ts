import { PrismaService } from '../prisma/prisma.service';
export declare class RestaurantsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(language?: string): Promise<{
        id: any;
        name: any;
        cuisine: any;
        description: any;
        phone: any;
        address: any;
        latitude: any;
        longitude: any;
        openingHours: any;
        imageUrl: any;
    }[]>;
    findOne(id: string, language?: string): Promise<{
        id: string;
        name: string;
        cuisine: string;
        description: string;
        phone: string;
        address: string;
        latitude: number;
        longitude: number;
        openingHours: string;
        imageUrl: string;
    }>;
}
