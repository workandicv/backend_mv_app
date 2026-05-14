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
exports.DriversController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const drivers_service_1 = require("./drivers.service");
const update_status_dto_1 = require("./dto/update-status.dto");
const update_location_dto_1 = require("./dto/update-location.dto");
const get_user_decorator_1 = require("../auth/decorators/get-user.decorator");
const user_types_decorator_1 = require("../auth/decorators/user-types.decorator");
const user_type_guard_1 = require("../auth/guards/user-type.guard");
let DriversController = class DriversController {
    driversService;
    constructor(driversService) {
        this.driversService = driversService;
    }
    async findAvailable(latitude, longitude) {
        const lat = latitude ? parseFloat(latitude) : undefined;
        const lon = longitude ? parseFloat(longitude) : undefined;
        return this.driversService.findAvailable(lat, lon);
    }
    async findOne(id) {
        return this.driversService.findOne(id);
    }
    async updateStatus(user, updateStatusDto) {
        return this.driversService.updateStatus(user.userId, updateStatusDto);
    }
    async updateLocation(user, updateLocationDto) {
        return this.driversService.updateLocation(user.userId, updateLocationDto);
    }
};
exports.DriversController = DriversController;
__decorate([
    (0, common_1.Get)('available'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available drivers' }),
    (0, swagger_1.ApiQuery)({ name: 'latitude', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'longitude', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Available drivers retrieved successfully' }),
    __param(0, (0, common_1.Query)('latitude')),
    __param(1, (0, common_1.Query)('longitude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "findAvailable", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get driver details by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Driver retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Driver not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('status'),
    (0, common_1.UseGuards)(user_type_guard_1.UserTypeGuard),
    (0, user_types_decorator_1.UserTypes)('DRIVER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update driver availability status (Driver only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status updated successfully' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)('location'),
    (0, common_1.UseGuards)(user_type_guard_1.UserTypeGuard),
    (0, user_types_decorator_1.UserTypes)('DRIVER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update driver current location (Driver only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Location updated successfully' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_location_dto_1.UpdateLocationDto]),
    __metadata("design:returntype", Promise)
], DriversController.prototype, "updateLocation", null);
exports.DriversController = DriversController = __decorate([
    (0, swagger_1.ApiTags)('Drivers'),
    (0, common_1.Controller)('drivers'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [drivers_service_1.DriversService])
], DriversController);
//# sourceMappingURL=drivers.controller.js.map