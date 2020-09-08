import { BaseController } from '../../../../../shared/infra/BaseController';
import { GetPatientEntryBookDTO } from './GetPatientEntryBookDTO';
import { Result } from '../../../../../shared/core/logic/Result';
import { GetPatientEntryBook } from './GetPatientEntryBook';

export class GetPatientEntryBookController extends BaseController {
  private getPatientEntryBook: GetPatientEntryBook;
  constructor(getPatientEntryBook: GetPatientEntryBook) {
    super();
    this.getPatientEntryBook = getPatientEntryBook;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];

    const dto: GetPatientEntryBookDTO = { bookId: id };

    let result: Result<any> = await this.getPatientEntryBook.execute(dto);

    if (result.isFailure) return this.fail('not found');

    return this.ok(this.response.status(200), result.getValue());
  }
}
