import { DeletePatientEntryBookDTO } from './DeletePatientEntryBookDTO';
import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { Result } from '../../../../../shared/core/logic/Result';

type Request = DeletePatientEntryBookDTO;
type Response = Result<boolean>;

export class DeletePatientEntryBook implements UseCase<Request, Response> {
    private patientEntryBookRepo: IPatientEntryBookRepo;
    constructor(patientEntryBookRepo: IPatientEntryBookRepo) {
        this.patientEntryBookRepo = patientEntryBookRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { bookId } = request;

        const entryBookExist = await this.patientEntryBookRepo.exists(bookId);

        if (!entryBookExist) return Result.ok<boolean>(false);

        await this.patientEntryBookRepo.delete(bookId);

        return Result.ok<boolean>(true);
    }
}
