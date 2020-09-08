import { patientEntryBookRepo } from '../../../repos';
import { GetPatientEntryBookController } from './GetPatientEntryBookController';
import { GetPatientEntryBook } from './GetPatientEntryBook';

const getPatientEntryBook = new GetPatientEntryBook(patientEntryBookRepo);
const getPatientEntryBookController = new GetPatientEntryBookController(
  getPatientEntryBook
);

export { getPatientEntryBook, getPatientEntryBookController };
