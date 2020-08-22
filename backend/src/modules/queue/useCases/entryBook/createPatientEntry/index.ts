import { CreatePatientEntry } from './CreatePatientEntry';
import { patientEntryBookRepo } from '../../../repos';
import { CreatePatientEntryControllerForPatient } from './CreatePatientEntryControllerForPatient';
import { CreatePatientEntryControllerForDoctor } from './CreatePatientEntryControllerForDoctor';

const createPatientEntry = new CreatePatientEntry(patientEntryBookRepo);

const createPatientEntryControllerForPatient = new CreatePatientEntryControllerForPatient(createPatientEntry);
const createPatientEntryControllerForDoctor = new CreatePatientEntryControllerForDoctor(createPatientEntry);

export { createPatientEntry, createPatientEntryControllerForPatient, createPatientEntryControllerForDoctor };
