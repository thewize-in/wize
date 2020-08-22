import { UseCase } from '../../../../shared/domain/UseCase';
import { AuthProviderProfileInfo } from '../../../../shared/services/authProviders/models/authProviderProfileInfo';
import { IGoogleService } from '../../../../shared/services/authProviders/provider/googleProvider';
import { Result, ReturnResult } from '../../../../shared/core/logic/Result';
import { User } from '../../domain/user';
import { UserMap } from '../../mappers/UserMap';
import { userRepo } from '../../repos';
import { UserLoginWithGoogleDTO } from './UserLoginWithGoogleDTO';

type Request = UserLoginWithGoogleDTO;
type Response = ReturnResult;

export class UserLoginWithGoogle implements UseCase<Request, Promise<Response>> {
    private googleService: IGoogleService;
    constructor(googleService: IGoogleService) {
        this.googleService = googleService;
    }
    async execute(request: Request): Promise<Response> {
        const googleAuthToken = request.googleAuthToken;

        const isAuthTokenValid = await this.googleService.checkValidAuthToken(googleAuthToken);
        if (!isAuthTokenValid) {
            Result.fail<any>('token is not valid');
            return Result.success(false);
        }
        const googleProfileInfo: AuthProviderProfileInfo = await this.googleService.getProfileInfo(googleAuthToken);

        const result: ReturnResult = await userRepo.findUserByEmail(googleProfileInfo.email);

        if (!result.succeeded) {
            const user: Result<User> = User.create(UserMap.toDomain(googleProfileInfo));
            await userRepo.save(user.getValue());
        }

        return result;
    }
}
