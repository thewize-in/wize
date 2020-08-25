"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvents = void 0;
class DomainEvents {
    static markAggregateForDispatch(aggregate) {
        const aggregateFound = this.findMarkedAggregateByID(aggregate.id);
        if (!aggregateFound) {
            this.markedAggregates.push(aggregate);
        }
    }
    static dispatchAggregateEvents(aggregate) {
        aggregate.domainEvents.forEach((event) => { this.dispatch(event); });
    }
    static removeAggregateFromMarkedDispatchList(aggregate) {
        const index = this.markedAggregates.findIndex((a) => {
            a.equals(aggregate);
        });
        this.markedAggregates.splice(index, 1);
    }
    static findMarkedAggregateByID(id) {
        let found = null;
        for (let aggregate of this.markedAggregates) {
            if (aggregate.id.equals(id)) {
                found = aggregate;
            }
        }
        return found;
    }
    static dispatchEventsForAggregate(id) {
        const aggregate = this.findMarkedAggregateByID(id);
        if (aggregate) {
            this.dispatchAggregateEvents(aggregate);
            aggregate.clearEvents();
            this.removeAggregateFromMarkedDispatchList(aggregate);
        }
    }
    static register(callback, eventClassName) {
        if (!this.handlers.has(eventClassName)) {
            this.handlers[eventClassName] = [];
        }
        this.handlers[eventClassName].push(callback);
    }
    static clearHandlers() {
        this.handlers.clear();
    }
    static clearMarkedAggregates() {
        this.markedAggregates = [];
    }
    static dispatch(event) {
        const eventClassName = event.constructor.name;
        if (this.handlers.has(eventClassName)) {
            const handlers = this.handlers[eventClassName];
            for (let handler of handlers) {
                handler(event);
            }
        }
    }
}
exports.DomainEvents = DomainEvents;
DomainEvents.handlers = new Map();
DomainEvents.markedAggregates = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9tYWluRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NoYXJlZC9kb21haW4vZXZlbnRzL0RvbWFpbkV2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxNQUFhLFlBQVk7SUFJZCxNQUFNLENBQUMsd0JBQXdCLENBQUMsU0FBNkI7UUFDaEUsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBQ08sTUFBTSxDQUFDLHVCQUF1QixDQUFDLFNBQTZCO1FBQ2hFLFNBQVMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBbUIsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFDTyxNQUFNLENBQUMscUNBQXFDLENBQUMsU0FBNkI7UUFDOUUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2hELENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ08sTUFBTSxDQUFDLHVCQUF1QixDQUFDLEVBQWtCO1FBQ3JELElBQUksS0FBSyxHQUF1QixJQUFJLENBQUM7UUFDckMsS0FBSyxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekMsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDekIsS0FBSyxHQUFHLFNBQVMsQ0FBQzthQUNyQjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNNLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxFQUFrQjtRQUN2RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN6RDtJQUNMLENBQUM7SUFDTSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQXVDLEVBQUUsY0FBc0I7UUFDbEYsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUNNLE1BQU0sQ0FBQyxhQUFhO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNNLE1BQU0sQ0FBQyxxQkFBcUI7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBQ08sTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFtQjtRQUN2QyxNQUFNLGNBQWMsR0FBVyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUN0RCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ25DLE1BQU0sUUFBUSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdEQsS0FBSyxJQUFJLE9BQU8sSUFBSSxRQUFRLEVBQUU7Z0JBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQjtTQUNKO0lBQ0wsQ0FBQzs7QUF4REwsb0NBMERDO0FBekRrQixxQkFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDckIsNkJBQWdCLEdBQXlCLEVBQUUsQ0FBQyJ9