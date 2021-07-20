import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Result } from '../../../shared/core/logic/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { AppointmentId } from './appointmentId';
import { Status } from './status';

interface AppointmentProps {
  appointmentId?: AppointmentId;
  doctorId: string;
  patientId: string;
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
  set name(value: string) {
    this.props.doctorId = value;
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
  set dateAndTime(value: Date) {
    this.props.date = value;
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
