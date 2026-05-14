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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FavoritesService = class FavoritesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createFavoriteDto) {
        const existing = await this.prisma.favorite.findFirst({
            where: {
                userId,
                itemType: createFavoriteDto.itemType,
                itemId: createFavoriteDto.itemId,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Item already favorited');
        }
        const favorite = await this.prisma.favorite.create({
            data: {
                userId,
                itemType: createFavoriteDto.itemType,
                itemId: createFavoriteDto.itemId,
            },
        });
        return {
            id: favorite.id,
            userId: favorite.userId,
            itemType: favorite.itemType,
            itemId: favorite.itemId,
            createdAt: favorite.createdAt,
        };
    }
    async findAll(userId) {
        const favorites = await this.prisma.favorite.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        const restaurantIds = favorites.filter((f) => f.itemType === 'RESTAURANT').map((f) => f.itemId);
        const hotelIds = favorites.filter((f) => f.itemType === 'HOTEL').map((f) => f.itemId);
        const touristSpotIds = favorites.filter((f) => f.itemType === 'TOURIST_SPOT').map((f) => f.itemId);
        const [restaurants, hotels, touristSpots] = await Promise.all([
            this.prisma.restaurant.findMany({
                where: { id: { in: restaurantIds } },
            }),
            this.prisma.hotel.findMany({
                where: { id: { in: hotelIds } },
            }),
            this.prisma.touristSpot.findMany({
                where: { id: { in: touristSpotIds } },
            }),
        ]);
        return {
            restaurants: restaurants.map((r) => ({
                id: r.id,
                name: r.name,
                cuisine: r.cuisine,
                address: r.address,
                imageUrl: r.imageUrl,
            })),
            hotels: hotels.map((h) => ({
                id: h.id,
                name: h.name,
                stars: h.stars,
                address: h.address,
                imageUrl: h.imageUrl,
            })),
            touristSpots: touristSpots.map((t) => ({
                id: t.id,
                namePT: t.namePT,
                nameEN: t.nameEN,
                imageUrl: t.imageUrl,
            })),
        };
    }
    async remove(id, userId) {
        const favorite = await this.prisma.favorite.findUnique({
            where: { id },
        });
        if (!favorite) {
            throw new common_1.NotFoundException('Favorite not found');
        }
        if (favorite.userId !== userId) {
            throw new common_1.NotFoundException('Favorite not found');
        }
        await this.prisma.favorite.delete({
            where: { id },
        });
        return { message: 'Favorite removed' };
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map