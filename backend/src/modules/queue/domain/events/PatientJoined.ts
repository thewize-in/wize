import { IDomainEvent } from '../../../../shared/domain/events/IDomainEvents';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { Patient } from '../patient';

export class PatientJoined implements IDomainEvent {
    public dateTimeOccurred: Date;
    public patient: Patient;
    constructor(patient: Patient) {
        this.dateTimeOccurred = new Date();
        this.patient = patient;
    }
    getAggregateId(): UniqueEntityID {
        console.log(this.patient.id);

        return this.patient.id;
    }
}
