import { BaseController } from '../../../../shared/infra/BaseController';
import { UserLoginWithGoogle } from './UserLoginWithGoogle';
import { UserLoginWithGoogleDTO } from './UserLoginWithGoogleDTO';
import { ReturnResult } from '../../../../shared/core/logic/Result';

export class UserLoginController extends BaseController {
    private useCase: UserLoginWithGoogle;
    constructor(useCase: UserLoginWithGoogle) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const dto: UserLoginWithGoogleDTO = this.request.body;

        const result: ReturnResult = await this.useCase.execute(dto);

        if (!result.succeeded) return this.unauthorized('unvalid token');

        this.request.session['user'] = result.value;

        return this.ok(this.response.status(200));
    }
}
