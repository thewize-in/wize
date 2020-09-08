import { UseCase } from '../../../../../shared/domain/UseCase';
import { Result } from '../../../../../shared/core/logic/Result';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { IsPatientEntryBookExitDTO } from './IsPatientEntryBookExistDTO';

type Request = IsPatientEntryBookExitDTO;
type Response = Result<boolean>;

export class IsPatientEntryBookExist implements UseCase<Request, Response> {
  private patientEntryBookRepo: IPatientEntryBookRepo;

  constructor(patientEntryBookRepo: IPatientEntryBookRepo) {
    this.patientEntryBookRepo = patientEntryBookRepo;
  }

  async execute(request: Request): Promise<Response> {
    const { bookId } = request;

    const isExist = await this.patientEntryBookRepo.exists(bookId);

    return Result.ok<boolean>(isExist);
  }
}
