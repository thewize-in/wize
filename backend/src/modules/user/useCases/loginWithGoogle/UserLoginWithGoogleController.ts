import { BaseController } from '../../../../shared/infra/BaseController';
import { UserLoginWithGoogle } from './UserLoginWithGoogle';
import { UserLoginWithGoogleDTO } from './UserLoginWithGoogleDTO';

export class UserLoginController extends BaseController {
    private useCase: UserLoginWithGoogle;
    constructor(useCase: UserLoginWithGoogle) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const dto: UserLoginWithGoogleDTO = this.request.body;

        const result: any = await this.useCase.execute(dto);

        if (!result) return this.unauthorized('unvalid token');

        this.request.session['user'] = result;

        return this.ok(this.response);
    }
}
