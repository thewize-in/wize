import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientRepo } from '../../../repos/patientRepos/PatientRepo';
import { Patient } from '../../../domain/patient';

type Request = { patient: Patient };
type Response = void;

export class UpdatePatientStatus implements UseCase<Request, Response> {
    private patientRepo: IPatientRepo;
    constructor(patientRepo: IPatientRepo) {
        this.patientRepo = patientRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { patient } = request;

        await this.patientRepo.save(patient);
    }
}
