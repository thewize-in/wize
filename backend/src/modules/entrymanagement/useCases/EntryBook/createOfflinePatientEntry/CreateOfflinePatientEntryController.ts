import { BaseController } from '../../../../../shared/infra/BaseController';
import { CreateOfflinePatientEntry } from './CreateOfflinePatientEntry';
import { CreateOfflinePatientEntryDTO } from './CreateOfflinePatientEntryDTO';

export class CreateOfflinePatientEntryController extends BaseController {
  private useCase: CreateOfflinePatientEntry;
  constructor(useCase: CreateOfflinePatientEntry) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];

    const patientDetails = {
      name: this.request.body['name'],
      address: this.request.body['address'],
      phone: this.request.body['phone'],
      type: 'offline',
    };
    const dto: CreateOfflinePatientEntryDTO = {
      patientDetails,
      bookId: id,
    };

    const result = await this.useCase.execute(dto);

    if (!result.getValue()) return this.ok(this.response, 'failed');
    return this.created(this.response);
  }
}
