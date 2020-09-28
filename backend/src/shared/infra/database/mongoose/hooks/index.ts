import { UniqueEntityID } from '../../../../domain/UniqueEntityID';
import { DomainEvents } from '../../../../domain/events/DomainEvents';
import { Document } from 'mongoose';
import { userSchema } from '../models/schemas/userSchmea';

function dispatchEventsCallback(primaryKeyField: string) {
  const aggregateId = new UniqueEntityID(primaryKeyField);
  DomainEvents.dispatchEventsForAggregate(aggregateId);
}
userSchema.post('save', (document: Document) => {
  const primaryKeyField = document['user_id'];
  dispatchEventsCallback(primaryKeyField);
});
