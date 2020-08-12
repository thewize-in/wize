/**
 * @class DeleteUserAccountController
 * this class using two usecase 1- DeleteUserAccount 2- LogoutUser
 *
 */
import { BaseController } from '../../../../shared/infra/BaseController';
import { DeleteUserAccount } from './DeleteUserAccount';
import { LogoutUser } from '../logout/LogoutUser';
import { DeleteUserAccountDTO } from './DeleteUserAccountDTO';

export class DeleteUserAccountController extends BaseController {
    private useCase: DeleteUserAccount;
    private logoutUseCase: LogoutUser;
    constructor(useCase: DeleteUserAccount, logoutUseCase: LogoutUser) {
        super();
        this.useCase = useCase;
        this.logoutUseCase = logoutUseCase;
    }
    async executeImpl(): Promise<any> {
        const dto: DeleteUserAccountDTO = this.request.session['user'];

        const result: boolean = await this.useCase.execute(dto);

        if (!result) {
            return this.notFound('user not found');
        }
        await this.logoutUseCase.execute(this.request);
        return this.ok(this.response.clearCookie('user'));
    }
}
