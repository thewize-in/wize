import { UserLoginWithGoogle } from './UserLoginWithGoogle';
import { UserLoginController } from './UserLoginWithGoogleController';
import { googleService } from '../../../../shared/services/authProviders';
import { userRepo } from '../../repos';
import { UserLoginRequestController } from './UserLoginRequestController';

const userLoginWithGoogle = new UserLoginWithGoogle(googleService, userRepo);
const userLoginController = new UserLoginController(userLoginWithGoogle);
const userLoginRequestController = new UserLoginRequestController(
  googleService
);

export { userLoginWithGoogle, userLoginController, userLoginRequestController };
