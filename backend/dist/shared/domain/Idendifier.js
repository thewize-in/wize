"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifier = void 0;
class Identifier {
    constructor(value) {
        this.value = value;
    }
    equals(id) {
        if (id === null || id === undefined)
            return false;
        if (!(id instanceof this.constructor))
            return false;
        return id.toValue() === this.value;
    }
    toString() {
        return String(this.value);
    }
    toValue() {
        return this.value;
    }
}
exports.Identifier = Identifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWRlbmRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvZG9tYWluL0lkZW5kaWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxVQUFVO0lBRW5CLFlBQVksS0FBUTtRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ00sTUFBTSxDQUFDLEVBQWtCO1FBQzVCLElBQUksRUFBRSxLQUFLLElBQUksSUFBSSxFQUFFLEtBQUssU0FBUztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ2xELElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBWSxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDcEQsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN2QyxDQUFDO0lBQ0QsUUFBUTtRQUNKLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0NBQ0o7QUFoQkQsZ0NBZ0JDIn0=