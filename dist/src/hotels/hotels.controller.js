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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hotels_service_1 = require("./hotels.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let HotelsController = class HotelsController {
    hotelsService;
    constructor(hotelsService) {
        this.hotelsService = hotelsService;
    }
    async findAll(language) {
        return this.hotelsService.findAll(language);
    }
    async findOne(id, language) {
        return this.hotelsService.findOne(id, language);
    }
};
exports.HotelsController = HotelsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all hotels' }),
    (0, swagger_1.ApiQuery)({ name: 'language', required: false, enum: ['pt', 'en'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hotels retrieved successfully' }),
    __param(0, (0, common_1.Query)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get hotel details by ID' }),
    (0, swagger_1.ApiQuery)({ name: 'language', required: false, enum: ['pt', 'en'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hotel retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hotel not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "findOne", null);
exports.HotelsController = HotelsController = __decorate([
    (0, swagger_1.ApiTags)('Hotels'),
    (0, common_1.Controller)('hotels'),
    __metadata("design:paramtypes", [hotels_service_1.HotelsService])
], HotelsController);
//# sourceMappingURL=hotels.controller.js.map