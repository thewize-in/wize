import { IDomainEvent } from "./IDomainEvents";
import { AggregateRoot } from "../AggregateRoot";
import { UniqueEntityID } from "../UniqueEntityID";

export class DomainEvents {
    private static handlers = new Map();
    private static markedAggregates: AggregateRoot<any>[] = [];

    public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
        const aggregateFound = this.findMarkedAggregateByID(aggregate.id);
        if (!aggregateFound) {
            this.markedAggregates.push(aggregate);
        }
    }
    private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
        aggregate.domainEvents.forEach((event: IDomainEvent) => { this.dispatch(event); });
    }
    private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
        const index = this.markedAggregates.findIndex((a) => {
            a.equals(aggregate);
        });
        this.markedAggregates.splice(index, 1);
    }
    private static findMarkedAggregateByID(id: UniqueEntityID): AggregateRoot<any> {
        let found: AggregateRoot<any> = null;
        for (let aggregate of this.markedAggregates) {
            if (aggregate.id.equals(id)) {
                found = aggregate;
            }
        }
        return found;
    }
    public static dispatchEventsForAggregate(id: UniqueEntityID): void {
        const aggregate = this.findMarkedAggregateByID(id);
        if (aggregate) {
            this.dispatchAggregateEvents(aggregate);
            aggregate.clearEvents();
            this.removeAggregateFromMarkedDispatchList(aggregate);
        }
    }
    public static register(callback: (event: IDomainEvent) => void, eventClassName: string): void {
        if (!this.handlers.has(eventClassName)) {
            this.handlers[eventClassName] = [];
        }
        this.handlers[eventClassName].push(callback);
    }
    public static clearHandlers(): void {
        this.handlers.clear();
    }
    public static clearMarkedAggregates(): void {
        this.markedAggregates = [];
    }
    private static dispatch(event: IDomainEvent): void {
        const eventClassName: string = event.constructor.name;
        if (this.handlers.has(eventClassName)) {
            const handlers: any[] = this.handlers[eventClassName];
            for (let handler of handlers) {
                handler(event);
            }
        }
    }

}