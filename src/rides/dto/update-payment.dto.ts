import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdatePaymentDto {
  @ApiProperty({ enum: ['PENDING', 'PAID'], example: 'PAID' })
  @IsEnum(['PENDING', 'PAID'])
  paymentStatus: 'PENDING' | 'PAID';
}