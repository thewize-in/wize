import { archiveListRepo } from '../../../repos';
import { GetArchivedListController } from './GetArchivedListController';

const getArchivedListController = new GetArchivedListController(
  archiveListRepo
);

export { getArchivedListController };
