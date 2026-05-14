import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createFavoriteDto: CreateFavoriteDto) {
    // Check if already favorited
    const existing = await this.prisma.favorite.findFirst({
      where: {
        userId,
        itemType: createFavoriteDto.itemType,
        itemId: createFavoriteDto.itemId,
      },
    });

    if (existing) {
      throw new ConflictException('Item already favorited');
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

  async findAll(userId: string) {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    // Group by item type and fetch details
    const restaurantIds = favorites.filter((f: { itemType: string; }) => f.itemType === 'RESTAURANT').map((f: { itemId: any; }) => f.itemId);
    const hotelIds = favorites.filter((f: { itemType: string; }) => f.itemType === 'HOTEL').map((f: { itemId: any; }) => f.itemId);
    const touristSpotIds = favorites.filter((f: { itemType: string; }) => f.itemType === 'TOURIST_SPOT').map((f: { itemId: any; }) => f.itemId);

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
      restaurants: restaurants.map((r: { id: any; name: any; cuisine: any; address: any; imageUrl: any; }) => ({
        id: r.id,
        name: r.name,
        cuisine: r.cuisine,
        address: r.address,
        imageUrl: r.imageUrl,
      })),
      hotels: hotels.map((h: { id: any; name: any; stars: any; address: any; imageUrl: any; }) => ({
        id: h.id,
        name: h.name,
        stars: h.stars,
        address: h.address,
        imageUrl: h.imageUrl,
      })),
      touristSpots: touristSpots.map((t: { id: any; namePT: any; nameEN: any; imageUrl: any; }) => ({
        id: t.id,
        namePT: t.namePT,
        nameEN: t.nameEN,
        imageUrl: t.imageUrl,
      })),
    };
  }

  async remove(id: string, userId: string) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { id },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    if (favorite.userId !== userId) {
      throw new NotFoundException('Favorite not found');
    }

    await this.prisma.favorite.delete({
      where: { id },
    });

    return { message: 'Favorite removed' };
  }
}