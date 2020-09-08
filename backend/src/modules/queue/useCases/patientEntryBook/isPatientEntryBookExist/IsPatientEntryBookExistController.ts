import { BaseController } from '../../../../../shared/infra/BaseController';
import { IsPatientEntryBookExist } from './IsPatientEntryBookExist';
import { IsPatientEntryBookExitDTO } from './IsPatientEntryBookExistDTO';

export class IsPatientEntryBookExistController extends BaseController {
  private useCase: IsPatientEntryBookExist;
  constructor(useCase: IsPatientEntryBookExist) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];
    const dto: IsPatientEntryBookExitDTO = { bookId: id };

    const result = await this.useCase.execute(dto);

    return this.ok(this.response.status(200), { isExist: result.getValue() });
  }
}
