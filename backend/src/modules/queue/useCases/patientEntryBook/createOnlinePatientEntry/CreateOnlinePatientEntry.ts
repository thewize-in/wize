import { UseCase } from '../../../../../shared/domain/UseCase';
import { CreateOnlinePatientEntryDTO } from './CreateOnlinePatientEntryDTO';
import { IPatientRepo } from '../../../repos/patientRepos/PatientRepo';
import { IDoctorRepo } from '../../../repos/doctorRepos/DoctorRepo';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { Result } from '../../../../../shared/core/logic/Result';
import { PatientEntryBook } from '../../../domain/patientEntryBook';
import { Patient } from '../../../domain/patient';
import { Doctor } from '../../../domain/doctor';

type Request = CreateOnlinePatientEntryDTO;
type Response = boolean;

export class CreateOnlinePatientEntry implements UseCase<Request, Response> {
    private patientRepo: IPatientRepo;
    private doctorRepo: IDoctorRepo;
    private patientEntryBookRepo: IPatientEntryBookRepo;
    constructor(patientRepo: IPatientRepo, doctorRepo: IDoctorRepo, patientEntryBookRepo: IPatientEntryBookRepo) {
        this.patientRepo = patientRepo;
        this.doctorRepo = doctorRepo;
        this.patientEntryBookRepo = patientEntryBookRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { patientDetails, doctorId } = request;
        const patientId = patientDetails.id;

        let patientResult: Result<Patient>,
            doctorResult: Result<Doctor>,
            patientEntryBookResult: Result<PatientEntryBook>,
            patient: Patient,
            doctor: Doctor,
            patientEntryBook: PatientEntryBook;

        try {
            patientResult = await this.patientRepo.getPatientByPatientId(patientId);
            patient = patientResult.getValue();
            if (patient.hasJoined()) return false;
        } catch (error) {
            console.log(`[CreateOnlinePatientEntry]: ${error}`);
            return false;
        }

        try {
            doctorResult = await this.doctorRepo.getDoctorByDoctorId(doctorId);
            doctor = doctorResult.getValue();

            if (!doctor.status.isActive()) return false;
            if (!doctor.status.isResume()) return false;
        } catch (error) {
            console.log(`[CreateOnlinePatientEntry: ${error}`);
            return false;
        }

        try {
            const bookId = doctorId;
            patientEntryBookResult = await this.patientEntryBookRepo.getPatientEntryBookByBookId(bookId);
            patientEntryBook = patientEntryBookResult.getValue();
        } catch (error) {
            console.log(`[CreateOnlinePatientEntry]: ${error}`);
            return false;
        }

        patientEntryBook.createOnlineEntry(patientDetails, patient);

        await this.patientEntryBookRepo.save(patientEntryBook);

        return true;
    }
}
