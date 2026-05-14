import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HotelsService {
  constructor(private prisma: PrismaService) {}

  async findAll(language: string = 'pt') {
    const hotels = await this.prisma.hotel.findMany();

    return hotels.map((hotel: { id: any; name: any; stars: any; descriptionEN: any; descriptionPT: any; phone: any; address: any; latitude: any; longitude: any; imageUrl: any; }) => ({
      id: hotel.id,
      name: hotel.name,
      stars: hotel.stars,
      description: language === 'en' ? hotel.descriptionEN : hotel.descriptionPT,
      phone: hotel.phone,
      address: hotel.address,
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      imageUrl: hotel.imageUrl,
    }));
  }

  async findOne(id: string, language: string = 'pt') {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    return {
      id: hotel.id,
      name: hotel.name,
      stars: hotel.stars,
      description: language === 'en' ? hotel.descriptionEN : hotel.descriptionPT,
      phone: hotel.phone,
      address: hotel.address,
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      imageUrl: hotel.imageUrl,
    };
  }
}