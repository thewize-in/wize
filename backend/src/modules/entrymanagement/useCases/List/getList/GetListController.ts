import { BaseController } from '../../../../../shared/infra/BaseController';
import { GetListDTO } from './GetListDTO';
import { Result } from '../../../../../shared/core/logic/Result';
import { GetList } from './GetList';

export class GetListController extends BaseController {
  private useCase: GetList;
  constructor(useCase: GetList) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];

    const dto: GetListDTO = { bookId: id };

    let result: Result<any> = await this.useCase.execute(dto);

    if (result.isFailure) return this.fail('not found');

    return this.ok(this.response, result.getValue());
  }
}
