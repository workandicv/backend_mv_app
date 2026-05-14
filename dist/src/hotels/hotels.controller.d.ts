import { HotelsService } from './hotels.service';
export declare class HotelsController {
    private readonly hotelsService;
    constructor(hotelsService: HotelsService);
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
