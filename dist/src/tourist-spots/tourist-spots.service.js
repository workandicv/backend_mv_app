"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouristSpotsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TouristSpotsService = class TouristSpotsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(language = 'pt') {
        const spots = await this.prisma.touristSpot.findMany();
        return spots.map((spot) => ({
            id: spot.id,
            name: language === 'en' ? spot.nameEN : spot.namePT,
            description: language === 'en' ? spot.descriptionEN : spot.descriptionPT,
            tips: language === 'en' ? spot.tipsEN : spot.tipsPT,
            latitude: spot.latitude,
            longitude: spot.longitude,
            imageUrl: spot.imageUrl,
        }));
    }
    async findOne(id, language = 'pt') {
        const spot = await this.prisma.touristSpot.findUnique({
            where: { id },
        });
        if (!spot) {
            throw new common_1.NotFoundException('Tourist spot not found');
        }
        return {
            id: spot.id,
            name: language === 'en' ? spot.nameEN : spot.namePT,
            description: language === 'en' ? spot.descriptionEN : spot.descriptionPT,
            tips: language === 'en' ? spot.tipsEN : spot.tipsPT,
            latitude: spot.latitude,
            longitude: spot.longitude,
            imageUrl: spot.imageUrl,
        };
    }
};
exports.TouristSpotsService = TouristSpotsService;
exports.TouristSpotsService = TouristSpotsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TouristSpotsService);
//# sourceMappingURL=tourist-spots.service.js.map