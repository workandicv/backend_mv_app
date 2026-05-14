import { PrismaService } from '../prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createFavoriteDto: CreateFavoriteDto): Promise<{
        id: string;
        userId: string;
        itemType: import("@prisma/client").$Enums.ItemType;
        itemId: string;
        createdAt: Date;
    }>;
    findAll(userId: string): Promise<{
        restaurants: {
            id: any;
            name: any;
            cuisine: any;
            address: any;
            imageUrl: any;
        }[];
        hotels: {
            id: any;
            name: any;
            stars: any;
            address: any;
            imageUrl: any;
        }[];
        touristSpots: {
            id: any;
            namePT: any;
            nameEN: any;
            imageUrl: any;
        }[];
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
}
