import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TouristSpotsService {
  constructor(private prisma: PrismaService) {}

  async findAll(language: string = 'pt') {
    const spots = await this.prisma.touristSpot.findMany();

    return spots.map((spot: { id: any; nameEN: any; namePT: any; descriptionEN: any; descriptionPT: any; tipsEN: any; tipsPT: any; latitude: any; longitude: any; imageUrl: any; }) => ({
      id: spot.id,
      name: language === 'en' ? spot.nameEN : spot.namePT,
      description: language === 'en' ? spot.descriptionEN : spot.descriptionPT,
      tips: language === 'en' ? spot.tipsEN : spot.tipsPT,
      latitude: spot.latitude,
      longitude: spot.longitude,
      imageUrl: spot.imageUrl,
    }));
  }

  async findOne(id: string, language: string = 'pt') {
    const spot = await this.prisma.touristSpot.findUnique({
      where: { id },
    });

    if (!spot) {
      throw new NotFoundException('Tourist spot not found');
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
}