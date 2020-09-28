import { model } from 'mongoose';
import '../hooks';

import { userSchema } from './schemas/userSchmea';
import { listSchema } from './schemas/listSchema';
import { archiveListSchema } from './schemas/archiveListSchema';

const userModel = model('user', userSchema);
const listModel = model('list', listSchema);
const archiveListModel = model('archiveList', archiveListSchema);

export { userModel, listModel, archiveListModel };
