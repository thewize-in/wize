import { UseCase } from '../../../../../shared/domain/UseCase';
import { IDoctorStatusRepo } from '../../../repos/doctorRepo/DoctorStatusRepo';
import { IDoctorStatusCacheRepo } from '../../../repos/doctorRepo/DoctorStatusCacheRepo';
import { ReturnResult } from '../../../../../shared/core/logic/Result';

type ResumeDoctorStatusRequest = { id: string };
type ResumeDoctorStatusResponse = ReturnResult;

export class ResumeDoctorStatus implements UseCase<ResumeDoctorStatusRequest, ResumeDoctorStatusResponse> {
    private doctorStatusRepo: IDoctorStatusRepo;
    private doctorStatusCacheRepo: IDoctorStatusCacheRepo;
    constructor(doctorStatusRepo: IDoctorStatusRepo, doctorStatusCacheRepo: IDoctorStatusCacheRepo) {
        this.doctorStatusRepo = doctorStatusRepo;
        this.doctorStatusCacheRepo = doctorStatusCacheRepo;
    }
    async execute(request: ResumeDoctorStatusRequest): Promise<ResumeDoctorStatusResponse> {
        const { id } = request;
        const doctorResumeStatus = {
            active: true,
            pause: false,
        };
        const doctorStatusResult: ReturnResult = await this.doctorStatusRepo.findDoctorByIdAndUpdateStatus(
            id,
            doctorResumeStatus,
        );
        if (doctorStatusResult.succeeded) {
            await this.doctorStatusCacheRepo.save(id, doctorResumeStatus);
        }
        return doctorStatusResult;
    }
}
