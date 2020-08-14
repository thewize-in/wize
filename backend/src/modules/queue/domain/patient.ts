import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { PatientStatus } from './PatientStatus';
import { Result } from '../../../shared/core/logic/Result';
import { PatientId } from './PatientId';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

interface PatientProps {
    patientId: PatientId;
    status?: PatientStatus;
}

export class Patient extends AggregateRoot<PatientProps> {
    get patientId(): PatientId {
        return PatientId.create(this._id).getValue();
    }
    get status(): PatientStatus {
        return this.props.status;
    }
    private constructor(props?: PatientProps, id?: UniqueEntityID) {
        super(props, id);
    }
    public static create(props?: PatientProps, id?: UniqueEntityID): Result<Patient> {
        const isNewPatient = id ? false : true;

        const defaultPatientStatus = {
            joined: false,
            joinedDoctorId: '',
        };
        const patient: Patient = new Patient(
            {
                ...props,
                status: PatientStatus.create(defaultPatientStatus).getValue(),
            },
            id,
        );
        return Result.ok<Patient>(patient);
    }
}
