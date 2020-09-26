import { listModel } from '../../../shared/infra/database/mongoose/models';

import { ListRepo } from './ListRepos/ListRepo';

const listRepo = new ListRepo(listModel);

export { listRepo };
