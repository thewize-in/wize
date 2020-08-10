import { Mapper } from '../../../shared/infra/Mapper';
import { Doctor } from '../domain/doctor';

export class DoctorMap implements Mapper<Doctor> {
    public static toPersistence(doctor: Doctor) {
        return {
            doctor_id: doctor.doctorId,
            status: doctor.status,
        };
    }
    public static toDomain(raw: any) {
        return {
            doctorId: raw.doctor_id,
            status: raw.status,
        };
    }
}
