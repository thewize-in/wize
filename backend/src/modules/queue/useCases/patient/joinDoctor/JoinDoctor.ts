import { UseCase } from '../../../../../shared/domain/UseCase';
import { Patient } from '../../../domain/patient';
import { IPatientRepo } from '../../../repos/patientRepos/PatientRepo';
import { PatientStatus } from '../../../domain/patientStatus';

type Request = Patient;
type Response = boolean;

export class JoinDoctor implements UseCase<Request, Response> {
    private patientRepo: IPatientRepo;

    constructor(patientRepo: IPatientRepo) {
        this.patientRepo = patientRepo;
    }
    async execute(request: Request): Promise<Response> {
        const patient = request;

        const patientJoinedStatus = PatientStatus.createJoinedStatus().getValue();

        patient.updateStatus(patientJoinedStatus);

        await this.patientRepo.save(patient);

        return true;
    }
}
// not ideal solution
