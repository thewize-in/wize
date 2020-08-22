import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { PatientStatus } from './patientStatus';
import { Result } from '../../../shared/core/logic/Result';
import { PatientId } from './patientId';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { PatientDetail } from './patientEntryBook';
import { JoinRequestCreated } from './events/JoinRequestCreated';

interface PatientProps {
    patientId?: PatientId;
    status: PatientStatus;
    waitingNumber?: Number;
}

export class Patient extends AggregateRoot<PatientProps> {
    get patientId(): PatientId {
        return PatientId.create(this._id).getValue();
    }
    get status(): PatientStatus {
        return this.props.status;
    }
    get waitingNumber(): Number {
        return this.props.waitingNumber;
    }
    set waitingNumber(number: Number) {
        this.props.waitingNumber = number;
    }
    private constructor(props?: PatientProps, id?: UniqueEntityID) {
        super(props, id);
    }
    public createJoinRequest(doctorId: string, patientDetails: PatientDetail) {
        this.addDomainEvent(new JoinRequestCreated(this, patientDetails, doctorId));
    }

    public hasJoined(): boolean {
        if (this.status.props.joined) return true;
        return false;
    }
    public setWatingNumber(number: Number): void {
        this.waitingNumber = number;
    }
    public updateStatus(status: PatientStatus) {
        this.props.status = status;
    }
    public static create(props: PatientProps, id?: UniqueEntityID): Result<Patient> {
        const isNewPatient = id ? false : true;

        const patient: Patient = new Patient({ ...props }, id);
        return Result.ok<Patient>(patient);
    }
}
