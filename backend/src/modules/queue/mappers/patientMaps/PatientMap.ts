import { Mapper } from '../../../../shared/infra/Mapper';
import { Patient } from '../../domain/patient';
import { PatientId } from '../../domain/patientId';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { PatientStatus } from '../../domain/patientStatus';

export class PatientMap implements Mapper<Patient> {
    public static toPersistence(patient: Patient) {
        return {
            patient_id: patient.patientId.id.toString(),
            status: {
                joined: patient.status.props.joined,
            },
            waiting_number: patient.waitingNumber,
        };
    }
    public static toDomain(raw: any) {
        const patientOrError = Patient.create(
            {
                patientId: PatientId.create(new UniqueEntityID(raw.patient_id)).getValue(),
                status: PatientStatus.create({
                    joined: raw.status.joined,
                }).getValue(),
                waitingNumber: raw.waiting_number,
            },
            new UniqueEntityID(raw.patient_id),
        );

        if (patientOrError.isFailure) console.log(patientOrError.error);

        if (patientOrError.isSuccess) return patientOrError.getValue();
    }
}
