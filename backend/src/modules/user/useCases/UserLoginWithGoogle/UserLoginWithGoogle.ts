import { UseCase } from '../../../../shared/domain/UseCase';
import { AuthProviderProfileInfo } from '../../../../shared/services/authProviders/models/authProviderProfileInfo';
import { IGoogleService } from '../../../../shared/services/authProviders/provider/googleProvider';
import { Result } from '../../../../shared/core/logic/Result';
import { User } from '../../domain/user';
import { UserLoginWithGoogleDTO } from './UserLoginWithGoogleDTO';
import { IUserRepo } from '../../repos/UserRepo';
import { UserSessionDTO } from '../../domain/dtos/UserSessionDTO';

type Request = UserLoginWithGoogleDTO;
type Response = Result<UserSessionDTO>;

export class UserLoginWithGoogle
  implements UseCase<Request, Promise<Response>> {
  private googleService: IGoogleService;
  private userRepo: IUserRepo;
  constructor(googleService: IGoogleService, userRepo: IUserRepo) {
    this.googleService = googleService;
    this.userRepo = userRepo;
  }
  async execute(request: Request): Promise<Response> {
    const googleAuthToken = await this.googleService.getAuthToken(request.code);
    const isAuthTokenValid = await this.googleService.checkValidAuthToken(
      googleAuthToken
    );
    let user: User, userSessionDetails: UserSessionDTO;

    if (!isAuthTokenValid) {
      return Result.fail<any>('token is not valid');
    }

    const googleProfileInfo: AuthProviderProfileInfo = await this.googleService.getProfileInfo(
      googleAuthToken
    );
    const userExist = await this.userRepo.exists(googleProfileInfo.email);

    if (!userExist) {
      user = User.create({
        firstName: googleProfileInfo.first_name,
        lastName: googleProfileInfo.last_name,
        email: googleProfileInfo.email,
        isEmailVerified: googleProfileInfo.is_email_verified,
        profilePic: googleProfileInfo.profile_pic,
        googleId: googleProfileInfo.google_id,
      }).getValue();
      console.log(user);
      await this.userRepo.save(user);
      console.log('user saved');

      userSessionDetails = { id: user.userId.id.toString(), role: user.role };
      return Result.ok<UserSessionDTO>(userSessionDetails);
    }

    userSessionDetails = await this.userRepo.getUserSessionDetails(
      googleProfileInfo.email
    );

    return Result.ok<UserSessionDTO>(userSessionDetails);
  }
}
