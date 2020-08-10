import { UserRepo } from './UserRepo';
import { userModel } from '../../../shared/infra/database/mongoose/models/userModel';

const userRepo = new UserRepo(userModel);
export { userRepo };
