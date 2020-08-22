import { UpdateCurrentPatientNumber } from './UpdateCurrentPatientNumber';
import { patientEntryBookRepo } from '../../../repos';
import { UpdateCurrentPatientNumberController } from './UpdateCurrentPatientNumberController';

const updateCurrentPatientNumber = new UpdateCurrentPatientNumber(patientEntryBookRepo);
const updateCurrentPatientNumberController = new UpdateCurrentPatientNumberController(updateCurrentPatientNumber);

export { updateCurrentPatientNumberController, updateCurrentPatientNumber };
