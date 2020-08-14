import { Mapper } from '../../../shared/infra/Mapper';
import { Patient } from '../domain/patient';

export type PatientStatusDTO = {
    joined: boolean;
    joinedDoctorId: string;
};

export class PatientStatusMap implements Mapper<Patient> {
    public static toPersistence(patient: Patient) {
        return {
            patient_id: patient.patientId.id.toString(),
            status: {
                joined: patient.status.props.joined,
                joined_doctor_id: patient.status.props.joinedDoctorId,
            },
        };
    }
    public static toDomain(raw: any) {
        return {
            status: raw,
        };
    }
}
