import { UserRepo } from './UserRepo';
import { UserModel } from '../../../shared/infra/database/mongoose/models/userModel';

const userRepo = new UserRepo(UserModel);
export { userRepo };
