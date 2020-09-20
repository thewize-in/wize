import { Mapper } from '../../../../shared/infra/Mapper';
import { Doctor } from '../../domain/doctor';
import { DoctorId } from '../../domain/doctorId';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { DoctorStatus } from '../../domain/doctorStatus';

export class DoctorMap implements Mapper<Doctor> {
    public static toPersistence(doctor: Doctor) {
        return {
            doctor_id: doctor.doctorId.id.toString(),
            status: {
                active: doctor.status.props.active,
                resume: doctor.status.props.resume,
            },
        };
    }
    public static toDomain(raw: any) {
        const doctorOrError = Doctor.create(
            {
                doctorId: DoctorId.create(new UniqueEntityID(raw.doctor_id)).getValue(),
                status: DoctorStatus.create({ active: raw.status.active, resume: raw.status.resume }).getValue(),
            },
            new UniqueEntityID(raw.doctor_id),
        );

        if (doctorOrError.isFailure) console.log(doctorOrError.error);

        if (doctorOrError.isSuccess) return doctorOrError.getValue();
    }
}
