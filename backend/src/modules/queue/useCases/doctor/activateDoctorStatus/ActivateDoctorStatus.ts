import { UseCase } from '../../../../../shared/domain/UseCase';
import { IDoctorStatusRepo } from '../../../repos/doctorRepo/DoctorStatusRepo';
import { IDoctorStatusCacheRepo } from '../../../repos/doctorRepo/DoctorStatusCacheRepo';
import { Doctor } from '../../../domain/doctor';
import { ReturnResult } from '../../../../../shared/core/logic/Result';
import { DoctorId } from '../../../domain/DoctorId';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';

type ActivateDoctorStatusRequest = { id: string };
type ActivateDoctorStatusResponse = ReturnResult;

export class ActivateDoctorStatus implements UseCase<ActivateDoctorStatusRequest, ActivateDoctorStatusResponse> {
    private doctorStatusRepo: IDoctorStatusRepo;
    private doctorStatusCacheRepo: IDoctorStatusCacheRepo;

    constructor(doctorStatusRepo: IDoctorStatusRepo, doctorStatusCacheRepo: IDoctorStatusCacheRepo) {
        this.doctorStatusRepo = doctorStatusRepo;
        this.doctorStatusCacheRepo = doctorStatusCacheRepo;
    }
    async execute(request: ActivateDoctorStatusRequest): Promise<ActivateDoctorStatusResponse> {
        const { id } = request;

        const doctorExistResult: any = await this.doctorStatusRepo.exists(id);

        if (!doctorExistResult.succeeded) {
            const doctorId = DoctorId.create(new UniqueEntityID(id)).getValue();
            const doctor: Doctor = Doctor.create({ doctorId }).getValue();
            await this.doctorStatusRepo.save(doctor);
        }
        const doctorActiveStatus = {
            active: true,
            pause: false,
        };
        const doctorStatusResult: ReturnResult = await this.doctorStatusRepo.findDoctorByIdAndUpdateStatus(
            id,
            doctorActiveStatus,
        );
        if (doctorStatusResult.succeeded) {
            await this.doctorStatusCacheRepo.save(id, doctorActiveStatus);
        }
        return doctorStatusResult;
    }
}
