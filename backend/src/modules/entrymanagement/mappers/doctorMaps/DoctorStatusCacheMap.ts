import { Mapper } from '../../../../shared/infra/Mapper';
import { Doctor } from '../../domain/doctor';
import { DoctorStatus } from '../../domain/doctorStatus';
import { doctorStatusDTO } from '../../dtos/doctorStatusDTO';

export type DoctorStatusCacheDTO = {
    active: boolean;
    pause: boolean;
};

export class DoctorStatusCacheMap implements Mapper<Doctor> {
    public static toPersistence(doctorStatus: DoctorStatus) {
        let rawDoctorStatus = {
            active: doctorStatus.props.active,
            resume: doctorStatus.props.resume,
        };
        return JSON.stringify({ doctor_status: rawDoctorStatus });
    }
    public static toDomain(raw: any): DoctorStatus {
        raw = JSON.parse(raw);
        const doctorStatus = DoctorStatus.create({
            active: raw.doctor_status.active,
            resume: raw.doctor_status.resume,
        }).getValue();
        return doctorStatus;
    }
    public static toDTO(doctorStatus: DoctorStatus): doctorStatusDTO {
        return {
            status: {
                active: doctorStatus.props.active,
                resume: doctorStatus.props.resume,
            },
        };
    }
}
