import { IDomainEvent } from '../../../../shared/domain/events/IDomainEvents';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { EntryBook } from '../entryBook';
import { Patient } from '../patient';

export class PatientEntryCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public entryBook: EntryBook;
  public patient: Patient;
  constructor(entryBook: EntryBook, patient: Patient) {
    this.dateTimeOccurred = new Date();
    this.entryBook = entryBook;
    this.patient = patient;
  }
  getAggregateId(): UniqueEntityID {
    return this.entryBook.id;
  }
}
