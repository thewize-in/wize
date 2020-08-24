import { CreatePatientEntryBook } from './CreatePatientEntryBook';
import { patientEntryBookRepo } from '../../../repos';

const createPatientEntryBook = new CreatePatientEntryBook(patientEntryBookRepo);

export { createPatientEntryBook };
