import { BaseController } from '../../../../../shared/infra/BaseController';
import { GetDoctorStatusById } from './GetDoctorStatusById';
import { GetDoctorStatusByIdDTO } from './GetDoctorStatusByIdDTO';
import { DoctorStatusCacheMap } from '../../../mappers/doctorMaps/DoctorStatusCacheMap';
import { DoctorStatus } from '../../../domain/doctorStatus';

export class GetDoctorStatusByIdController extends BaseController {
    private useCase: GetDoctorStatusById;
    constructor(useCase: GetDoctorStatusById) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const dto: GetDoctorStatusByIdDTO = this.request.params as GetDoctorStatusByIdDTO;
        const result = await this.useCase.execute(dto);

        if (!result) return this.notFound('doctor not found');

        const doctorStatus = result as DoctorStatus;
        return this.ok(this.response.status(200), DoctorStatusCacheMap.toDTO(doctorStatus));
    }
}
