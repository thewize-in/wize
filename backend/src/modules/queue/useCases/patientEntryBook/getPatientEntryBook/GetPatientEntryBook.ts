import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { Result } from '../../../../../shared/core/logic/Result';
import { GetPatientEntryBookDTO } from './GetPatientEntryBookDTO';

type Request = GetPatientEntryBookDTO;
type Response = Result<any>;

export class GetPatientEntryBook implements UseCase<Request, Response> {
  private patientEntryBookRepo: IPatientEntryBookRepo;

  constructor(patientEntryBookRepo: IPatientEntryBookRepo) {
    this.patientEntryBookRepo = patientEntryBookRepo;
  }

  async execute(request: Request): Promise<Response> {
    const { bookId } = request;

    const donePatientsResult: Result<any> = await this.patientEntryBookRepo.getPatientEntryBook(
      bookId
    );

    if (donePatientsResult.isFailure) return Result.ok<any>(false);

    return Result.ok<any>(donePatientsResult.getValue());
  }
}
