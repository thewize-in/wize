import { IDomainEvent } from '../../../../shared/domain/events/IDomainEvents';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { PatientEntryBook } from '../patientEntryBook';
import { Patient } from '../patient';

export class PatientEntryCreated implements IDomainEvent {
    public dateTimeOccurred: Date;
    public patientEntryBook: PatientEntryBook;
    public patient: Patient;
    constructor(patientEntryBook: PatientEntryBook, patient: Patient) {
        this.dateTimeOccurred = new Date();
        this.patientEntryBook = patientEntryBook;
        this.patient = patient;
    }
    getAggregateId(): UniqueEntityID {
        return this.patientEntryBook.id;
    }
}
