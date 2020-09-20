import { IsEntryBookExist } from './IsEntryBookExist';
import { entryBookRepo } from '../../../repos';
import { IsEntryBookExistController } from './IsEntryBookExistController';

const isEntryBookExist = new IsEntryBookExist(entryBookRepo);
const isEntryBookExistController = new IsEntryBookExistController(
  isEntryBookExist
);

export { isEntryBookExistController };
