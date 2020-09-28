import {
  archiveListModel,
  listModel,
} from '../../../shared/infra/database/mongoose/models';
import { ArchiveListRepo } from './ListRepos/ArchiveListRepo';

import { ListRepo } from './ListRepos/ListRepo';

const listRepo = new ListRepo(listModel);
const archiveListRepo = new ArchiveListRepo(archiveListModel);

export { listRepo, archiveListRepo };
