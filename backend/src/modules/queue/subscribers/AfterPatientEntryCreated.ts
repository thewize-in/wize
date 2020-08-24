import { IHandle } from '../../../shared/domain/events/IHandle';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { PatientEntryCreated } from '../domain/events/PatientEntryCreated';
import { JoinDoctor } from '../useCases/patient/joinDoctor/JoinDoctor';

export class AfterPatientEntryCreated implements IHandle<PatientEntryCreated> {
    private joinDoctor: JoinDoctor;
    constructor(joinDoctor: JoinDoctor) {
        this.setupSubscriptions();
        this.joinDoctor = joinDoctor;
    }
    setupSubscriptions(): void {
        DomainEvents.register(this.onPatientEntryCreated.bind(this), PatientEntryCreated.name);
    }
    private async onPatientEntryCreated(event: PatientEntryCreated): Promise<void> {
        const { patient } = event;

        try {
            this.joinDoctor.execute(patient);
            console.log(
                `[AfterPatientEntryCreated]: Successfully executed joinDoctor useCase AfterPatientEntryCreated`,
            );
        } catch (error) {
            console.log(`[AfterPatientEntryCreated]: Failed to executed joinDoctor useCase AfterPatientEntryCreated`);
            console.log(error);
        }
    }
}
