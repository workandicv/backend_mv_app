import { Controller, Get, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DriversService } from './drivers.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserTypes } from '../auth/decorators/user-types.decorator';
import { UserTypeGuard } from '../auth/guards/user-type.guard';

@ApiTags('Drivers')
@Controller('drivers')
@ApiBearerAuth()
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get('available')
  @ApiOperation({ summary: 'Get all available drivers' })
  @ApiQuery({ name: 'latitude', required: false, type: Number })
  @ApiQuery({ name: 'longitude', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Available drivers retrieved successfully' })
  async findAvailable(
    @Query('latitude') latitude?: string,
    @Query('longitude') longitude?: string,
  ) {
    const lat = latitude ? parseFloat(latitude) : undefined;
    const lon = longitude ? parseFloat(longitude) : undefined;
    return this.driversService.findAvailable(lat, lon);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get driver details by ID' })
  @ApiResponse({ status: 200, description: 'Driver retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  async findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Put('status')
  @UseGuards(UserTypeGuard)
  @UserTypes('DRIVER')
  @ApiOperation({ summary: 'Update driver availability status (Driver only)' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  async updateStatus(@GetUser() user: any, @Body() updateStatusDto: UpdateStatusDto) {
    return this.driversService.updateStatus(user.userId, updateStatusDto);
  }

  @Put('location')
  @UseGuards(UserTypeGuard)
  @UserTypes('DRIVER')
  @ApiOperation({ summary: 'Update driver current location (Driver only)' })
  @ApiResponse({ status: 200, description: 'Location updated successfully' })
  async updateLocation(@GetUser() user: any, @Body() updateLocationDto: UpdateLocationDto) {
    return this.driversService.updateLocation(user.userId, updateLocationDto);
  }
}