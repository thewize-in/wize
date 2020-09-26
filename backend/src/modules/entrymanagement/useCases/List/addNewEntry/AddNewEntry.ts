import { UseCase } from '../../../../../shared/domain/UseCase';
import { AddNewEntryDTO } from './AddNewEntryDTO';
import { Result } from '../../../../../shared/core/logic/Result';
import { IListRepo } from '../../../repos/ListRepos/ListRepo';
import { List } from '../../../domain/list';

type Request = AddNewEntryDTO;
type Response = Result<boolean>;

export class AddNewEntry implements UseCase<Request, Response> {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }
  async execute(request: Request): Promise<Response> {
    const { entryDetail, bookId } = request;
    let listResult: Result<List>, list: List;

    const listExist = await this.listRepo.exists(bookId);

    if (!listExist) return Result.ok<boolean>(false);

    try {
      listResult = await this.listRepo.getListByBookId(bookId);
      list = listResult.getValue();
    } catch (error) {
      console.log(`[AddNewEntry]: here ${listResult.errorValue()}`);
      return Result.ok<boolean>(false);
    }

    list.createOfflineEntry(entryDetail);

    await this.listRepo.save(list);

    return Result.ok<boolean>(true);
  }
}
