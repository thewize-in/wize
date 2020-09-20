import { IDomainEvent } from '../../../../shared/domain/events/IDomainEvents';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { Doctor } from '../doctor';

export class DoctorStatusDeactivated implements IDomainEvent {
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
