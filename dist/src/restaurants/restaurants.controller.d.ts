import { RestaurantsService } from './restaurants.service';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
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
