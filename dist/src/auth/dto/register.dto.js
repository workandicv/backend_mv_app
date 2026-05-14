"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = exports.DriverProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class DriverProfileDto {
    vehicleModel;
    vehiclePlate;
    vehicleColor;
    licenseNumber;
}
exports.DriverProfileDto = DriverProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Toyota Corolla' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverProfileDto.prototype, "vehicleModel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CV-1234-AB' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverProfileDto.prototype, "vehiclePlate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Branco' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverProfileDto.prototype, "vehicleColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CV123456789' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DriverProfileDto.prototype, "licenseNumber", void 0);
class RegisterDto {
    email;
    password;
    name;
    phone;
    userType;
    photoUrl;
    driverProfile;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'joao@example.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'senha123', minLength: 6 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'João Silva' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+238 999 1234' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['PASSENGER', 'DRIVER'], example: 'PASSENGER' }),
    (0, class_validator_1.IsEnum)(['PASSENGER', 'DRIVER']),
    __metadata("design:type", String)
], RegisterDto.prototype, "userType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://img.freepik.com/free-photo/driver-side-profile-focused-man-car-sunset-view-outside_169016-68680.jpg?semt=ais_hybrid&w=740&q=80' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "photoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: DriverProfileDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => DriverProfileDto),
    __metadata("design:type", DriverProfileDto)
], RegisterDto.prototype, "driverProfile", void 0);
//# sourceMappingURL=register.dto.js.map