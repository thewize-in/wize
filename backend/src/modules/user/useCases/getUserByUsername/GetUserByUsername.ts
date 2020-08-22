import { UseCase } from '../../../../shared/domain/UseCase';
import { GetUserByUsernameDTO } from './GetUserByUsernameDTO';
import { User } from '../../domain/user';
import { IUserRepo } from '../../repos/UserRepo';

type Request = GetUserByUsernameDTO;
type Response = User | boolean;

export class GetUserByUsername implements UseCase<Request, Promise<Response>> {
    private userRepo: IUserRepo;
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }
    public async execute(request: Request): Promise<Response> {
        const username = request.username;

        const result: any = await this.userRepo.findUserByUsername(username);

        if (!result.succeeded) return false;
        return result.value as User;
    }
}
