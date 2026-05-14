import { TouristSpotsService } from './tourist-spots.service';
export declare class TouristSpotsController {
    private readonly touristSpotsService;
    constructor(touristSpotsService: TouristSpotsService);
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
