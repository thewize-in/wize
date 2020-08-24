import { AfterUserCreated } from './AfterUserCreated';
import { AfterDoctorCreated } from './AfterDoctorCreated';
import { AfterPatientEntryCreated } from './AfterPatientEntryCreated';

import { createPatient } from '../useCases/patient/createPatient';
import { createPatientEntryBook } from '../useCases/patientEntryBook/createPatientEntryBook';
import { joinDoctor } from '../useCases/patient/joinDoctor';

new AfterUserCreated(createPatient);
new AfterDoctorCreated(createPatientEntryBook);
new AfterPatientEntryCreated(joinDoctor);
