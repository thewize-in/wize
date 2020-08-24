import { CreateOnlinePatientEntry } from './CreateOnlinePatientEntry';
import { patientRepo, doctorRepo, patientEntryBookRepo } from '../../../repos';
import { CreateOnlineEntryController } from './CreateOnlinePatientEntryController';

const createOnlinePatientEntry = new CreateOnlinePatientEntry(patientRepo, doctorRepo, patientEntryBookRepo);
const createOnlinePatientEntryController = new CreateOnlineEntryController(createOnlinePatientEntry);

export { createOnlinePatientEntry, createOnlinePatientEntryController };
