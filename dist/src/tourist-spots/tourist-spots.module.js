"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouristSpotsModule = void 0;
const common_1 = require("@nestjs/common");
const tourist_spots_service_1 = require("./tourist-spots.service");
const tourist_spots_controller_1 = require("./tourist-spots.controller");
let TouristSpotsModule = class TouristSpotsModule {
};
exports.TouristSpotsModule = TouristSpotsModule;
exports.TouristSpotsModule = TouristSpotsModule = __decorate([
    (0, common_1.Module)({
        controllers: [tourist_spots_controller_1.TouristSpotsController],
        providers: [tourist_spots_service_1.TouristSpotsService],
    })
], TouristSpotsModule);
//# sourceMappingURL=tourist-spots.module.js.map