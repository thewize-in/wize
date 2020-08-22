import { BaseController } from '../../../../../shared/infra/BaseController';
import { PauseDoctorStatus } from './PauseDoctorStatus';
import { PauseDoctorStatusDTO } from './PauseDoctorStatusDTO';

export class PauseDoctorStatusController extends BaseController {
    private useCase: PauseDoctorStatus;
    constructor(useCase: PauseDoctorStatus) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const dto: PauseDoctorStatusDTO = this.request.session['user'];

        const result = await this.useCase.execute(dto);

        if (!result) return this.forbidden('status is not active');
        return this.ok(this.response.status(200), 'status paused');
    }
}
