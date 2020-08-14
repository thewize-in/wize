import { UseCase } from '../../../../shared/domain/UseCase';
import { IUserRepo } from '../../repos/UserRepo';
import { ReturnResult } from '../../../../shared/core/logic/Result';

type GetUserProfileRequest = { id: string };
type GetUserProfileResponse = ReturnResult;

export class GetUserProfile implements UseCase<GetUserProfileRequest, Promise<GetUserProfileResponse>> {
    private userRepo: IUserRepo;
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }
    async execute(request: GetUserProfileRequest): Promise<GetUserProfileResponse> {
        const { id } = request;

        const result: ReturnResult = await this.userRepo.findUserByIdAndReturnAll(id);
        return result;
    }
}
