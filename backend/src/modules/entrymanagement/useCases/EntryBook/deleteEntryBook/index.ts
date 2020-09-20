import { DeleteEntryBook } from './DeleteEntryBook';
import { entryBookRepo } from '../../../repos';
import { DeletEntryBookController } from './DeleteEntryBookController';

const deleteEntryBook = new DeleteEntryBook(entryBookRepo);
const deleteEntryBookController = new DeletEntryBookController(deleteEntryBook);

export { deleteEntryBookController };
