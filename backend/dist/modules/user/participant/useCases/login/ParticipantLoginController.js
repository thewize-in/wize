"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantLoginController = void 0;
const BaseController_1 = require("../../../../../shared/infra/BaseController");
class ParticipantLoginController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    executeImpl() {
        const request = this.request.body;
        this.useCase.execute(request);
        return;
    }
}
exports.ParticipantLoginController = ParticipantLoginController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFydGljaXBhbnRMb2dpbkNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy91c2VyL3BhcnRpY2lwYW50L3VzZUNhc2VzL2xvZ2luL1BhcnRpY2lwYW50TG9naW5Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtFQUE0RTtBQUc1RSxNQUFhLDBCQUEyQixTQUFRLCtCQUFjO0lBRTFELFlBQVksT0FBeUI7UUFDakMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBQ0QsV0FBVztRQUNQLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLE9BQU87SUFDWCxDQUFDO0NBQ0o7QUFYRCxnRUFXQyJ9