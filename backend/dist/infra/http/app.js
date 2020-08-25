"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("../../modules/user/participant/infra/http/routes/index");
const app = express_1.default();
exports.app = app;
const origin = {
    origin: "*"
};
app.use(cors_1.default(origin));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use("/participant", index_1.participantRouter);
app.listen(3000, () => {
    console.log('server started');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luZnJhL2h0dHAvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNEQUE4QjtBQUM5Qiw4REFBcUM7QUFDckMsZ0RBQXdCO0FBQ3hCLGtGQUEyRjtBQUMzRixNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFnQmIsa0JBQUc7QUFkWixNQUFNLE1BQU0sR0FBRztJQUNYLE1BQU0sRUFBRSxHQUFHO0NBQ2QsQ0FBQztBQUVGLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDcEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFNUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUseUJBQWlCLENBQUMsQ0FBQztBQUUzQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDIn0=