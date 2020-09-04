import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { PatientEntryBook } from '../../../domain/patientEntryBook';
import { CreateOfflinePatientEntryDTO } from './CreateOfflinePatientEntryDTO';
import { Result } from '../../../../../shared/core/logic/Result';

type Request = CreateOfflinePatientEntryDTO;
type Response = Result<boolean>;

export class CreateOfflinePatientEntry implements UseCase<Request, Response> {
    private patientEntryBookRepo: IPatientEntryBookRepo;

    constructor(patientEntryBookRepo: IPatientEntryBookRepo) {
        this.patientEntryBookRepo = patientEntryBookRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { patientDetails, bookId } = request;
        let patientEntryBookResult: Result<PatientEntryBook>, patientEntryBook: PatientEntryBook;

        const entryBookExist = await this.patientEntryBookRepo.exists(bookId);

        if (!entryBookExist) return Result.ok<boolean>(false);

        try {
            patientEntryBookResult = await this.patientEntryBookRepo.getPatientEntryBookByBookId(bookId);
            patientEntryBook = patientEntryBookResult.getValue();
        } catch (error) {
            console.log(`[CreatePatientEntry]: here ${patientEntryBookResult.errorValue()}`);
            return Result.ok<boolean>(false);
        }

        patientEntryBook.createOfflineEntry(patientDetails);

        await this.patientEntryBookRepo.save(patientEntryBook);

        return Result.ok<boolean>(true);
    }
}
