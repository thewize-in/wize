import { UseCase } from '../../../../../shared/domain/UseCase';
import { IDoctorStatusRepo } from '../../../repos/DoctorStatusRepo';
import { IDoctorStatusCacheRepo } from '../../../repos/DoctorStatusCacheRepo';
import { ReturnResult } from '../../../../../shared/core/logic/Result';

type DeactivateDoctorStatusRequest = { id: string };
type DeactivateDoctorStatusResponse = ReturnResult;

export class DeactivateDoctorStatus implements UseCase<DeactivateDoctorStatusRequest, DeactivateDoctorStatusResponse> {
    private doctorStatusRepo: IDoctorStatusRepo;
    private doctorStatusCacheRepo: IDoctorStatusCacheRepo;
    constructor(doctorStatusRepo: IDoctorStatusRepo, doctorStatusCacheRepo: IDoctorStatusCacheRepo) {
        this.doctorStatusRepo = doctorStatusRepo;
        this.doctorStatusCacheRepo = doctorStatusCacheRepo;
    }
    async execute(request: DeactivateDoctorStatusRequest): Promise<DeactivateDoctorStatusResponse> {
        const { id } = request;

        const doctorDeactiveStatus = {
            active: false,
            pause: false,
        };
        const doctorStatusResult: ReturnResult = await this.doctorStatusRepo.findDoctorByIdAndUpdateStatus(
            id,
            doctorDeactiveStatus,
        );
        if (doctorStatusResult.succeeded) {
            await this.doctorStatusCacheRepo.save(id, doctorDeactiveStatus);
        }

        return doctorStatusResult;
    }
}
