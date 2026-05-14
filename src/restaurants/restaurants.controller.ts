import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all restaurants' })
  @ApiQuery({ name: 'language', required: false, enum: ['pt', 'en'] })
  @ApiResponse({ status: 200, description: 'Restaurants retrieved successfully' })
  async findAll(@Query('language') language?: string) {
    return this.restaurantsService.findAll(language);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get restaurant details by ID' })
  @ApiQuery({ name: 'language', required: false, enum: ['pt', 'en'] })
  @ApiResponse({ status: 200, description: 'Restaurant retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Restaurant not found' })
  async findOne(@Param('id') id: string, @Query('language') language?: string) {
    return this.restaurantsService.findOne(id, language);
  }
}