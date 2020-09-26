import { UseCase } from '../../../../../shared/domain/UseCase';
import { Result } from '../../../../../shared/core/logic/Result';
import { GetListDTO } from './GetListDTO';
import { IListRepo } from '../../../repos/ListRepos/ListRepo';

type Request = GetListDTO;
type Response = Result<any>;

export class GetList implements UseCase<Request, Response> {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  async execute(request: Request): Promise<Response> {
    const { bookId } = request;

    const listResult: Result<any> = await this.listRepo.getList(bookId);

    if (!listResult.getValue()) return Result.ok<any>(false);
    return Result.ok<any>(listResult.getValue());
  }
}
