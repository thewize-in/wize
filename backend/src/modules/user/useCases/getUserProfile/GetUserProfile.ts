import { UseCase } from '../../../../shared/domain/UseCase';
import { IUserRepo } from '../../repos/UserRepo';
import { GetUserProfileDTO } from './GetUserProfileDTO';
import { ReturnResult } from '../../../../shared/core/logic/Result';

type GetUserProfileRequest = GetUserProfileDTO;
type GetUserProfileResponse = any;

export class GetUserProfile implements UseCase<GetUserProfileRequest, Promise<GetUserProfileResponse>> {
    private userRepo: IUserRepo;
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }
    async execute(request: GetUserProfileRequest): Promise<GetUserProfileResponse> {
        const userId = request.id;
        const result: ReturnResult = await this.userRepo.findUserByIdAndReturnAll(userId);
        return result;
    }
}
