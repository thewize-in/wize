"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
class ValueObject {
    constructor(props) {
        let baseProps = Object.assign({}, props);
        this.props = baseProps;
    }
    equals(valueObject) {
        if (valueObject === null || valueObject === undefined)
            return false;
        if (valueObject.props === undefined)
            return false;
        return JSON.stringify(this.props) === JSON.stringify(valueObject.props);
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsdWVPYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL2RvbWFpbi9WYWx1ZU9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxNQUFzQixXQUFXO0lBRTdCLFlBQVksS0FBUTtRQUNoQixJQUFJLFNBQVMscUJBQ04sS0FBSyxDQUNYLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUMzQixDQUFDO0lBQ00sTUFBTSxDQUFDLFdBQTRCO1FBQ3RDLElBQUksV0FBVyxLQUFLLElBQUksSUFBSSxXQUFXLEtBQUssU0FBUztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3BFLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDbEQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1RSxDQUFDO0NBQ0o7QUFiRCxrQ0FhQyJ9