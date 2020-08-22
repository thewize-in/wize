import { UseCase } from '../../../../../shared/domain/UseCase';
import { Patient } from '../../../domain/patient';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { IPatientRepo } from '../../../repos/patientRepos/PatientRepo';
import { PatientStatus } from '../../../domain/patientStatus';

type Request = { id: string };
type Response = any;

export class CreatePatient implements UseCase<Request, Response> {
    private patientRepo: IPatientRepo;
    constructor(patientRepo: IPatientRepo) {
        this.patientRepo = patientRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { id } = request;

        const patientExist = await this.patientRepo.exists(id);

        if (!patientExist) {
            const patientId = new UniqueEntityID(id);
            const patientDefaultStatus = PatientStatus.createDefaultStatus().getValue();
            const patient: Patient = Patient.create({ status: patientDefaultStatus }, patientId).getValue();

            await this.patientRepo.save(patient);
            return true;
        }
        return false;
    }
}
