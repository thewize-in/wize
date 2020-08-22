import { UseCase } from '../../../../../shared/domain/UseCase';
import { IDoctorRepo } from '../../../repos/doctorRepos/DoctorRepo';
import { IDoctorStatusCacheRepo } from '../../../repos/doctorRepos/DoctorStatusCacheRepo';
import { Doctor } from '../../../domain/doctor';
import { DoctorStatus } from '../../../domain/doctorStatus';
import { Result } from '../../../../../shared/core/logic/Result';

type Request = { doctorId: string };
type Response = boolean | DoctorStatus;

export class GetDoctorStatusById implements UseCase<Request, Response> {
    private doctorRepo: IDoctorRepo;
    private doctorStatusCacheRepo: IDoctorStatusCacheRepo;

    constructor(doctorRepo: IDoctorRepo, doctorStatusCacheRepo: IDoctorStatusCacheRepo) {
        this.doctorRepo = doctorRepo;
        this.doctorStatusCacheRepo = doctorStatusCacheRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { doctorId } = request;
        let doctorResult: Result<Doctor>,
            doctorStatusResult: Result<DoctorStatus>,
            doctor: Doctor,
            doctorStatus: DoctorStatus;

        doctorStatusResult = await this.doctorStatusCacheRepo.getDoctorStatusById(doctorId);
        doctorStatus = doctorStatusResult.getValue();

        if (doctorStatusResult.isSuccess) return doctorStatus;

        doctorResult = await this.doctorRepo.getDoctorByDoctorId(doctorId);

        if (doctorResult.isFailure) return false;

        doctor = doctorResult.getValue();
        doctorStatus = doctor.status;

        await this.doctorStatusCacheRepo.save(doctorId, doctorStatus);

        return doctorStatus;
    }
}
