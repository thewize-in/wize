"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participant = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const participantSchema = new mongoose_1.default.Schema({
    participant_id: {
        type: String,
    },
    participant_name: {
        type: String,
        select: true
    },
    phone: {
        type: String,
        select: false
    },
    participant_avatar: {
        type: String,
        select: true
    },
    participant_email: {
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
    participant_local: {
        type: String,
        select: false
    }
});
participantSchema.index({ participant_name: -1 });
const Participant = mongoose_1.default.model("user", participantSchema);
exports.Participant = Participant;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGljaXBhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvc2hhcmVkL2luZnJhL2RhdGFiYXNlL21vbmdvb3NlL21vZGVscy9wYXJ0aWNpcGFudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBZ0M7QUFFaEMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGtCQUFRLENBQUMsTUFBTSxDQUFDO0lBQzFDLGNBQWMsRUFBRTtRQUNaLElBQUksRUFBRSxNQUFNO0tBQ2Y7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLElBQUk7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLEtBQUs7S0FDaEI7SUFDRCxrQkFBa0IsRUFBRTtRQUNoQixJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxJQUFJO0tBQ2Y7SUFDRCxpQkFBaUIsRUFBRTtRQUNmLElBQUksRUFBRSxNQUFNLEVBQUU7UUFDZCxNQUFNLEVBQUUsS0FBSztLQUNoQjtJQUNELGlCQUFpQixFQUFFO1FBQ2YsSUFBSSxFQUFFLE9BQU87UUFDYixNQUFNLEVBQUUsS0FBSztLQUNoQjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLEtBQUs7S0FDaEI7SUFDRCxpQkFBaUIsRUFBRTtRQUNmLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLEtBQUs7S0FDaEI7Q0FDSixDQUFDLENBQUM7QUFFSCxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbEQsTUFBTSxXQUFXLEdBQUcsa0JBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDckQsa0NBQVcifQ==