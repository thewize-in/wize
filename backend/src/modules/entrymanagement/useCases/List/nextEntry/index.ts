import { NextEntry } from './NextEntry';
import { listRepo } from '../../../repos';
import { NextEntryController } from './NextEntryController';

const nextEntry = new NextEntry(listRepo);
const nextEntryController = new NextEntryController(nextEntry);

export { nextEntry, nextEntryController };
