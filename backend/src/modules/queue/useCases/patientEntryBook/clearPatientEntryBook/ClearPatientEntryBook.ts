import { Doctor } from '../../../domain/doctor';
import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { PatientEntryBook } from '../../../domain/patientEntryBook';

type Request = Doctor;
type Response = boolean;

export class ClearPatientEntryBook implements UseCase<Request, Response> {
    private patientEntryBookRepo: IPatientEntryBookRepo;
    constructor(patientEntryBookRepo: IPatientEntryBookRepo) {
        this.patientEntryBookRepo = patientEntryBookRepo;
    }
    async execute(request: Request): Promise<boolean> {
        const doctor = request;
        let patientEntryBook: PatientEntryBook;

        try {
            const bookId = doctor.doctorId.id;
            patientEntryBook = PatientEntryBook.createDefault(bookId).getValue();
        } catch (error) {
            console.log(error);
            return false;
        }

        await this.patientEntryBookRepo.save(patientEntryBook);

        return;
    }
}
