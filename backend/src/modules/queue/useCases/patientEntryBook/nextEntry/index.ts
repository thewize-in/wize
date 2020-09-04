import { NextEntry } from './NextEntry';
import { patientEntryBookRepo } from '../../../repos';
import { NextEntryController } from './NextEntryController';

const updateCurrentPatientNumber = new NextEntry(patientEntryBookRepo);
const updateCurrentPatientNumberController = new NextEntryController(updateCurrentPatientNumber);

export { updateCurrentPatientNumberController, updateCurrentPatientNumber };
