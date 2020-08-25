"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityID = void 0;
const uuid_1 = __importDefault(require("uuid"));
const Idendifier_1 = require("./Idendifier");
class UniqueEntityID extends Idendifier_1.Identifier {
    constructor(id) {
        super(id ? id : uuid_1.default.v4());
    }
}
exports.UniqueEntityID = UniqueEntityID;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5pcXVlRW50aXR5SUQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL2RvbWFpbi9VbmlxdWVFbnRpdHlJRC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsNkNBQTBDO0FBRzFDLE1BQWEsY0FBZSxTQUFRLHVCQUFjO0lBQzlDLFlBQVksRUFBTztRQUNmLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNKO0FBSkQsd0NBSUMifQ==