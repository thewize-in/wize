import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Result } from '../../../shared/core/logic/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { DoctorId } from './doctorId';

interface DoctorProps {
  doctorId?: DoctorId;
  name?: string;
  verified?: boolean;
  phone?: string;
}

export class Doctor extends AggregateRoot<DoctorProps> {
  get doctorId(): DoctorId {
    return DoctorId.create(this._id).getValue();
  }
  get name(): string {
    return this.props.name;
  }
  set name(value: string) {
    this.props.name = value;
  }
  get verified(): boolean {
    return this.props.verified;
  }
  set verified(value: boolean) {
    this.props.verified = value;
  }
  get phone(): string {
    return this.props.phone;
  }
  set phone(value: string) {
    this.props.phone = value;
  }

  private constructor(props: DoctorProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: DoctorProps, id?: UniqueEntityID): Result<Doctor> {
    const doctor = new Doctor(
      {
        ...props,
      },
      id
    );
    return Result.ok<Doctor>(doctor);
  }
}
