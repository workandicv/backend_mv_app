import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    create(user: any, createFavoriteDto: CreateFavoriteDto): Promise<{
        id: string;
        userId: string;
        itemType: import("@prisma/client").$Enums.ItemType;
        itemId: string;
        createdAt: Date;
    }>;
    findAll(user: any): Promise<{
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
    remove(id: string, user: any): Promise<{
        message: string;
    }>;
}
