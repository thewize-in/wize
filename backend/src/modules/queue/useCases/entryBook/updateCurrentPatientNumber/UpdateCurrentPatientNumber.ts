import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { UpdateCurrentPatientNumberDTO } from './UpdateCurrentPatientNumberDTO';
import { Result } from '../../../../../shared/core/logic/Result';
import { PatientEntryBook } from '../../../domain/patientEntryBook';

type Request = UpdateCurrentPatientNumberDTO;
type Response = boolean;

export class UpdateCurrentPatientNumber implements UseCase<Request, Response> {
    private patientEntryBookRepo: IPatientEntryBookRepo;
    constructor(patientEntryBookRepo: IPatientEntryBookRepo) {
        this.patientEntryBookRepo = patientEntryBookRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { bookId } = request;
        let patientEntryBookResult: Result<PatientEntryBook>, patientEntryBook: PatientEntryBook;

        try {
            patientEntryBookResult = await this.patientEntryBookRepo.getPatientEntryBookByBookId(bookId);
            patientEntryBook = patientEntryBookResult.getValue();
        } catch (error) {
            throw patientEntryBookResult.errorValue();
        }
        const currentPatientNumber = patientEntryBook.patientStats.currentPatientNumber;
        const totalPatientNumber = patientEntryBook.patientStats.totalPatientNumber;

        if (!(currentPatientNumber < totalPatientNumber)) {
            return false;
        }

        patientEntryBook.patientStats.incrCurrentPatientNumber();

        await this.patientEntryBookRepo.save(patientEntryBook);

        return true;
    }
}
// need refactoring
