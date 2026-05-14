import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty({ enum: ['RESTAURANT', 'HOTEL', 'TOURIST_SPOT'], example: 'RESTAURANT' })
  @IsEnum(['RESTAURANT', 'HOTEL', 'TOURIST_SPOT'])
  itemType: 'RESTAURANT' | 'HOTEL' | 'TOURIST_SPOT';

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  itemId: string;
}