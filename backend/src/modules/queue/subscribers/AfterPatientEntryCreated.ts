import { IHandle } from '../../../shared/domain/events/IHandle';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { PatientEntryCreated } from '../domain/events/PatientEntryCreated';
import { UpdatePatientStatus } from '../useCases/patient/updatePatientStatus/UpdatePatientStatus';

export class AfterPatientEntryCreated implements IHandle<PatientEntryCreated> {
    private updatePatientStatus: UpdatePatientStatus;
    constructor(updatePatientStatus: UpdatePatientStatus) {
        this.setupSubscriptions();
        this.updatePatientStatus = updatePatientStatus;
    }
    setupSubscriptions(): void {
        DomainEvents.register(this.onPatientEntryCreated.bind(this), PatientEntryCreated.name);
    }
    private async onPatientEntryCreated(event: PatientEntryCreated): Promise<void> {
        const { patient } = event;
        const dto = { patient };
        try {
            this.updatePatientStatus.execute(dto);
            console.log(
                `[AfterPatientEntryCreated]: Successfully executed updatePatientStatus useCase AfterPatientEntryCreated`,
            );
        } catch (error) {
            console.log(
                `[AfterPatientEntryCreated]: Failed to executed updatePatientStatus useCase AfterPatientEntryCreated`,
            );
            console.log(error);
        }
    }
}
