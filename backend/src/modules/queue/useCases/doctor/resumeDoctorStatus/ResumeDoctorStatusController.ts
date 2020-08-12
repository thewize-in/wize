import { BaseController } from '../../../../../shared/infra/BaseController';
import { ResumeDoctorStatus } from './ResumeDoctorStatus';
import { ResumeDoctorStatusDTO } from './ResumeDoctorStatusDTO';

export class ResumeDoctorStatusController extends BaseController {
    private useCase: ResumeDoctorStatus;
    constructor(useCase: ResumeDoctorStatus) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const dto: ResumeDoctorStatusDTO = this.request.session['user'];

        const result: any = await this.useCase.execute(dto);

        if (!result.succeeded) return this.fail('oops something went wrong');
        return this.ok(this.response.status(200), 'status resumed');
    }
}
