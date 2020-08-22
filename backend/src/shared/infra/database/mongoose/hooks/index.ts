import { UniqueEntityID } from '../../../../domain/UniqueEntityID';
import { DomainEvents } from '../../../../domain/events/DomainEvents';
import { Document } from 'mongoose';
import { userSchema } from '../models/schemas/userSchmea';
import { patienEntryBooktSchema } from '../models/schemas/patientEntryBookSchema';
import { doctorSchema } from '../models/schemas/doctorSchema';
import { patientSchema } from '../models/schemas/patientSchema';

function dispatchEventsCallback(primaryKeyField: string) {
    const aggregateId = new UniqueEntityID(primaryKeyField);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
}
userSchema.post('save', (document: Document) => {
    const primaryKeyField = document['user_id'];
    dispatchEventsCallback(primaryKeyField);
});
patienEntryBooktSchema.post('findOneAndUpdate', (document: Document) => {
    const primaryKeyField = document['book_id'];
    dispatchEventsCallback(primaryKeyField);
});
patientSchema.post('findOneAndUpdate', (document: Document) => {
    const primaryKeyField = document['patient_id'];
    dispatchEventsCallback(primaryKeyField);
});
// doctorSchema.post('findOneAndUpdate', (document: Document) => {
//     const primaryKeyField = document['doctor_id'];
//     dispatchEventsCallback(primaryKeyField);
// });
