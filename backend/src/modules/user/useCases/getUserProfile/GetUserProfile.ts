import { UseCase } from '../../../../shared/domain/UseCase';
import { IUserRepo } from '../../repos/UserRepo';
import { GetUserProfileDTO } from './GetUserProfileDTO';
import { UserProfileDTO } from '../../domain/dtos/UserProfileDTO';

type Request = GetUserProfileDTO;
type Response = UserProfileDTO;

export class GetUserProfile implements UseCase<Request, Promise<Response>> {
    private userRepo: IUserRepo;
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { userId } = request;

        const userProfile = (await this.userRepo.getProfileByUserId(userId)).getValue();

        return userProfile;
    }
}
