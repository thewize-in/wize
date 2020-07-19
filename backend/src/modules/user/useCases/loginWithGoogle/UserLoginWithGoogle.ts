import { UseCase } from '../../../../shared/domain/UseCase';
import { AuthProviderProfileInfo } from '../../services/authProviders/models/authProviderProfileInfo';
import { IGoogleService } from '../../services/authProviders/provides/googleProvider';
import { Result } from '../../../../shared/core/logic/Result';
import { User } from '../../domain/user';
import { UserMap } from '../../mappers/UserMap';
import { userRepo } from '../../repos';
import { UserLoginWithGoogleDTO } from './UserLoginWithGoogleDTO';

type UserLoginWithGoogleRequest = UserLoginWithGoogleDTO;
type UserLoginWithGoogleResponse = boolean | object;

export class UserLoginWithGoogle implements UseCase<UserLoginWithGoogleRequest, Promise<UserLoginWithGoogleResponse>> {
    private googleService: IGoogleService;
    constructor(googleService: IGoogleService) {
        this.googleService = googleService;
    }
    async execute(request: UserLoginWithGoogleRequest): Promise<UserLoginWithGoogleResponse> {
        const googleAuthToken = request.googleAuthToken;

        const isAuthTokenValid = await this.googleService.checkValidAuthToken(googleAuthToken);
        if (!isAuthTokenValid) {
            Result.fail<any>('token is not valid');
            return false;
        }
        const googleProfileInfo: AuthProviderProfileInfo = await this.googleService.getProfileInfo(googleAuthToken);

        const user: Result<User> = User.create(UserMap.toDomain(googleProfileInfo));

        if (user.isFailure) {
            console.log(user.errorValue());
            return;
        }
        const result: any = await userRepo.existsAndReturn(user.getValue());

        if (!result.succeeded) {
            await userRepo.save(user.getValue());
        }

        return result.value;
    }
}