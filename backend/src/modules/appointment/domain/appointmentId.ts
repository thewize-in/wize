import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/logic/Result';

export class AppointmentId extends Entity<AppointmentId> {
  get id(): UniqueEntityID {
    return this._id;
  }
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }
  public static create(id?: UniqueEntityID): Result<AppointmentId> {
    return Result.ok<AppointmentId>(new AppointmentId(id));
  }
}
