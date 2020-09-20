import { BaseController } from '../../../../../shared/infra/BaseController';
import { DeleteEntryBook } from './DeleteEntryBook';
import { DeleteEntryBookDTO } from './DeleteEntryBookDTO';

export class DeletEntryBookController extends BaseController {
  private useCase: DeleteEntryBook;

  constructor(useCase: DeleteEntryBook) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];

    const dto: DeleteEntryBookDTO = { bookId: id };

    const result = await this.useCase.execute(dto);

    if (!result.getValue())
      return this.fail('patient entrybook does not exist');

    return this.ok(this.response);
  }
}
