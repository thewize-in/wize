import { UseCase } from '../../../../../shared/domain/UseCase';
import { IDoctorRepo } from '../../../repos/doctorRepos/DoctorRepo';
import { IDoctorStatusCacheRepo } from '../../../repos/doctorRepos/DoctorStatusCacheRepo';
import { Doctor } from '../../../domain/doctor';
import { DoctorStatus } from '../../../domain/doctorStatus';
import { Result } from '../../../../../shared/core/logic/Result';

type Request = { id: string };
type Response = boolean;

export class PauseDoctorStatus implements UseCase<Request, Response> {
    private doctorRepo: IDoctorRepo;
    private doctorStatusCacheRepo: IDoctorStatusCacheRepo;
    constructor(doctorRepo: IDoctorRepo, doctorStatusCacheRepo: IDoctorStatusCacheRepo) {
        this.doctorRepo = doctorRepo;
        this.doctorStatusCacheRepo = doctorStatusCacheRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { id } = request;
        let doctorResult: Result<Doctor>, doctor: Doctor;

        try {
            doctorResult = await this.doctorRepo.getDoctorByDoctorId(id);
            doctor = doctorResult.getValue();
        } catch (error) {
            console.log(`[PauseDoctorStatus]: ${doctorResult.errorValue()}`);
            return false;
        }

        if (!doctor.status.isActive()) return false;

        const doctorPauseStatus = DoctorStatus.createPauseStatus().getValue();

        doctor.updateStatus(doctorPauseStatus);

        await this.doctorRepo.save(doctor);
        await this.doctorStatusCacheRepo.save(id, doctorPauseStatus);

        return true;
    }
}