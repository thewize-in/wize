import { BaseController } from '../../../../../shared/infra/BaseController';
import { JoinDoctor } from './JoinDoctor';
import { JoinDoctorDTO } from './JoinDoctorDTO';

export class JoinDoctorController extends BaseController {
    private useCase: JoinDoctor;
    constructor(useCase: JoinDoctor) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const patientId = this.request.session['user']['id'];
        const doctorId = this.request.params['id'];
        const patientName = this.request.body['patientName'];

        const dto: JoinDoctorDTO = { patientId, doctorId, patientName };

        const result: any = await this.useCase.execute(dto);
        if (!result)
            return this.ok(
                this.response.status(200),
                'can not join. 1- you might already joined.\n2- doctor status might be inactive.\n3- doctor status might be pause',
            );
        return this.ok(this.response.status(200), 'successfully joined');
    }
}
