import { BaseController } from '../../../../shared/infra/BaseController';
import { GetUserProfile } from './GetUserProfile';
import { GetUserProfileDTO } from './GetUserProfileDTO';
import { ReturnResult } from '../../../../shared/core/logic/Result';

export class GetUserProfileController extends BaseController {
    private useCase: GetUserProfile;
    constructor(useCase: GetUserProfile) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const dto: GetUserProfileDTO = this.request.session['user'];

        const result: ReturnResult = await this.useCase.execute(dto);

        if (!result.succeeded) return this.notFound('user not found');
        return this.ok(this.response, result.value);
    }
}
