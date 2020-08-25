"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const UniqueEntityID_1 = require("./UniqueEntityID");
class Entity {
    constructor(props, id) {
        this._id = id ? id : new UniqueEntityID_1.UniqueEntityID();
        this.props = props;
    }
    isEntity(object) {
        return object instanceof Entity;
    }
    equals(object) {
        if (object === null || object === undefined)
            return false;
        if (this === object)
            return true;
        if (!this.isEntity(object))
            return false;
        return this._id.equals(object._id);
    }
}
exports.Entity = Entity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9kb21haW4vRW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFrRDtBQUVsRCxNQUFzQixNQUFNO0lBR3hCLFlBQVksS0FBUSxFQUFFLEVBQW1CO1FBQ3JDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksK0JBQWMsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFDTyxRQUFRLENBQUMsTUFBVztRQUN4QixPQUFPLE1BQU0sWUFBWSxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUNNLE1BQU0sQ0FBQyxNQUFrQjtRQUM1QixJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLFNBQVM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUMxRCxJQUFJLElBQUksS0FBSyxNQUFNO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNKO0FBaEJELHdCQWdCQyJ9