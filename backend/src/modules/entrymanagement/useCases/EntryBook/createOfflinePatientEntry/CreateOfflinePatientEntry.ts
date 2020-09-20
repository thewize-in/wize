import { UseCase } from '../../../../../shared/domain/UseCase';
import { IEntryBookRepo } from '../../../repos/EntryBookRepos/EntryBookRepo';
import { EntryBook } from '../../../domain/entryBook';
import { CreateOfflinePatientEntryDTO } from './CreateOfflinePatientEntryDTO';
import { Result } from '../../../../../shared/core/logic/Result';

type Request = CreateOfflinePatientEntryDTO;
type Response = Result<boolean>;

export class CreateOfflinePatientEntry implements UseCase<Request, Response> {
  private entryBookRepo: IEntryBookRepo;

  constructor(entryBookRepo: IEntryBookRepo) {
    this.entryBookRepo = entryBookRepo;
  }
  async execute(request: Request): Promise<Response> {
    const { patientDetails, bookId } = request;
    let entryBookResult: Result<EntryBook>, entryBook: EntryBook;

    const entryBookExist = await this.entryBookRepo.exists(bookId);

    if (!entryBookExist) return Result.ok<boolean>(false);

    try {
      entryBookResult = await this.entryBookRepo.getEntryBookByBookId(bookId);
      entryBook = entryBookResult.getValue();
    } catch (error) {
      console.log(`[CreatePatientEntry]: here ${entryBookResult.errorValue()}`);
      return Result.ok<boolean>(false);
    }

    entryBook.createOfflineEntry(patientDetails);

    await this.entryBookRepo.save(entryBook);

    return Result.ok<boolean>(true);
  }
}
