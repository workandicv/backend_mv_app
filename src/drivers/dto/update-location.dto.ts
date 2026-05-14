import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateLocationDto {
  @ApiProperty({ example: 16.1773 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: -22.9099 })
  @IsNumber()
  longitude: number;
}