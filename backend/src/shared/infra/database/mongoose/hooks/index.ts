// import { UniqueEntityID } from '../../../../domain/UniqueEntityID';
// import { DomainEvents } from '../../../../domain/events/DomainEvents';
// import { Document, HookNextFunction } from 'mongoose';
// import { userSchema } from '../models/userModel';

// export function dispatchEventsCallback(primaryKeyField: string) {
//     const aggregateId = new UniqueEntityID(primaryKeyField);
//     DomainEvents.dispatchEventsForAggregate(aggregateId);
// }

// userSchema.post('save', (document: Document, next: HookNextFunction) => {
//     console.log(document['user_id']);
//     dispatchEventsCallback(document['user_id']);
//     next();
// });
