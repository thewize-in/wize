import { UseCase } from '../../../../../shared/domain/UseCase';
import { IDoctorStatusRepo } from '../../../repos/DoctorStatusRepo';
import { IDoctorStatusCacheRepo } from '../../../repos/DoctorStatusCacheRepo';
import { Doctor } from '../../../domain/doctor';
import { ReturnResult } from '../../../../../shared/core/logic/Result';

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
            const doctor: Doctor = Doctor.create({ doctorId: id }).getValue();
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
