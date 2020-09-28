import { CloseListDTO } from './CloseListDTO';
import { UseCase } from '../../../../../shared/domain/UseCase';
import { Result } from '../../../../../shared/core/logic/Result';
import { IListRepo } from '../../../repos/ListRepos/ListRepo';
import { IArchiveListRepo } from '../../../repos/ListRepos/ArchiveListRepo';
import { List } from '../../../domain/list';

type Request = CloseListDTO;
type Response = Result<boolean>;

export class CloseList implements UseCase<Request, Response> {
  private listRepo: IListRepo;
  private archiveListRepo: IArchiveListRepo;
  constructor(listRepo: IListRepo, archiveListRepo: IArchiveListRepo) {
    this.listRepo = listRepo;
    this.archiveListRepo = archiveListRepo;
  }
  async execute(request: Request): Promise<Response> {
    const { bookId } = request;

    const listExist = await this.listRepo.exists(bookId);

    if (!listExist) return Result.ok<boolean>(false);

    const list: List = (await this.listRepo.getListByBookId(bookId)).getValue();

    await this.archiveListRepo.save(list);
    await this.listRepo.delete(bookId);

    return Result.ok<boolean>(true);
  }
}
