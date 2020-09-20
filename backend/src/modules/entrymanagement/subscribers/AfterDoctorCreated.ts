import { IHandle } from '../../../shared/domain/events/IHandle';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { CreateEntryBook } from '../useCases/EntryBook/createEntryBook/CreateEntryBook';
import { DoctorCreated } from '../domain/events/DoctorCreated';

export class AfterDoctorCreated implements IHandle<DoctorCreated> {
  private createEntryBook: CreateEntryBook;
  constructor(createEntryBook: CreateEntryBook) {
    this.setupSubscriptions();
    this.createEntryBook = createEntryBook;
  }
  setupSubscriptions(): void {
    DomainEvents.register(this.onDoctorCreated.bind(this), DoctorCreated.name);
  }
  private async onDoctorCreated(event: DoctorCreated): Promise<void> {
    const { doctor } = event;

    try {
      // this.createPatientEntryBook.execute({ doctorId: doctor.doctorId.id.toString() });
      console.log(
        `[AfterDoctorCreated]: Successfully executed createPatientEntryBook useCase AfterDoctorCreated (:`
      );
    } catch (error) {
      console.log(
        `[AfterDoctorCreated]: Failed to executed createPatientEntryBook useCase AfterDoctorCreated ):`
      );
      console.log(error);
    }
  }
}
