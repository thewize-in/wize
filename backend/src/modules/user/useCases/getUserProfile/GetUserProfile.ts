import { UseCase } from '../../../../shared/domain/UseCase';
import { IUserRepo } from '../../repos/UserRepo';
import { ReturnResult } from '../../../../shared/core/logic/Result';

type Request = { id: string };
type Response = ReturnResult;

export class GetUserProfile implements UseCase<Request, Promise<Response>> {
    private userRepo: IUserRepo;
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { id } = request;

        const result: ReturnResult = await this.userRepo.findUserByIdAndReturnAll(id);
        return result;
    }
}
