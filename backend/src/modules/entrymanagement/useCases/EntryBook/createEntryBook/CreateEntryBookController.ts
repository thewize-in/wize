import { BaseController } from '../../../../../shared/infra/BaseController';
import { CreateEntryBookDTO } from './CreateEntryBookDTO';
import { CreateEntryBook } from './CreateEntryBook';

export class CreateEntryBookController extends BaseController {
  private useCase: CreateEntryBook;
  constructor(useCase: CreateEntryBook) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];

    const dto: CreateEntryBookDTO = { bookId: id };
    const result = await this.useCase.execute(dto);

    if (!result.getValue()) return this.fail('failed');
    return this.created(this.response);
  }
}
