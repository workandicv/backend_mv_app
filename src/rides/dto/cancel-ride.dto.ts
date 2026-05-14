import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CancelRideDto {
  @ApiPropertyOptional({ example: 'Passenger not available' })
  @IsOptional()
  @IsString()
  reason?: string;
}