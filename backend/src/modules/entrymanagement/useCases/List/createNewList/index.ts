import { CreateNewList } from './CreateNewList';
import { listRepo } from '../../../repos';
import { CreateNewListController } from './CreateNewListController';

const createNewList = new CreateNewList(listRepo);
const createNewListController = new CreateNewListController(createNewList);

export { createNewList, createNewListController };
