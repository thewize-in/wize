import { BaseController } from '../../../../../shared/infra/BaseController';
import { DeactivateDoctorStatus } from './DeactivateDoctorStatus';
import { DeactivateDoctorStatusDTO } from './DeactivateDoctorStatusDTO';

export class DeactivateDoctorStatusController extends BaseController {
    private useCase: DeactivateDoctorStatus;
    constructor(useCase: DeactivateDoctorStatus) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const dto: DeactivateDoctorStatusDTO = this.request.session['user'];

        const result: any = await this.useCase.execute(dto);
        if (!result.succeeded) return this.fail('oops');
        return this.ok(this.response.status(200), 'status deactivated');
    }
}
