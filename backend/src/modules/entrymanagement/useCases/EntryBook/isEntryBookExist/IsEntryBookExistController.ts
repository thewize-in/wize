import { BaseController } from '../../../../../shared/infra/BaseController';
import { IsEntryBookExist } from './IsEntryBookExist';
import { IsEntryBookExitDTO } from './IsEntryBookExistDTO';

export class IsEntryBookExistController extends BaseController {
  private useCase: IsEntryBookExist;
  constructor(useCase: IsEntryBookExist) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];
    const dto: IsEntryBookExitDTO = { bookId: id };

    const result = await this.useCase.execute(dto);

    return this.ok(this.response, { isExist: result.getValue() });
  }
}
