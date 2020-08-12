import { UseCase } from '../../../../../shared/domain/UseCase';
import { IDoctorStatusRepo } from '../../../repos/DoctorStatusRepo';
import { IDoctorStatusCacheRepo } from '../../../repos/DoctorStatusCacheRepo';
import { ReturnResult } from '../../../../../shared/core/logic/Result';

type GetDoctorByIdRequest = { id: string };
type GetDoctorByIdResponse = ReturnResult;

export class GetDoctorStatusById implements UseCase<GetDoctorByIdRequest, GetDoctorByIdResponse> {
    private doctorStatusRepo: IDoctorStatusRepo;
    private doctorStatusCacheRepo: IDoctorStatusCacheRepo;
    constructor(doctorStatusRepo: IDoctorStatusRepo, doctorStatusCacheRepo: IDoctorStatusCacheRepo) {
        this.doctorStatusRepo = doctorStatusRepo;
        this.doctorStatusCacheRepo = doctorStatusCacheRepo;
    }
    async execute(request: GetDoctorByIdRequest): Promise<GetDoctorByIdResponse> {
        const { id } = request;

        let doctorStatusResult: ReturnResult = await this.doctorStatusCacheRepo.findDoctorStatusById(id);

        if (!doctorStatusResult.succeeded) {
            doctorStatusResult = await this.doctorStatusRepo.findDoctorStatusById(id);
            if (doctorStatusResult.succeeded) {
                this.doctorStatusCacheRepo.save(id, doctorStatusResult.value);
            }
        }
        return doctorStatusResult;
    }
}
