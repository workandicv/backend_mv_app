import { PrismaService } from '../prisma/prisma.service';
export declare class TouristSpotsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(language?: string): Promise<{
        id: any;
        name: any;
        description: any;
        tips: any;
        latitude: any;
        longitude: any;
        imageUrl: any;
    }[]>;
    findOne(id: string, language?: string): Promise<{
        id: string;
        name: string;
        description: string;
        tips: string;
        latitude: number;
        longitude: number;
        imageUrl: string;
    }>;
}
