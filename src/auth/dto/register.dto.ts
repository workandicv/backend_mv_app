import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DriverProfileDto {
  @ApiProperty({ example: 'Toyota Corolla' })
  @IsString()
  vehicleModel: string;

  @ApiProperty({ example: 'CV-1234-AB' })
  @IsString()
  vehiclePlate: string;

  @ApiProperty({ example: 'Branco' })
  @IsString()
  vehicleColor: string;

  @ApiProperty({ example: 'CV123456789' })
  @IsString()
  licenseNumber: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'joao@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'João Silva' })
  @IsString()
  name: string;

  @ApiProperty({ example: '+238 999 1234' })
  @IsString()
  phone: string;

  @ApiProperty({ enum: ['PASSENGER', 'DRIVER'], example: 'PASSENGER' })
  @IsEnum(['PASSENGER', 'DRIVER'])
  userType: 'PASSENGER' | 'DRIVER';

  @ApiPropertyOptional({ example: 'https://img.freepik.com/free-photo/driver-side-profile-focused-man-car-sunset-view-outside_169016-68680.jpg?semt=ais_hybrid&w=740&q=80' })
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @ApiPropertyOptional({ type: DriverProfileDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DriverProfileDto)
  driverProfile?: DriverProfileDto;
}