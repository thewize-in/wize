import { IHandle } from '../../../shared/domain/events/IHandle';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { DoctorStatusDeactivated } from '../domain/events/DoctorStatusDeactivated';

export class AfterDoctorStatusDeactivated implements IHandle<DoctorStatusDeactivated> {
    constructor() {
        this.setupSubscriptions();
    }
    setupSubscriptions(): void {
        DomainEvents.register(this.onDoctorStatusDeactivated.bind(this), DoctorStatusDeactivated.name);
    }
    private async onDoctorStatusDeactivated(event: DoctorStatusDeactivated): Promise<void> {
        const { doctor } = event;

        try {
            // this.clearPatientEntryBook.execute(doctor);
            console.log(
                `[AfterDoctorStatusDeactivated]: Successfully executed clearPatientEntryBook useCase AfterDoctorStatusDeactivated`,
            );
        } catch (error) {
            console.log(
                `[AfterDoctorStatusDeactivated]: Failed to executed clearPatientEntryBook useCase AfterDoctorStatusDeactivated`,
            );
            console.log(error);
        }
    }
}
