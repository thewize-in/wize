import { DeleteEntryBookDTO } from './DeleteEntryBookDTO';
import { UseCase } from '../../../../../shared/domain/UseCase';
import { IEntryBookRepo } from '../../../repos/EntryBookRepos/EntryBookRepo';
import { Result } from '../../../../../shared/core/logic/Result';

type Request = DeleteEntryBookDTO;
type Response = Result<boolean>;

export class DeleteEntryBook implements UseCase<Request, Response> {
  private entryBookRepo: IEntryBookRepo;
  constructor(entryBookRepo: IEntryBookRepo) {
    this.entryBookRepo = entryBookRepo;
  }
  async execute(request: Request): Promise<Response> {
    const { bookId } = request;

    const entryBookExist = await this.entryBookRepo.exists(bookId);

    if (!entryBookExist) return Result.ok<boolean>(false);

    await this.entryBookRepo.delete(bookId);

    return Result.ok<boolean>(true);
  }
}
