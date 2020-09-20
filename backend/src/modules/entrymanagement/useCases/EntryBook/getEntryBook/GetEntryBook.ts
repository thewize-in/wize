import { UseCase } from '../../../../../shared/domain/UseCase';
import { IEntryBookRepo } from '../../../repos/EntryBookRepos/EntryBookRepo';
import { Result } from '../../../../../shared/core/logic/Result';
import { GetEntryBookDTO } from './GetEntryBookDTO';

type Request = GetEntryBookDTO;
type Response = Result<any>;

export class GetEntryBook implements UseCase<Request, Response> {
  private entryBookRepo: IEntryBookRepo;

  constructor(entryBookRepo: IEntryBookRepo) {
    this.entryBookRepo = entryBookRepo;
  }

  async execute(request: Request): Promise<Response> {
    const { bookId } = request;

    const donePatientsResult: Result<any> = await this.entryBookRepo.getEntryBook(
      bookId
    );

    if (donePatientsResult.isFailure) return Result.ok<any>(false);

    return Result.ok<any>(donePatientsResult.getValue());
  }
}
