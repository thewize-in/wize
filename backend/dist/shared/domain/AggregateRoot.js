"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const Entity_1 = require("./Entity");
const DomainEvents_1 = require("./events/DomainEvents");
class AggregateRoot extends Entity_1.Entity {
    constructor() {
        super(...arguments);
        this._domainEvents = [];
    }
    get id() {
        return this.id;
    }
    get domainEvents() {
        return this._domainEvents;
    }
    addDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
        DomainEvents_1.DomainEvents.markAggregateForDispatch(this);
        this.logDomainEventAdded(domainEvent);
    }
    clearEvents() {
        this._domainEvents.splice(0, this._domainEvents.length);
    }
    logDomainEventAdded(domainEvent) {
        const thisClass = Reflect.getPrototypeOf(this);
        const domainEventClass = Reflect.getPrototypeOf(domainEvent);
        console.info(`[Domain Event Created]:`, thisClass.constructor.name, '==>', domainEventClass.constructor.name);
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdncmVnYXRlUm9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvZG9tYWluL0FnZ3JlZ2F0ZVJvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQWtDO0FBR2xDLHdEQUFxRDtBQUdyRCxNQUFzQixhQUFpQixTQUFRLGVBQVM7SUFBeEQ7O1FBQ1ksa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBb0IvQyxDQUFDO0lBbkJHLElBQUksRUFBRTtRQUNGLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQ0QsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFDUyxjQUFjLENBQUMsV0FBeUI7UUFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckMsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNNLFdBQVc7UUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBQ08sbUJBQW1CLENBQUMsV0FBeUI7UUFDakQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0QsT0FBTyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xILENBQUM7Q0FDSjtBQXJCRCxzQ0FxQkMifQ==