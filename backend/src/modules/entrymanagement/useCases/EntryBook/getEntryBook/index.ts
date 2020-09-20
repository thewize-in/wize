import { entryBookRepo } from '../../../repos';
import { GetEntryBookController } from './GetEntryBookController';
import { GetEntryBook } from './GetEntryBook';

const getEntryBook = new GetEntryBook(entryBookRepo);
const getEntryBookController = new GetEntryBookController(getEntryBook);

export { getEntryBookController };
