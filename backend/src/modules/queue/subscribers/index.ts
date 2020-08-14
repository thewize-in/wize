import { AfterUserCreated } from './AfterUserCreated';
import { createPatient } from '../useCases/patient/createPatient';

new AfterUserCreated(createPatient);
