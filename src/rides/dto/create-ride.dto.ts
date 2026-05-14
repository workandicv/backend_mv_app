import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum } from 'class-validator';

export class CreateRideDto {
  @ApiProperty({ example: 'Rua de Santa Isabel, Sal Rei' })
  @IsString()
  pickupAddress: string;

  @ApiProperty({ example: 16.1773 })
  @IsNumber()
  pickupLatitude: number;

  @ApiProperty({ example: -22.9099 })
  @IsNumber()
  pickupLongitude: number;

  @ApiProperty({ example: 'Praia de Santa Mónica' })
  @IsString()
  destinationAddress: string;

  @ApiProperty({ example: 16.0548 })
  @IsNumber()
  destinationLatitude: number;

  @ApiProperty({ example: -22.8846 })
  @IsNumber()
  destinationLongitude: number;

  @ApiProperty({ enum: ['CASH', 'CARD'], example: 'CASH' })
  @IsEnum(['CASH', 'CARD'])
  paymentMethod: 'CASH' | 'CARD';
}