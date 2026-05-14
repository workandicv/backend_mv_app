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
exports.CreateRideDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRideDto {
    pickupAddress;
    pickupLatitude;
    pickupLongitude;
    destinationAddress;
    destinationLatitude;
    destinationLongitude;
    paymentMethod;
}
exports.CreateRideDto = CreateRideDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rua de Santa Isabel, Sal Rei' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRideDto.prototype, "pickupAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 16.1773 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRideDto.prototype, "pickupLatitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: -22.9099 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRideDto.prototype, "pickupLongitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Praia de Santa Mónica' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRideDto.prototype, "destinationAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 16.0548 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRideDto.prototype, "destinationLatitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: -22.8846 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRideDto.prototype, "destinationLongitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['CASH', 'CARD'], example: 'CASH' }),
    (0, class_validator_1.IsEnum)(['CASH', 'CARD']),
    __metadata("design:type", String)
], CreateRideDto.prototype, "paymentMethod", void 0);
//# sourceMappingURL=create-ride.dto.js.map