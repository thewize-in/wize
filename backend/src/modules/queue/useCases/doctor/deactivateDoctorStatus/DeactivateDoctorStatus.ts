import { UseCase } from '../../../../../shared/domain/UseCase';
import { IDoctorStatusRepo } from '../../../repos/DoctorStatusRepo';
import { Doctor } from '../../../domain/doctor';
import { DoctorStatus } from '../../../domain/doctorStatus';
import { IDoctorStatusCacheRepo } from '../../../repos/DoctorStatusCacheRepo';

type DeactivateDoctorStatusRequest = { id: string };
type DeactivateDoctorStatusResponse = any;

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
        const doctorStatusResult: any = await this.doctorStatusRepo.findDoctorByIdAndUpdateStatus(
            id,
            doctorDeactiveStatus,
        );
        if (doctorStatusResult.succeeded) {
            await this.doctorStatusCacheRepo.save(id, doctorDeactiveStatus);
        }

        return doctorStatusResult;
    }
}
