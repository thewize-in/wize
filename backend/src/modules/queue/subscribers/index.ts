import { AfterUserCreated } from './AfterUserCreated';
import { createPatient } from '../useCases/patient/createPatient';
import { AfterPatientEntryCreated } from './AfterPatientEntryCreated';
import { AfterPatientJoined } from './AfterPatientJoined';
import { updatePatientStatus } from '../useCases/patient/updatePatientStatus';
import { AfterJoinRequestCreated } from './AfterJoinRequestCreated';
import { createPatientEntry } from '../useCases/entryBook/createPatientEntry';

new AfterUserCreated(createPatient);
new AfterPatientEntryCreated(updatePatientStatus);
new AfterPatientJoined(updatePatientStatus);
new AfterJoinRequestCreated(createPatientEntry);
