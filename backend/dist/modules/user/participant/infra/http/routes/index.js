"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.participantRouter = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../../../useCases/login/index");
const participantRouter = express_1.default.Router();
exports.participantRouter = participantRouter;
participantRouter.post("/login", (req, res) => {
    index_1.participantLoginController.execute(req, res);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy91c2VyL3BhcnRpY2lwYW50L2luZnJhL2h0dHAvcm91dGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNEQUFxRDtBQUNyRCx5REFBMkU7QUFFM0UsTUFBTSxpQkFBaUIsR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBTWxDLDhDQUFpQjtBQUoxQixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQzdELGtDQUEwQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDLENBQUMifQ==