import { GetUserByUsername } from './GetUserByUsername';
import { userRepo } from '../../repos';
import { GetUserByUsernameController } from './GetUserByUsernameController';

const getUserByUsername = new GetUserByUsername(userRepo);
const getUserByUsernameController = new GetUserByUsernameController(getUserByUsername);

export { getUserByUsername, getUserByUsernameController };
