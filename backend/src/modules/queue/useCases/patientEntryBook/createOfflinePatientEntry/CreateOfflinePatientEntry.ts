import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { PatientEntryBook } from '../../../domain/patientEntryBook';
import { CreateOfflinePatientEntryDTO } from './CreateOfflinePatientEntryDTO';
import { Result } from '../../../../../shared/core/logic/Result';

type Request = CreateOfflinePatientEntryDTO;
type Response = boolean;

export class CreateOfflinePatientEntry implements UseCase<Request, Response> {
    private patientEntryBookRepo: IPatientEntryBookRepo;

    constructor(patientEntryBookRepo: IPatientEntryBookRepo) {
        this.patientEntryBookRepo = patientEntryBookRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { patientDetails, doctorId } = request;
        let patientEntryBookResult: Result<PatientEntryBook>, patientEntryBook: PatientEntryBook;

        try {
            const bookId = doctorId;
            patientEntryBookResult = await this.patientEntryBookRepo.getPatientEntryBookByBookId(bookId);
            patientEntryBook = patientEntryBookResult.getValue();
        } catch (error) {
            console.log(`[CreatePatientEntry]: here ${patientEntryBookResult.errorValue()}`);
            return false;
        }

        patientEntryBook.createOfflineEntry(patientDetails);

        await this.patientEntryBookRepo.save(patientEntryBook);

        return true;
    }
}
