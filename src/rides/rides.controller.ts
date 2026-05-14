import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RidesService } from './rides.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { CompleteRideDto } from './dto/complete-ride.dto';
import { CancelRideDto } from './dto/cancel-ride.dto';
import { RateRideDto } from './dto/rate-ride.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserTypes } from '../auth/decorators/user-types.decorator';
import { UserTypeGuard } from '../auth/guards/user-type.guard';

@ApiTags('Rides')
@Controller('rides')
@ApiBearerAuth()
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  @UseGuards(UserTypeGuard)
  @UserTypes('PASSENGER')
  @ApiOperation({ summary: 'Create a new ride request (Passenger only)' })
  @ApiResponse({ status: 201, description: 'Ride created successfully' })
  async create(@GetUser() user: any, @Body() createRideDto: CreateRideDto) {
    return this.ridesService.create(user.userId, createRideDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rides for current user' })
  @ApiQuery({ name: 'status', required: false, enum: ['REQUESTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] })
  @ApiResponse({ status: 200, description: 'Rides retrieved successfully' })
  async findAll(@GetUser() user: any, @Query('status') status?: string) {
    return this.ridesService.findAll(user.userId, user.userType, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ride details by ID' })
  @ApiResponse({ status: 200, description: 'Ride retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Ride not found' })
  async findOne(@Param('id') id: string, @GetUser() user: any) {
    return this.ridesService.findOne(id, user.userId, user.userType);
  }

  @Put(':id/accept')
  @UseGuards(UserTypeGuard)
  @UserTypes('DRIVER')
  @ApiOperation({ summary: 'Accept a ride request (Driver only)' })
  @ApiResponse({ status: 200, description: 'Ride accepted successfully' })
  @ApiResponse({ status: 400, description: 'Ride cannot be accepted' })
  async accept(@Param('id') id: string, @GetUser() user: any) {
    return this.ridesService.accept(id, user.userId);
  }

  @Put(':id/start')
  @UseGuards(UserTypeGuard)
  @UserTypes('DRIVER')
  @ApiOperation({ summary: 'Start the ride (Driver only)' })
  @ApiResponse({ status: 200, description: 'Ride started successfully' })
  @ApiResponse({ status: 400, description: 'Ride cannot be started' })
  async start(@Param('id') id: string, @GetUser() user: any) {
    return this.ridesService.start(id, user.userId);
  }

  @Put(':id/complete')
  @UseGuards(UserTypeGuard)
  @UserTypes('DRIVER')
  @ApiOperation({ summary: 'Complete the ride (Driver only)' })
  @ApiResponse({ status: 200, description: 'Ride completed successfully' })
  @ApiResponse({ status: 400, description: 'Ride cannot be completed' })
  async complete(@Param('id') id: string, @GetUser() user: any, @Body() completeRideDto: CompleteRideDto) {
    return this.ridesService.complete(id, user.userId, completeRideDto);
  }

  @Put(':id/cancel')
  @ApiOperation({ summary: 'Cancel a ride' })
  @ApiResponse({ status: 200, description: 'Ride cancelled successfully' })
  @ApiResponse({ status: 400, description: 'Ride cannot be cancelled' })
  async cancel(@Param('id') id: string, @GetUser() user: any, @Body() cancelRideDto: CancelRideDto) {
    return this.ridesService.cancel(id, user.userId, cancelRideDto);
  }

  @Post(':id/rate')
  @UseGuards(UserTypeGuard)
  @UserTypes('PASSENGER')
  @ApiOperation({ summary: 'Rate a completed ride (Passenger only)' })
  @ApiResponse({ status: 201, description: 'Rating submitted successfully' })
  @ApiResponse({ status: 400, description: 'Rating cannot be submitted' })
  async rate(@Param('id') id: string, @GetUser() user: any, @Body() rateRideDto: RateRideDto) {
    return this.ridesService.rate(id, user.userId, rateRideDto);
  }

  @Put(':id/payment')
  @ApiOperation({ summary: 'Update payment status' })
  @ApiResponse({ status: 200, description: 'Payment status updated successfully' })
  async updatePayment(@Param('id') id: string, @GetUser() user: any, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.ridesService.updatePayment(id, user.userId, updatePaymentDto);
  }
}