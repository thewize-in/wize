import { Result } from '../../../shared/core/logic/Result';
import { DoctorStatus } from './doctorStatus';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { DoctorId } from './doctorId';
import { DoctorCreated } from './events/DoctorCreated';
import { DoctorStatusDeactivated } from './events/DoctorStatusDeactivated';

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

    public activateStatus(): void {
        const doctorActiveStatus = DoctorStatus.createActiveStatus().getValue();

        this.updateStatus(doctorActiveStatus);
    }

    public deactivateStatus(): void {
        const doctorInactiveStatus = DoctorStatus.createInactiveStatus().getValue();

        this.updateStatus(doctorInactiveStatus);
        this.addDomainEvent(new DoctorStatusDeactivated(this));
    }

    public pauseStatus(): void {
        const doctorPauseStatus = DoctorStatus.createPauseStatus().getValue();
        this.updateStatus(doctorPauseStatus);
    }

    public resumeStatus(): void {
        const doctorResumeStatus = DoctorStatus.createResumeStatus().getValue();
        this.updateStatus(doctorResumeStatus);
    }

    private updateStatus(status: DoctorStatus) {
        this.props.status = status;
    }

    public isNew(): void {
        this.addDomainEvent(new DoctorCreated(this));
    }

    public static create(props: DoctorProps, id?: UniqueEntityID): Result<Doctor> {
        const isNewDoctor = id ? false : true;
        const doctor: Doctor = new Doctor({ ...props }, id);

        return Result.ok<Doctor>(doctor);
    }
}
