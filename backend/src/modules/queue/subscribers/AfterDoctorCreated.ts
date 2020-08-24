import { IHandle } from '../../../shared/domain/events/IHandle';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { CreatePatientEntryBook } from '../useCases/patientEntryBook/createPatientEntryBook/CreatePatientEntryBook';
import { DoctorCreated } from '../domain/events/DoctorCreated';

export class AfterDoctorCreated implements IHandle<DoctorCreated> {
    private createPatientEntryBook: CreatePatientEntryBook;
    constructor(createPatientEntryBook: CreatePatientEntryBook) {
        this.setupSubscriptions();
        this.createPatientEntryBook = createPatientEntryBook;
    }
    setupSubscriptions(): void {
        DomainEvents.register(this.onDoctorCreated.bind(this), DoctorCreated.name);
    }
    private async onDoctorCreated(event: DoctorCreated): Promise<void> {
        const { doctor } = event;

        try {
            this.createPatientEntryBook.execute(doctor);
            console.log(
                `[AfterDoctorCreated]: Successfully executed createPatientEntryBook useCase AfterDoctorCreated (:`,
            );
        } catch (error) {
            console.log(
                `[AfterDoctorCreated]: Failed to executed createPatientEntryBook useCase AfterDoctorCreated ):`,
            );
            console.log(error);
        }
    }
}
