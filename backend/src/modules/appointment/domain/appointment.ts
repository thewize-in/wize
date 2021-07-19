import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Result } from '../../../shared/core/logic/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { AppointmentId } from './appointmentId';
import { Status } from './status';
import { DateAndTime } from './dateAnTime';

interface DoctorProps {
  appointmentId?: AppointmentId;
  doctorId: string;
  patientId: string;
  dateAndTime?: DateAndTime;
  status?: Status;
}

export class Appointment extends AggregateRoot<DoctorProps> {
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
  get dateAndTime(): number {
    return this.props.dateAndTime.value;
  }
  set dateAndTime(value: number) {
    this.props.dateAndTime = DateAndTime.create({ value }).getValue();
  }

  private constructor(props: DoctorProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: DoctorProps, id?: UniqueEntityID): Result<Appointment> {
    const doctor = new Appointment(
      {
        ...props,
      },
      id
    );
    return Result.ok<Appointment>(doctor);
  }
}
