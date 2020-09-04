import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { Result } from '../../../../../shared/core/logic/Result';
import { GetPatientListDTO } from './GetPatientListDTO';

type Request = GetPatientListDTO;
type Response = Result<any>;

export class GetDonePatients implements UseCase<Request, Response> {
    private patientEntryBookRepo: IPatientEntryBookRepo;

    constructor(patientEntryBookRepo: IPatientEntryBookRepo) {
        this.patientEntryBookRepo = patientEntryBookRepo;
    }

    async execute(request: Request): Promise<Response> {
        const { bookId } = request;

        const donePatientsResult = await this.patientEntryBookRepo.getDonePatients(bookId);

        if (donePatientsResult.isFailure) return Result.ok<any>(false);

        return Result.ok<any>(donePatientsResult.getValue());
    }
}
