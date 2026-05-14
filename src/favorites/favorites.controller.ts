import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Favorites')
@Controller('favorites')
@ApiBearerAuth()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: 'Add item to favorites' })
  @ApiResponse({ status: 201, description: 'Favorite added successfully' })
  @ApiResponse({ status: 409, description: 'Item already favorited' })
  async create(@GetUser() user: any, @Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(user.userId, createFavoriteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all favorites for current user' })
  @ApiResponse({ status: 200, description: 'Favorites retrieved successfully' })
  async findAll(@GetUser() user: any) {
    return this.favoritesService.findAll(user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove favorite by ID' })
  @ApiResponse({ status: 200, description: 'Favorite removed successfully' })
  @ApiResponse({ status: 404, description: 'Favorite not found' })
  async remove(@Param('id') id: string, @GetUser() user: any) {
    return this.favoritesService.remove(id, user.userId);
  }
}