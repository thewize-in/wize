import { UseCase } from '../../../../../shared/domain/UseCase';
import { IEntryBookRepo } from '../../../repos/EntryBookRepos/EntryBookRepo';
import { NextEntryDTO } from './NextEntryDTO';
import { Result } from '../../../../../shared/core/logic/Result';
import { EntryBook } from '../../../domain/entryBook';

type Request = NextEntryDTO;
type Response = Result<boolean>;

export class NextEntry implements UseCase<Request, Response> {
  private entryBookRepo: IEntryBookRepo;
  constructor(entryBookRepo: IEntryBookRepo) {
    this.entryBookRepo = entryBookRepo;
  }
  async execute(request: Request): Promise<Response> {
    const { bookId, isPreviousEntryDone } = request;
    let entryBookResult: Result<EntryBook>, entryBook: EntryBook;

    const entryBookExist = await this.entryBookRepo.exists(bookId);

    if (!entryBookExist) return Result.ok<boolean>(false);

    try {
      entryBookResult = await this.entryBookRepo.getEntryBookByBookId(bookId);
      entryBook = entryBookResult.getValue();
    } catch (error) {
      return Result.ok<boolean>(false);
    }
    const currentPatientNumber = entryBook.currentPatientNumber;
    const totalPatientNumber = entryBook.totalPatientNumber;

    if (!(currentPatientNumber <= totalPatientNumber)) {
      return Result.ok<boolean>(false);
    }

    if (isPreviousEntryDone) {
      entryBook.addToDone();
    } else {
      entryBook.addToUndone();
    }
    entryBook.callNextEntry();

    await this.entryBookRepo.save(entryBook);

    return Result.ok<boolean>(true);
  }
}
