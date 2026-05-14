import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async findAll(language: string = 'pt') {
    const restaurants = await this.prisma.restaurant.findMany();

    return restaurants.map((restaurant: { id: any; name: any; cuisine: any; descriptionEN: any; descriptionPT: any; phone: any; address: any; latitude: any; longitude: any; openingHours: any; imageUrl: any; }) => ({
      id: restaurant.id,
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      description: language === 'en' ? restaurant.descriptionEN : restaurant.descriptionPT,
      phone: restaurant.phone,
      address: restaurant.address,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      openingHours: restaurant.openingHours,
      imageUrl: restaurant.imageUrl,
    }));
  }

  async findOne(id: string, language: string = 'pt') {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return {
      id: restaurant.id,
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      description: language === 'en' ? restaurant.descriptionEN : restaurant.descriptionPT,
      phone: restaurant.phone,
      address: restaurant.address,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      openingHours: restaurant.openingHours,
      imageUrl: restaurant.imageUrl,
    };
  }
}