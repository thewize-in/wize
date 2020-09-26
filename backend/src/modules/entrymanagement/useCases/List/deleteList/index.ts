import { listRepo } from '../../../repos';
import { DeleteList } from './DeleteList';
import { DeleteListController } from './DeleteListController';

const deleteList = new DeleteList(listRepo);
const deleteListController = new DeleteListController(deleteList);

export { deleteListController };
