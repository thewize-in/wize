import { UseCase } from '../../../../../shared/domain/UseCase';
import { IEntryBookRepo } from '../../../repos/EntryBookRepos/EntryBookRepo';
import { Result } from '../../../../../shared/core/logic/Result';
import { EntryBook } from '../../../domain/entryBook';
import { CreateEntryBookDTO } from './CreateEntryBookDTO';

type Request = CreateEntryBookDTO;
type Response = Result<boolean>;

export class CreateEntryBook implements UseCase<Request, Response> {
  private entryBookRepo: IEntryBookRepo;
  constructor(entryBookRepo: IEntryBookRepo) {
    this.entryBookRepo = entryBookRepo;
  }
  async execute(request: Request): Promise<Response> {
    const { bookId } = request;
    let entryBookResult: Result<EntryBook>, entryBook: EntryBook;

    const entryBookExist = await this.entryBookRepo.exists(bookId);

    if (entryBookExist) return Result.ok<boolean>(false);
    try {
      entryBookResult = EntryBook.createDefault(bookId);
      entryBook = entryBookResult.getValue();
    } catch (error) {
      console.log(error);
      return Result.ok<boolean>(false);
    }

    await this.entryBookRepo.save(entryBook);

    return Result.ok<boolean>(true);
  }
}
