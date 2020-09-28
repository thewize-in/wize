import { BaseController } from '../../../../../shared/infra/BaseController';
import { CloseList } from './CloseList';
import { CloseListDTO } from './CloseListDTO';

export class CloseListController extends BaseController {
  private useCase: CloseList;

  constructor(useCase: CloseList) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];

    const dto: CloseListDTO = { bookId: id };

    const result = await this.useCase.execute(dto);

    if (!result.getValue()) return this.fail('patient list does not exist');

    return this.ok(this.response);
  }
}
