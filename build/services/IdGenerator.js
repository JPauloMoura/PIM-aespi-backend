"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class IdGenerator {
    constructor() {
        this.generateId = () => {
            return uuid_1.v4();
        };
    }
}
exports.default = new IdGenerator();
//# sourceMappingURL=IdGenerator.js.map