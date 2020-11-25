"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statusCode, msg) {
        super(msg);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomErrors.js.map