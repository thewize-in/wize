import { BaseController } from '../../../../../shared/infra/BaseController';
import { CreateNewListDTO } from './CreateNewListDTO';
import { CreateNewList } from './CreateNewList';

export class CreateNewListController extends BaseController {
  private useCase: CreateNewList;
  constructor(useCase: CreateNewList) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];
    const listName = this.request.body['listName'];

    const dto: CreateNewListDTO = { bookId: id, listName };
    const result = await this.useCase.execute(dto);

    if (!result.getValue()) return this.fail('failed');
    return this.created(this.response);
  }
}
