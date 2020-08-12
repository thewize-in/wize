import { Mapper } from '../../../shared/infra/Mapper';
import { Doctor } from '../domain/doctor';

export type DoctorStatusDTO = {
    active: boolean;
    pause: boolean;
};

export class DoctorStatusMap implements Mapper<Doctor> {
    public static toPersistence(doctor: Doctor) {
        return {
            doctor_id: doctor.doctorId,
            status: {
                active: doctor.status.props.active,
                pause: doctor.status.props.pause,
            },
        };
    }
    public static statusToDomain(doctor: Doctor) {
        return {
            active: doctor.status.props.active,
            pause: doctor.status.props.pause,
        };
    }
    public static toDomain(raw: any) {
        return {
            status: raw,
        };
    }
}
