import { ClearPatientEntryBook } from './ClearPatientEntryBook';
import { patientEntryBookRepo } from '../../../repos';

const clearPatientEntryBook = new ClearPatientEntryBook(patientEntryBookRepo);

export { clearPatientEntryBook };
