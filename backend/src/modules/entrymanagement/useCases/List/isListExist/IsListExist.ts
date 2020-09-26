import { UseCase } from '../../../../../shared/domain/UseCase';
import { Result } from '../../../../../shared/core/logic/Result';
import { IsListExitDTO } from './IsListExistDTO';
import { IListRepo } from '../../../repos/ListRepos/ListRepo';

type Request = IsListExitDTO;
type Response = Result<boolean>;

export class IsListExist implements UseCase<Request, Response> {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  async execute(request: Request): Promise<Response> {
    const { bookId } = request;

    const isExist = await this.listRepo.exists(bookId);

    return Result.ok<boolean>(isExist);
  }
}
