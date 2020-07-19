import { GetUserProfileController } from './GetUserProfileController';
import { GetUserProfile } from './GetUserProfile';
import { userRepo } from '../../repos';

const getUserProfile = new GetUserProfile(userRepo);
const getUserProfileController = new GetUserProfileController(getUserProfile);

export { getUserProfileController, getUserProfile };
