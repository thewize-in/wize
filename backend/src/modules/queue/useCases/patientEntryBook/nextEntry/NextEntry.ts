import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { NextEntryDTO } from './NextEntryDTO';
import { Result } from '../../../../../shared/core/logic/Result';
import { PatientEntryBook } from '../../../domain/patientEntryBook';

type Request = NextEntryDTO;
type Response = Result<boolean>;

export class NextEntry implements UseCase<Request, Response> {
  private patientEntryBookRepo: IPatientEntryBookRepo;
  constructor(patientEntryBookRepo: IPatientEntryBookRepo) {
    this.patientEntryBookRepo = patientEntryBookRepo;
  }
  async execute(request: Request): Promise<Response> {
    const { bookId, isPreviousEntryDone } = request;
    let patientEntryBookResult: Result<PatientEntryBook>,
      patientEntryBook: PatientEntryBook;

    const entryBookExist = await this.patientEntryBookRepo.exists(bookId);

    if (!entryBookExist) return Result.ok<boolean>(false);

    try {
      patientEntryBookResult = await this.patientEntryBookRepo.getPatientEntryBookByBookId(
        bookId
      );
      patientEntryBook = patientEntryBookResult.getValue();
    } catch (error) {
      throw patientEntryBookResult.errorValue();
    }
    const currentPatientNumber = patientEntryBook.currentPatientNumber;
    const totalPatientNumber = patientEntryBook.totalPatientNumber;

    if (!(currentPatientNumber < totalPatientNumber)) {
      return Result.ok<boolean>(false);
    }

    patientEntryBook.nextEntry(isPreviousEntryDone);

    await this.patientEntryBookRepo.save(patientEntryBook);

    return Result.ok<boolean>(true);
  }
}
