import { listRepo } from '../../../repos';
import { GetListController } from './GetListController';
import { GetList } from './GetList';

const getList = new GetList(listRepo);
const getListController = new GetListController(getList);

export { getListController };
