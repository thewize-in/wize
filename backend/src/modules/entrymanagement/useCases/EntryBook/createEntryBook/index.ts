import { CreateEntryBook } from './CreateEntryBook';
import { entryBookRepo } from '../../../repos';
import { CreateEntryBookController } from './CreateEntryBookController';

const createEntryBook = new CreateEntryBook(entryBookRepo);
const createEntryBookController = new CreateEntryBookController(
  createEntryBook
);

export { createEntryBook, createEntryBookController };
