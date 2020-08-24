import { UseCase } from '../../../../../shared/domain/UseCase';
import { IDoctorRepo } from '../../../repos/doctorRepos/DoctorRepo';
import { IDoctorStatusCacheRepo } from '../../../repos/doctorRepos/DoctorStatusCacheRepo';
import { Doctor } from '../../../domain/doctor';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { DoctorStatus } from '../../../domain/doctorStatus';

type Request = { id: string };
type Response = boolean;

export class ActivateDoctorStatus implements UseCase<Request, Response> {
    private doctorRepo: IDoctorRepo;
    private doctorStatusCacheRepo: IDoctorStatusCacheRepo;
    constructor(doctorRepo: IDoctorRepo, doctorStatusCacheRepo: IDoctorStatusCacheRepo) {
        this.doctorRepo = doctorRepo;
        this.doctorStatusCacheRepo = doctorStatusCacheRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { id } = request;
        const doctorExist: any = await this.doctorRepo.exists(id);
        let doctor: Doctor;

        if (doctorExist) {
            doctor = (await this.doctorRepo.getDoctorByDoctorId(id)).getValue();
            if (doctor.status.isActive()) return true;
            doctor.activateStatus();
        } else {
            const doctorId = new UniqueEntityID(id);
            const doctorActiveStatus = DoctorStatus.createActiveStatus().getValue();
            doctor = Doctor.create({ status: doctorActiveStatus }, doctorId).getValue();
            doctor.isNew();
        }

        await this.doctorRepo.save(doctor);
        await this.doctorStatusCacheRepo.save(id, doctor.status);

        return true;
    }
}
