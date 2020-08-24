import { Doctor } from '../../../domain/doctor';
import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { Result } from '../../../../../shared/core/logic/Result';
import { PatientEntryBook } from '../../../domain/patientEntryBook';

type Request = Doctor;
type Response = boolean;

export class CreatePatientEntryBook implements UseCase<Request, Response> {
    private patientEntryBookRepo: IPatientEntryBookRepo;
    constructor(patientEntryBookRepo: IPatientEntryBookRepo) {
        this.patientEntryBookRepo = patientEntryBookRepo;
    }
    async execute(request: Request): Promise<Response> {
        const doctor = request;
        let patientEntryBookResult: Result<PatientEntryBook>, patientEntryBook: PatientEntryBook;

        try {
            const bookId = doctor.doctorId.id;

            patientEntryBookResult = PatientEntryBook.createDefault(bookId);
            patientEntryBook = patientEntryBookResult.getValue();
        } catch (error) {
            console.log(error);
            return false;
        }

        await this.patientEntryBookRepo.save(patientEntryBook);

        return;
    }
}
