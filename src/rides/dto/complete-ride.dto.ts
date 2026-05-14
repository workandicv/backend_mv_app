import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CompleteRideDto {
  @ApiProperty({ example: 750 })
  @IsNumber()
  @Min(0)
  finalPrice: number;
}