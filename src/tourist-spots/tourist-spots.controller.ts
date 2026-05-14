import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TouristSpotsService } from './tourist-spots.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Tourist Spots')
@Controller('tourist-spots')
export class TouristSpotsController {
  constructor(private readonly touristSpotsService: TouristSpotsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all tourist spots' })
  @ApiQuery({ name: 'language', required: false, enum: ['pt', 'en'] })
  @ApiResponse({ status: 200, description: 'Tourist spots retrieved successfully' })
  async findAll(@Query('language') language?: string) {
    return this.touristSpotsService.findAll(language);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get tourist spot details by ID' })
  @ApiQuery({ name: 'language', required: false, enum: ['pt', 'en'] })
  @ApiResponse({ status: 200, description: 'Tourist spot retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Tourist spot not found' })
  async findOne(@Param('id') id: string, @Query('language') language?: string) {
    return this.touristSpotsService.findOne(id, language);
  }
}