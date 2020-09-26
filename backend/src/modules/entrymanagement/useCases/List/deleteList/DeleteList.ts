import { DeleteDTO } from './DeleteListDTO';
import { UseCase } from '../../../../../shared/domain/UseCase';
import { Result } from '../../../../../shared/core/logic/Result';
import { IListRepo } from '../../../repos/ListRepos/ListRepo';

type Request = DeleteDTO;
type Response = Result<boolean>;

export class DeleteList implements UseCase<Request, Response> {
  private listRepo: IListRepo;
  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }
  async execute(request: Request): Promise<Response> {
    const { bookId } = request;

    const listExist = await this.listRepo.exists(bookId);

    if (!listExist) return Result.ok<boolean>(false);

    await this.listRepo.delete(bookId);

    return Result.ok<boolean>(true);
  }
}
