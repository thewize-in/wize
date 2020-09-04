import { CreatePatientEntryBook } from './CreatePatientEntryBook';
import { patientEntryBookRepo } from '../../../repos';
import { CreatePatientEntryBookController } from './CreatePatientEntryBookController';

const createPatientEntryBook = new CreatePatientEntryBook(patientEntryBookRepo);
const createPatientEntryBookController = new CreatePatientEntryBookController(createPatientEntryBook);

export { createPatientEntryBook, createPatientEntryBookController };
