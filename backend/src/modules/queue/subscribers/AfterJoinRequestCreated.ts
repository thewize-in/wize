import { IHandle } from '../../../shared/domain/events/IHandle';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { JoinRequestCreated } from '../domain/events/JoinRequestCreated';
import { CreatePatientEntry } from '../useCases/entryBook/createPatientEntry/CreatePatientEntry';

export class AfterJoinRequestCreated implements IHandle<JoinRequestCreated> {
    private createPatientEntry: CreatePatientEntry;
    constructor(createPatientEntry: CreatePatientEntry) {
        this.setupSubscriptions();
        this.createPatientEntry = createPatientEntry;
    }
    setupSubscriptions(): void {
        DomainEvents.register(this.onJoinRequestCreated.bind(this), JoinRequestCreated.name);
    }
    private async onJoinRequestCreated(event: JoinRequestCreated): Promise<void> {
        const { patient, doctorId, patientDetails } = event;
        const dto = { patientDetails, doctorId, patient };
        try {
            this.createPatientEntry.execute(dto);
            console.log(
                `[AfterJoinRequestCreated]: Successfully executed createPatientEntry useCase AfterJoinRequestCreated`,
            );
        } catch (error) {
            console.log(
                `[AfterJoinRequestCreated]: Failed to executed createPatientEntry useCase AfterJoinRequestCreated`,
            );
            console.log(error);
        }
    }
}
