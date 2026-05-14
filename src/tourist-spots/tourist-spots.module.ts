import { Module } from '@nestjs/common';
import { TouristSpotsService } from './tourist-spots.service';
import { TouristSpotsController } from './tourist-spots.controller';

@Module({
  controllers: [TouristSpotsController],
  providers: [TouristSpotsService],
})
export class TouristSpotsModule {}