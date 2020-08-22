import { BaseController } from '../../../../../shared/infra/BaseController';
import { LeaveDoctor } from './LeaveDoctor';
import { LeaveDoctorDTO } from './LeaveDoctorDTO';

export class LeaveDoctorController extends BaseController {
    private useCase: LeaveDoctor;
    constructor(useCase: LeaveDoctor) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const patientId = this.request.session['user']['id'];
        const dto: LeaveDoctorDTO = { patientId };

        const result = await this.useCase.execute(dto);

        if (!result) return this.fail('some thing went wrong');

        return this.ok(this.response.status(200), 'successfully leaved');
    }
}
