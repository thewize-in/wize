import { BaseController } from '../../../../../shared/infra/BaseController';
import { ActivateDoctorStatus } from './ActivateDoctorStatus';
import { ActivateDoctorStatusDTO } from './ActivateDoctorStatusDTO';

export class ActivateDoctorStatusController extends BaseController {
    private useCase: ActivateDoctorStatus;
    constructor(useCase: ActivateDoctorStatus) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const dto: ActivateDoctorStatusDTO = this.request.session['user'];

        const result = await this.useCase.execute(dto);
        if (!result) return this.fail('oops something went wrong');

        return this.ok(this.response.status(200), 'status activated');
    }
}
