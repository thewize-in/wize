import { UseCase } from '../../../../../shared/domain/UseCase';
import { NextEntryDTO } from './NextEntryDTO';
import { Result } from '../../../../../shared/core/logic/Result';
import { List } from '../../../domain/list';
import { IListRepo } from '../../../repos/ListRepos/ListRepo';

type Request = NextEntryDTO;
type Response = Result<boolean>;

export class NextEntry implements UseCase<Request, Response> {
  private listRepo: IListRepo;
  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }
  async execute(request: Request): Promise<Response> {
    const { bookId, isPreviousEntryDone } = request;
    let listResult: Result<List>, list: List;

    const listExist = await this.listRepo.exists(bookId);

    if (!listExist) return Result.ok<boolean>(false);

    try {
      listResult = await this.listRepo.getListByBookId(bookId);
      list = listResult.getValue();
    } catch (error) {
      return Result.ok<boolean>(false);
    }
    const currentEntryNumber = list.currentEntryNumber;
    const totalEntries = list.totalEntries;

    if (!(currentEntryNumber <= totalEntries)) {
      return Result.ok<boolean>(false);
    }

    if (isPreviousEntryDone) {
      list.addToDoneEntries();
    } else {
      list.addToUndoneEntries();
    }
    list.callNextEntry();

    await this.listRepo.save(list);

    return Result.ok<boolean>(true);
  }
}
