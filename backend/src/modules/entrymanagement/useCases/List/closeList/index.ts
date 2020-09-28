import { archiveListRepo, listRepo } from '../../../repos';
import { CloseList } from './CloseList';
import { CloseListController } from './CloseListController';

const closeList = new CloseList(listRepo, archiveListRepo);
const closeListController = new CloseListController(closeList);

export { closeListController };
