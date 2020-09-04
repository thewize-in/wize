import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { Result } from '../../../../../shared/core/logic/Result';
import { PatientEntryBook } from '../../../domain/patientEntryBook';
import { CreatePatientEntryBookDTO } from './CreatePatientEntryBookDTO';

type Request = CreatePatientEntryBookDTO;
type Response = Result<boolean>;

export class CreatePatientEntryBook implements UseCase<Request, Response> {
    private patientEntryBookRepo: IPatientEntryBookRepo;
    constructor(patientEntryBookRepo: IPatientEntryBookRepo) {
        this.patientEntryBookRepo = patientEntryBookRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { bookId } = request;
        let patientEntryBookResult: Result<PatientEntryBook>, patientEntryBook: PatientEntryBook;

        const entryBookExist = await this.patientEntryBookRepo.exists(bookId);

        if (entryBookExist) return Result.ok<boolean>(false);

        try {
            patientEntryBookResult = PatientEntryBook.createDefault(bookId);
            patientEntryBook = patientEntryBookResult.getValue();
        } catch (error) {
            console.log(error);
            return Result.ok<boolean>(false);
        }

        await this.patientEntryBookRepo.save(patientEntryBook);

        return Result.ok<boolean>(true);
    }
}
