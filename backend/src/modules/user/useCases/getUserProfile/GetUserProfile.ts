import { UseCase } from '../../../../shared/domain/UseCase';
import { IUserRepo } from '../../repos/UserRepo';
import { GetUserProfileDTO } from './GetUserProfileDTO';
import { UserProfileDTO } from '../../domain/dtos/UserProfileDTO';
import { Result } from '../../../../shared/core/logic/Result';

type Request = GetUserProfileDTO;
type Response = Result<any>;

export class GetUserProfile implements UseCase<Request, Promise<Response>> {
  private userRepo: IUserRepo;
  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }
  async execute(request: Request): Promise<Response> {
    const { userId } = request;

    const userProfileResult: Result<
      UserProfileDTO | boolean
    > = await this.userRepo.getProfileByUserId(userId);

    return Result.ok<any>(userProfileResult.getValue());
  }
}
