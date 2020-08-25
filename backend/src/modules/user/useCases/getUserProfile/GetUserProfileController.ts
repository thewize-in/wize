import { BaseController } from '../../../../shared/infra/BaseController';
import { GetUserProfile } from './GetUserProfile';
import { GetUserProfileDTO } from './GetUserProfileDTO';

export class GetUserProfileController extends BaseController {
    private useCase: GetUserProfile;
    constructor(useCase: GetUserProfile) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const id = this.request.session['user']['id'];

        const dto: GetUserProfileDTO = { userId: id };
        const result = await this.useCase.execute(dto);
        return this.ok(this.response.status(200), result);
    }
}
