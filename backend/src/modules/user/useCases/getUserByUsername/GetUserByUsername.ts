import { UseCase } from '../../../../shared/domain/UseCase';
import { GetUserByUsernameDTO } from './GetUserByUsernameDTO';
import { User } from '../../domain/user';
import { IUserRepo } from '../../repos/UserRepo';

type GetUserByUsernameRequest = GetUserByUsernameDTO;
type GetUserByUsernameResponse = User | boolean;

export class GetUserByUsername implements UseCase<GetUserByUsernameRequest, Promise<GetUserByUsernameResponse>> {
    private userRepo: IUserRepo;
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }
    public async execute(request: GetUserByUsernameRequest): Promise<GetUserByUsernameResponse> {
        const username = request.username;

        const result: any = await this.userRepo.findUserByUsername(username);

        if (!result.succeeded) return false;
        return result.value as User;
    }
}
