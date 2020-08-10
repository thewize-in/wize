import { Result } from '../../../shared/core/logic/Result';
import { DoctorStatus } from './doctorStatus';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { DoctorCreated } from './events/DoctorCreated';

interface DoctorProps {
    doctorId: string;
    status?: DoctorStatus;
}
export class Doctor extends AggregateRoot<DoctorProps> {
    get doctorId(): string {
        return this.props.doctorId;
    }
    get status(): DoctorStatus {
        return this.props.status;
    }
    private constructor(props: DoctorProps) {
        super(props);
    }
    public static create(props: DoctorProps): Result<Doctor> {
        const defaultDoctorStatus = {
            active: false,
            pause: false,
        };
        const doctor: Doctor = new Doctor({ ...props, status: DoctorStatus.create(defaultDoctorStatus).getValue() });

        doctor.addDomainEvent(new DoctorCreated(doctor));

        return Result.ok<Doctor>(doctor);
    }
}
