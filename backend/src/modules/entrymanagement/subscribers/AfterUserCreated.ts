// import { IHandle } from '../../../shared/domain/events/IHandle';
// import { UserCreated } from '../../user/domain/events/UserCreated';
// import { CreatePatient } from '../useCases/patient/createPatient/CreatePatient';
// import { DomainEvents } from '../../../shared/domain/events/DomainEvents';

// export class AfterUserCreated implements IHandle<UserCreated> {
//     private createPatient: CreatePatient;
//     constructor(createPatient: CreatePatient) {
//         this.setupSubscriptions();
//         this.createPatient = createPatient;
//     }
//     setupSubscriptions(): void {
//         DomainEvents.register(this.onUserCreated.bind(this), UserCreated.name);
//     }
//     private async onUserCreated(event: UserCreated): Promise<void> {
//         const { user } = event;
//         try {
//             const userId = { id: user.userId.id.toString() };
//             await this.createPatient.execute(userId);
//             console.log(`[AfterUserCreated]: Successfully executed CreatePatient useCase AfterUserCreated`);
//         } catch (error) {
//             console.log(`[AfterUserCreated]: Failed to executed CreatePatient useCase AfterUserCreated`);
//             console.log(error);
//         }
//     }
// }
