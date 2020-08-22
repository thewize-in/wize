import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientRepo } from '../../../repos/patientRepos/PatientRepo';
import { LeaveDoctorDTO } from './LeaveDoctorDTO';
import { Patient } from '../../../domain/patient';
import { Result } from '../../../../../shared/core/logic/Result';
import { PatientStatus } from '../../../domain/patientStatus';

type Request = LeaveDoctorDTO;
type Response = boolean;

export class LeaveDoctor implements UseCase<Request, Response> {
    private patientRepo: IPatientRepo;
    constructor(patientRepo: IPatientRepo) {
        this.patientRepo = patientRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { patientId } = request;
        let patientResult: Result<Patient>,
            patientLeavedStatusResult: Result<PatientStatus>,
            patient: Patient,
            patientLeavedStatus: PatientStatus;

        try {
            patientResult = await this.patientRepo.getPatientByPatientId(patientId);
            patient = patientResult.getValue();
        } catch (error) {
            console.log(`[LeaveDoctor]: ${patientResult.errorValue()}`);
            return false;
        }

        try {
            patientLeavedStatusResult = PatientStatus.createLeavedStatus();
            patientLeavedStatus = patientLeavedStatusResult.getValue();
        } catch (error) {
            throw patientLeavedStatusResult.errorValue();
        }

        patient.updateStatus(patientLeavedStatus);
        patient.setWatingNumber(Infinity);

        await this.patientRepo.save(patient);

        return true;
    }
}
