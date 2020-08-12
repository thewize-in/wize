import { BaseController } from '../../../../../shared/infra/BaseController';
import { GetDoctorStatusById } from './GetDoctorStatusById';
import { GetDoctorStatusByIdDTO } from './GetDoctorStatusByIdDTO';

export class GetDoctorStatusByIdController extends BaseController {
    private useCase: GetDoctorStatusById;
    constructor(useCase: GetDoctorStatusById) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const dto: GetDoctorStatusByIdDTO = this.request.params as GetDoctorStatusByIdDTO;
        const result: any = await this.useCase.execute(dto);

        if (!result.succeeded) return this.notFound('doctor not found');
        return this.ok(this.response.status(200), result.value);
    }
}
