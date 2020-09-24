import { v4 } from 'uuid';
import { Identifier } from './Idendifier';
type Id = string | number;

export class UniqueEntityID extends Identifier<Id> {
  constructor(id?: Id) {
    super(id ? id : v4());
  }
}
