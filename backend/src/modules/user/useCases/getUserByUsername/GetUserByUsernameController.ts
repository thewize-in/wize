import { BaseController } from '../../../../shared/infra/BaseController';
import { UseCase } from '../../../../shared/domain/UseCase';
import { GetUserByUsername } from './GetUserByUsername';
import { GetUserByUsernameDTO } from './GetUserByUsernameDTO';

type Request = { username: string };

export class GetUserByUsernameController extends BaseController {
    private useCase: GetUserByUsername;
    constructor(useCase: GetUserByUsername) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const dto: GetUserByUsernameDTO = this.request.params as Request;
        const result: any = await this.useCase.execute(dto);
        if (!result) return this.notFound('user not found');
        return this.ok(this.response, result);
    }
}
