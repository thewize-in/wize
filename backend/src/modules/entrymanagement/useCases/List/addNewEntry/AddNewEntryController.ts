import { BaseController } from '../../../../../shared/infra/BaseController';
import { AddNewEntry } from './AddNewEntry';
import { AddNewEntryDTO } from './AddNewEntryDTO';

export class AddNewEntryController extends BaseController {
  private useCase: AddNewEntry;
  constructor(useCase: AddNewEntry) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];

    const entryDetail = {
      name: this.request.body['name'],
      address: this.request.body['address'],
      phone: this.request.body['phone'],
      type: 'offline',
    };
    const dto: AddNewEntryDTO = {
      entryDetail,
      bookId: id,
    };

    const result = await this.useCase.execute(dto);

    if (!result.getValue()) return this.ok(this.response, 'failed');
    return this.created(this.response);
  }
}
