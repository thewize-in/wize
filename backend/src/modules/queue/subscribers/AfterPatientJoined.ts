import { IHandle } from '../../../shared/domain/events/IHandle';
import { PatientJoined } from '../domain/events/PatientJoined';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { UpdatePatientStatus } from '../useCases/patient/updatePatientStatus/UpdatePatientStatus';

export class AfterPatientJoined implements IHandle<PatientJoined> {
    private updatePatientStatus: UpdatePatientStatus;
    constructor(updatePatientStatus: UpdatePatientStatus) {
        this.setupSubscriptions();
        this.updatePatientStatus = updatePatientStatus;
    }
    setupSubscriptions(): void {
        DomainEvents.register(this.onPatientJoined.bind(this), PatientJoined.name);
    }
    private async onPatientJoined(event: PatientJoined): Promise<void> {
        const { patient } = event;
        try {
            // await this.updatePatientStatus.execute(patient);
            console.log(`[AfterPatientJoined]: Successfully executed updatePatientStatus useCase AfterPatientJoined`);
        } catch (error) {
            console.log(`[AfterPatientJoined]: Failed to executed updatePatientStatus useCase AfterPatientJoined`);
            console.log(error);
        }
    }
}
