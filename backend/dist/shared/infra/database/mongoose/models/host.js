"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Host = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const hostSchema = new mongoose_1.default.Schema({
    host_id: {
        type: String,
    },
    host_name: {
        type: String,
        select: true
    },
    phone: {
        type: String,
        select: false
    },
    host_avatar: {
        type: String,
        select: true
    },
    host_email: {
        type: String(),
        select: false
    },
    is_email_verified: {
        type: Boolean,
        select: false
    },
    google_id: {
        type: String,
        select: false
    },
    host_local: {
        type: String,
        select: false
    }
});
hostSchema.index({ host_name: -1 });
const Host = mongoose_1.default.model("user", hostSchema);
exports.Host = Host;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9zaGFyZWQvaW5mcmEvZGF0YWJhc2UvbW9uZ29vc2UvbW9kZWxzL2hvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQWdDO0FBRWhDLE1BQU0sVUFBVSxHQUFHLElBQUksa0JBQVEsQ0FBQyxNQUFNLENBQUM7SUFDbkMsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLElBQUk7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLEtBQUs7S0FDaEI7SUFDRCxXQUFXLEVBQUU7UUFDVCxJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxJQUFJO0tBQ2Y7SUFDRCxVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTSxFQUFFO1FBQ2QsTUFBTSxFQUFFLEtBQUs7S0FDaEI7SUFDRCxpQkFBaUIsRUFBRTtRQUNmLElBQUksRUFBRSxPQUFPO1FBQ2IsTUFBTSxFQUFFLEtBQUs7S0FDaEI7SUFDRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxLQUFLO0tBQ2hCO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07UUFDWixNQUFNLEVBQUUsS0FBSztLQUNoQjtDQUNKLENBQUMsQ0FBQztBQUVILFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sSUFBSSxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN2QyxvQkFBSSJ9