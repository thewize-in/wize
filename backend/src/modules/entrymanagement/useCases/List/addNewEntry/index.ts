import { AddNewEntry } from './AddNewEntry';
import { listRepo } from '../../../repos';
import { AddNewEntryController } from './AddNewEntryController';

const addNewEntry = new AddNewEntry(listRepo);

const addNewEntryController = new AddNewEntryController(addNewEntry);

export { addNewEntryController };
