import { UseCase } from '../../../../../shared/domain/UseCase';

type CreateDoctorRequest = any;
type CreateDoctorResponse = any;

export class CreateDoctor implements UseCase<CreateDoctorRequest, CreateDoctorResponse> {
    constructor() {}
    async execute(request: CreateDoctorRequest): Promise<CreateDoctorResponse> {}
}
