import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { HotelsService } from './hotels.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Hotels')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all hotels' })
  @ApiQuery({ name: 'language', required: false, enum: ['pt', 'en'] })
  @ApiResponse({ status: 200, description: 'Hotels retrieved successfully' })
  async findAll(@Query('language') language?: string) {
    return this.hotelsService.findAll(language);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get hotel details by ID' })
  @ApiQuery({ name: 'language', required: false, enum: ['pt', 'en'] })
  @ApiResponse({ status: 200, description: 'Hotel retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Hotel not found' })
  async findOne(@Param('id') id: string, @Query('language') language?: string) {
    return this.hotelsService.findOne(id, language);
  }
}