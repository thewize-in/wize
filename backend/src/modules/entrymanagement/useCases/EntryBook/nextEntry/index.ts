import { NextEntry } from './NextEntry';
import { entryBookRepo } from '../../../repos';
import { NextEntryController } from './NextEntryController';

const updateCurrentPatientNumber = new NextEntry(entryBookRepo);
const updateCurrentPatientNumberController = new NextEntryController(
  updateCurrentPatientNumber
);

export { updateCurrentPatientNumberController, updateCurrentPatientNumber };
