import { PrismaService } from '../prisma/prisma.service';
export declare class HotelsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(language?: string): Promise<{
        id: any;
        name: any;
        stars: any;
        description: any;
        phone: any;
        address: any;
        latitude: any;
        longitude: any;
        imageUrl: any;
    }[]>;
    findOne(id: string, language?: string): Promise<{
        id: string;
        name: string;
        stars: number;
        description: string;
        phone: string;
        address: string;
        latitude: number;
        longitude: number;
        imageUrl: string;
    }>;
}
