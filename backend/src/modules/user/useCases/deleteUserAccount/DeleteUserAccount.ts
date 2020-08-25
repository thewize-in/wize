import { UseCase } from '../../../../shared/domain/UseCase';
import { IUserRepo } from '../../repos/UserRepo';
import { DeleteUserAccountDTO } from './DeleteUserAccountDTO';
import { ReturnResult } from '../../../../shared/core/logic/Result';

type Request = DeleteUserAccountDTO;
type Response = boolean;

export class DeleteUserAccount implements UseCase<Request, Promise<Response>> {
    private userRepo: IUserRepo;
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }
    async execute(request: Request): Promise<Response> {
        const userId = request.id;
        // const result: ReturnResult = await this.userRepo.findUserByIdAndDelete(userId);

        // return result.succeeded;
        return;
    }
}
