import { IDomainEvent } from "./IDomainEvents";

export interface IHandle<IDomainEvent> {
    setupSubscriptions(): void;
}