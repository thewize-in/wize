import { UseCase } from '../../../../../shared/domain/UseCase';
import { Patient } from '../../../domain/patient';
import { IPatientRepo } from '../../../repos/patientRepos/PatientRepo';
import { IDoctorRepo } from '../../../repos/doctorRepos/DoctorRepo';
import { Doctor } from '../../../domain/doctor';
import { JoinDoctorDTO } from './JoinDoctorDTO';
import { Result } from '../../../../../shared/core/logic/Result';
import { PatientStatus } from '../../../domain/patientStatus';

type Request = JoinDoctorDTO;
type Response = boolean;

export class JoinDoctor implements UseCase<Request, Response> {
    private patientRepo: IPatientRepo;
    private doctorRepo: IDoctorRepo;
    constructor(patientRepo: IPatientRepo, doctorRepo: IDoctorRepo) {
        this.patientRepo = patientRepo;
        this.doctorRepo = doctorRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { patientId, doctorId, patientName } = request;
        let patientJoinedStatusResult: Result<PatientStatus>,
            patientJoinedStatus: PatientStatus,
            patient: Patient,
            doctor: Doctor;

        try {
            const patientResult = await this.patientRepo.getPatientByPatientId(patientId);
            patient = patientResult.getValue();
            if (patient.hasJoined()) return false;
        } catch (error) {
            console.log(`[JoinDoctor]: ${error}`);
            return false;
        }

        try {
            const doctorResult = await this.doctorRepo.getDoctorByDoctorId(doctorId);
            doctor = doctorResult.getValue();

            if (!doctor.status.isActive()) return false;
            if (!doctor.status.isResume()) return false;
        } catch (error) {
            console.log(`[JoinDoctor: ${error}`);
            return false;
        }

        try {
            patientJoinedStatusResult = PatientStatus.createJoinedStatus(doctorId);
            patientJoinedStatus = patientJoinedStatusResult.getValue();
        } catch (error) {
            throw patientJoinedStatusResult.errorValue();
        }

        patient.updateStatus(patientJoinedStatus);

        const patientDetails = {
            name: patientName,
            id: patientId,
            tag: 'online',
        };

        patient.createJoinRequest(doctorId, patientDetails);

        await this.patientRepo.save(patient);

        return true;
    }
}
// not ideal solution
