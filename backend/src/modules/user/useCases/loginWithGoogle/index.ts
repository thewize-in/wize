import { UserLoginWithGoogle } from './UserLoginWithGoogle';
import { UserLoginController } from './UserLoginWithGoogleController';
import { googleService } from '../../../../shared/services/authProviders';

const userLogin = new UserLoginWithGoogle(googleService);
const userLoginController = new UserLoginController(userLogin);

export { userLogin, userLoginController };
