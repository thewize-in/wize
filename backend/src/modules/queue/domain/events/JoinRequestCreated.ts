import { IDomainEvent } from '../../../../shared/domain/events/IDomainEvents';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { Patient } from '../patient';
import { PatientDetail } from '../patientEntryBook';

export class JoinRequestCreated implements IDomainEvent {
    public dateTimeOccurred: Date;
    public patient: Patient;
    public patientDetails: PatientDetail;
    public doctorId: string;
    constructor(patient: Patient, patientDetails: PatientDetail, doctorId: string) {
        this.dateTimeOccurred = new Date();
        this.patient = patient;
        this.patientDetails = patientDetails;
        this.doctorId = doctorId;
    }
    getAggregateId(): UniqueEntityID {
        return this.patient.id;
    }
}
