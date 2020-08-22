import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { PatientEntryBook } from '../../../domain/patientEntryBook';
import { CreatePatientEntryDTO } from './CreatePatientEntryDTO';
import { Result } from '../../../../../shared/core/logic/Result';

type Request = CreatePatientEntryDTO;
type Response = any;

export class CreatePatientEntry implements UseCase<Request, Response> {
    private patientEntryBookRepo: IPatientEntryBookRepo;

    constructor(patientEntryBookRepo: IPatientEntryBookRepo) {
        this.patientEntryBookRepo = patientEntryBookRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { patientDetails, doctorId, patient } = request;
        let patientEntryBookResult: Result<PatientEntryBook>, patientEntryBook: PatientEntryBook;

        try {
            const bookId = doctorId;
            patientEntryBookResult = await this.patientEntryBookRepo.getPatientEntryBookByBookId(bookId);
            patientEntryBook = patientEntryBookResult.getValue();
        } catch (error) {
            console.log(`[CreatePatientEntry]: here ${patientEntryBookResult.errorValue()}`);
            return false;
        }

        if (patient) {
            patientEntryBook.createOnlineEntry(patientDetails, patient);
        } else {
            patientEntryBook.createOfflineEntry(patientDetails);
        }

        await this.patientEntryBookRepo.save(patientEntryBook);

        return true;
    }
}
