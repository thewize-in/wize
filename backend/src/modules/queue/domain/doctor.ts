import { Result } from '../../../shared/core/logic/Result';
import { DoctorStatus } from './doctorStatus';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { DoctorId } from './DoctorId';
// import { DoctorCreated } from './events/DoctorCreated';

interface DoctorProps {
    doctorId: DoctorId;
    status?: DoctorStatus;
}

export class Doctor extends AggregateRoot<DoctorProps> {
    get doctorId(): DoctorId {
        return DoctorId.create(this._id).getValue();
    }
    get status(): DoctorStatus {
        return this.props.status;
    }
    private constructor(props: DoctorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: DoctorProps, id?: UniqueEntityID): Result<Doctor> {
        const isNewDoctor = id ? false : true;

        const defaultDoctorStatus = {
            active: false,
            pause: false,
        };
        const doctor: Doctor = new Doctor(
            { ...props, status: DoctorStatus.create(defaultDoctorStatus).getValue() },
            id,
        );
        return Result.ok<Doctor>(doctor);
    }
}
