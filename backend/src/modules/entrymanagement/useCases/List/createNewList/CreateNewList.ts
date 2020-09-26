import { UseCase } from '../../../../../shared/domain/UseCase';
import { Result } from '../../../../../shared/core/logic/Result';
import { List } from '../../../domain/list';
import { CreateNewListDTO } from './CreateNewListDTO';
import { IListRepo } from '../../../repos/ListRepos/ListRepo';

type Request = CreateNewListDTO;
type Response = Result<boolean>;

export class CreateNewList implements UseCase<Request, Response> {
  private listRepo: IListRepo;
  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }
  async execute(request: Request): Promise<Response> {
    const { bookId } = request;
    let listResult: Result<List>, list: List;

    const listExist = await this.listRepo.exists(bookId);

    if (listExist) return Result.ok<boolean>(false);
    try {
      listResult = List.createDefault(bookId);
      list = listResult.getValue();
    } catch (error) {
      console.log(error);
      return Result.ok<boolean>(false);
    }

    await this.listRepo.save(list);

    return Result.ok<boolean>(true);
  }
}
