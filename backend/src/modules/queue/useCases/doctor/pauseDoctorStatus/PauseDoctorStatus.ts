import { UseCase } from '../../../../../shared/domain/UseCase';
import { IDoctorStatusRepo } from '../../../repos/doctorRepo/DoctorStatusRepo';
import { IDoctorStatusCacheRepo } from '../../../repos/doctorRepo/DoctorStatusCacheRepo';
import { ReturnResult } from '../../../../../shared/core/logic/Result';

type PauseDoctorStatusRequest = { id: string };
type PauseDoctorStatusResponse = ReturnResult;

export class PauseDoctorStatus implements UseCase<PauseDoctorStatusRequest, PauseDoctorStatusResponse> {
    private doctorStatusRepo: IDoctorStatusRepo;
    private doctorStatusCacheRepo: IDoctorStatusCacheRepo;
    constructor(doctorStatusRepo: IDoctorStatusRepo, doctorStatusCacheRepo: IDoctorStatusCacheRepo) {
        this.doctorStatusRepo = doctorStatusRepo;
        this.doctorStatusCacheRepo = doctorStatusCacheRepo;
    }
    async execute(request: PauseDoctorStatusRequest): Promise<PauseDoctorStatusResponse> {
        const { id } = request;
        const doctorPauseStatus = {
            active: true,
            pause: true,
        };
        const doctorStatusResult: ReturnResult = await this.doctorStatusRepo.findDoctorByIdAndUpdateStatus(
            id,
            doctorPauseStatus,
        );
        if (doctorStatusResult.succeeded) {
            await this.doctorStatusCacheRepo.save(id, doctorPauseStatus);
        }
        return doctorStatusResult;
    }
}
