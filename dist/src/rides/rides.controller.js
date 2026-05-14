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
exports.RidesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rides_service_1 = require("./rides.service");
const create_ride_dto_1 = require("./dto/create-ride.dto");
const complete_ride_dto_1 = require("./dto/complete-ride.dto");
const cancel_ride_dto_1 = require("./dto/cancel-ride.dto");
const rate_ride_dto_1 = require("./dto/rate-ride.dto");
const update_payment_dto_1 = require("./dto/update-payment.dto");
const get_user_decorator_1 = require("../auth/decorators/get-user.decorator");
const user_types_decorator_1 = require("../auth/decorators/user-types.decorator");
const user_type_guard_1 = require("../auth/guards/user-type.guard");
let RidesController = class RidesController {
    ridesService;
    constructor(ridesService) {
        this.ridesService = ridesService;
    }
    async create(user, createRideDto) {
        return this.ridesService.create(user.userId, createRideDto);
    }
    async findAll(user, status) {
        return this.ridesService.findAll(user.userId, user.userType, status);
    }
    async findOne(id, user) {
        return this.ridesService.findOne(id, user.userId, user.userType);
    }
    async accept(id, user) {
        return this.ridesService.accept(id, user.userId);
    }
    async start(id, user) {
        return this.ridesService.start(id, user.userId);
    }
    async complete(id, user, completeRideDto) {
        return this.ridesService.complete(id, user.userId, completeRideDto);
    }
    async cancel(id, user, cancelRideDto) {
        return this.ridesService.cancel(id, user.userId, cancelRideDto);
    }
    async rate(id, user, rateRideDto) {
        return this.ridesService.rate(id, user.userId, rateRideDto);
    }
    async updatePayment(id, user, updatePaymentDto) {
        return this.ridesService.updatePayment(id, user.userId, updatePaymentDto);
    }
};
exports.RidesController = RidesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(user_type_guard_1.UserTypeGuard),
    (0, user_types_decorator_1.UserTypes)('PASSENGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new ride request (Passenger only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Ride created successfully' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_ride_dto_1.CreateRideDto]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all rides for current user' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['REQUESTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rides retrieved successfully' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ride details by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ride retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ride not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id/accept'),
    (0, common_1.UseGuards)(user_type_guard_1.UserTypeGuard),
    (0, user_types_decorator_1.UserTypes)('DRIVER'),
    (0, swagger_1.ApiOperation)({ summary: 'Accept a ride request (Driver only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ride accepted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Ride cannot be accepted' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "accept", null);
__decorate([
    (0, common_1.Put)(':id/start'),
    (0, common_1.UseGuards)(user_type_guard_1.UserTypeGuard),
    (0, user_types_decorator_1.UserTypes)('DRIVER'),
    (0, swagger_1.ApiOperation)({ summary: 'Start the ride (Driver only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ride started successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Ride cannot be started' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "start", null);
__decorate([
    (0, common_1.Put)(':id/complete'),
    (0, common_1.UseGuards)(user_type_guard_1.UserTypeGuard),
    (0, user_types_decorator_1.UserTypes)('DRIVER'),
    (0, swagger_1.ApiOperation)({ summary: 'Complete the ride (Driver only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ride completed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Ride cannot be completed' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, complete_ride_dto_1.CompleteRideDto]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "complete", null);
__decorate([
    (0, common_1.Put)(':id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a ride' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ride cancelled successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Ride cannot be cancelled' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, cancel_ride_dto_1.CancelRideDto]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "cancel", null);
__decorate([
    (0, common_1.Post)(':id/rate'),
    (0, common_1.UseGuards)(user_type_guard_1.UserTypeGuard),
    (0, user_types_decorator_1.UserTypes)('PASSENGER'),
    (0, swagger_1.ApiOperation)({ summary: 'Rate a completed ride (Passenger only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Rating submitted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Rating cannot be submitted' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, rate_ride_dto_1.RateRideDto]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "rate", null);
__decorate([
    (0, common_1.Put)(':id/payment'),
    (0, swagger_1.ApiOperation)({ summary: 'Update payment status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment status updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "updatePayment", null);
exports.RidesController = RidesController = __decorate([
    (0, swagger_1.ApiTags)('Rides'),
    (0, common_1.Controller)('rides'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [rides_service_1.RidesService])
], RidesController);
//# sourceMappingURL=rides.controller.js.map