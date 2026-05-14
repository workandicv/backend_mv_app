import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isAvailable: boolean;

  @ApiPropertyOptional({ example: 16.1773 })
  @IsOptional()
  @IsNumber()
  currentLatitude?: number;

  @ApiPropertyOptional({ example: -22.9099 })
  @IsOptional()
  @IsNumber()
  currentLongitude?: number;
}