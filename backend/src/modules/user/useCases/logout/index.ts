import { LogoutUserController } from './LogoutUserController';
import { LogoutUser } from './LogoutUser';

const logoutUser = new LogoutUser();
const logoutUserController = new LogoutUserController(logoutUser);
export { logoutUserController, logoutUser };
