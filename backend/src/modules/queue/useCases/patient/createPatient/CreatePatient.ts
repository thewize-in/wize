import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientStatusRepo } from '../../../repos/patientRepo/PatientStatusRepo';
import { Patient } from '../../../domain/patient';
import { Result } from '../../../../../shared/core/logic/Result';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';

type CreatePatientRequest = { id: UniqueEntityID };
type CreatePatientResponse = any;

export class CreatePatient implements UseCase<CreatePatientRequest, CreatePatientResponse> {
    private patientStatusRepo: IPatientStatusRepo;
    constructor(patientStatusRepo: IPatientStatusRepo) {
        this.patientStatusRepo = patientStatusRepo;
    }
    async execute(request: CreatePatientRequest): Promise<CreatePatientResponse> {
        const { id } = request;

        const patientExistResult: any = await this.patientStatusRepo.exists(id.toString());

        if (!patientExistResult.succeeded) {
            const patient: Patient = Patient.create(null, id).getValue();
            await this.patientStatusRepo.save(patient);
        }
        return Result.success(true);
    }
}
