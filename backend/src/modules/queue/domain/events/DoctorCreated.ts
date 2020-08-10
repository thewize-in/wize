import { IDomainEvent } from '../../../../shared/domain/events/IDomainEvents';
import { Doctor } from '../doctor';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';

export class DoctorCreated implements IDomainEvent {
    public dateTimeOccurred: Date;
    public doctor: Doctor;
    constructor(doctor: Doctor) {
        this.dateTimeOccurred = new Date();
        this.doctor = doctor;
    }
    getAggregateId(): UniqueEntityID {
        return this.doctor.id;
    }
}
