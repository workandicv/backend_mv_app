"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypes = void 0;
const common_1 = require("@nestjs/common");
const UserTypes = (...userTypes) => (0, common_1.SetMetadata)('userTypes', userTypes);
exports.UserTypes = UserTypes;
//# sourceMappingURL=user-types.decorator.js.map