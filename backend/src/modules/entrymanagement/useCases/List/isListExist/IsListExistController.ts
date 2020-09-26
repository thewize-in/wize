import { BaseController } from '../../../../../shared/infra/BaseController';
import { IsListExist } from './IsListExist';
import { IsListExitDTO } from './IsListExistDTO';

export class IsListExistController extends BaseController {
  private useCase: IsListExist;
  constructor(useCase: IsListExist) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];
    const dto: IsListExitDTO = { bookId: id };

    const result = await this.useCase.execute(dto);

    return this.ok(this.response, { isExist: result.getValue() });
  }
}
