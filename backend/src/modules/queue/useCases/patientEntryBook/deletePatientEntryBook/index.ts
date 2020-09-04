import { DeletePatientEntryBook } from './DeletePatientEntryBook';
import { patientEntryBookRepo } from '../../../repos';
import { DeletePatientEntryBookController } from './DeletePatientEntryBookController';

const deletePatientEntryBook = new DeletePatientEntryBook(patientEntryBookRepo);
const deletePatientEntryBookController = new DeletePatientEntryBookController(deletePatientEntryBook);

export { deletePatientEntryBook, deletePatientEntryBookController };
