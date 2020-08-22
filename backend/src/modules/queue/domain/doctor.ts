import { Result } from '../../../shared/core/logic/Result';
import { DoctorStatus } from './doctorStatus';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { DoctorId } from './doctorId';

interface DoctorProps {
    doctorId?: DoctorId;
    status: DoctorStatus;
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

    public updateStatus(status: DoctorStatus) {
        this.props.status = status;
    }

    public static create(props: DoctorProps, id?: UniqueEntityID): Result<Doctor> {
        const isNewDoctor = id ? false : true;
        const doctor: Doctor = new Doctor({ ...props }, id);
        return Result.ok<Doctor>(doctor);
    }
}
