import { DeleteUserAccount } from './DeleteUserAccount';
import { userRepo } from '../../repos';
import { DeleteUserAccountController } from './DeleteUserAccountController';
import { logoutUser } from '../logout';

const deleteUserAccount = new DeleteUserAccount(userRepo);
const deleteUserAccountController = new DeleteUserAccountController(deleteUserAccount, logoutUser);

export { deleteUserAccount, deleteUserAccountController };
