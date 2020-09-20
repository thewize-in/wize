import { BaseController } from '../../../../../shared/infra/BaseController';
import { GetEntryBookDTO } from './GetEntryBookDTO';
import { Result } from '../../../../../shared/core/logic/Result';
import { GetEntryBook } from './GetEntryBook';

export class GetEntryBookController extends BaseController {
  private useCase: GetEntryBook;
  constructor(getEntryBook: GetEntryBook) {
    super();
    this.useCase = getEntryBook;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];

    const dto: GetEntryBookDTO = { bookId: id };

    let result: Result<any> = await this.useCase.execute(dto);

    if (result.isFailure) return this.fail('not found');

    return this.ok(this.response, result.getValue());
  }
}
