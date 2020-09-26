import { BaseController } from '../../../../../shared/infra/BaseController';
import { DeleteList } from './DeleteList';
import { DeleteDTO } from './DeleteListDTO';

export class DeleteListController extends BaseController {
  private useCase: DeleteList;

  constructor(useCase: DeleteList) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];

    const dto: DeleteDTO = { bookId: id };

    const result = await this.useCase.execute(dto);

    if (!result.getValue()) return this.fail('patient list does not exist');

    return this.ok(this.response);
  }
}
