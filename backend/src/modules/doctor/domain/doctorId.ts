import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/logic/Result';

export class DoctorId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }
  public static create(id?: UniqueEntityID): Result<DoctorId> {
    return Result.ok<DoctorId>(new DoctorId(id));
  }
}
