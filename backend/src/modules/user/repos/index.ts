import { UserRepo } from './UserRepo';
import { userModel } from '../../../shared/infra/database/mongoose/models';

const userRepo = new UserRepo(userModel);
export { userRepo };
