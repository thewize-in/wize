import { UseCase } from '../../../../../shared/domain/UseCase';
import { Result } from '../../../../../shared/core/logic/Result';
import { IEntryBookRepo } from '../../../repos/EntryBookRepos/EntryBookRepo';
import { IsEntryBookExitDTO } from './IsEntryBookExistDTO';

type Request = IsEntryBookExitDTO;
type Response = Result<boolean>;

export class IsEntryBookExist implements UseCase<Request, Response> {
  private entryBookRepo: IEntryBookRepo;

  constructor(entryBookRepo: IEntryBookRepo) {
    this.entryBookRepo = entryBookRepo;
  }

  async execute(request: Request): Promise<Response> {
    const { bookId } = request;

    const isExist = await this.entryBookRepo.exists(bookId);

    return Result.ok<boolean>(isExist);
  }
}
