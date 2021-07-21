import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Result } from '../../../shared/core/logic/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { AppointmentId } from './appointmentId';
import { Status } from './status';
import { Timestamp } from '../../../shared/domain/timeStamp';

interface AppointmentProps {
  appointmentId?: AppointmentId;
  doctorId: string;
  patientId: string;
  patientName: string;
  date?: Date;
  status?: Status;
}

export class Appointment extends AggregateRoot<AppointmentProps> {
  get appointmentId(): AppointmentId {
    return AppointmentId.create(this._id).getValue();
  }
  get doctorId(): string {
    return this.props.doctorId;
  }
  get patientName(): string {
    return this.props.patientName;
  }
  set patientName(value: string) {
    this.props.patientName = value;
  }
  get patientId(): string {
    return this.props.patientId;
  }
  set patientId(value: string) {
    this.props.patientId = value;
  }
  get status(): Status {
    return this.props.status;
  }
  set status(value: Status) {
    this.props.status = value;
  }
  get date(): Date {
    return this.props.date;
  }
  set date(value: Date) {
    this.props.date = new Date(value);
  }
  get createdAt(): number {
    // timestamp in seconds
    return new Timestamp().value;
  }

  private constructor(props: AppointmentProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: AppointmentProps, id?: UniqueEntityID): Result<Appointment> {
    const doctor = new Appointment(
      {
        ...props,
      },
      id
    );
    return Result.ok<Appointment>(doctor);
  }
}
