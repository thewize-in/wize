import { UseCase } from '../../../../shared/domain/UseCase';
import { IUserRepo } from '../../repos/UserRepo';
import { DeleteUserAccountDTO } from './DeleteUserAccountDTO';

type DeleteUserAccountRequest = DeleteUserAccountDTO;
type DeleteUserAccountResponse = boolean;

export class DeleteUserAccount implements UseCase<DeleteUserAccountRequest, Promise<DeleteUserAccountResponse>> {
    private userRepo: IUserRepo;
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }
    async execute(request: DeleteUserAccountRequest): Promise<DeleteUserAccountResponse> {
        const userId = request.id;
        const result: any = await this.userRepo.findUserByIdAndDelete(userId);

        if (!result.succeeded) return false;
        return true;
    }
}
