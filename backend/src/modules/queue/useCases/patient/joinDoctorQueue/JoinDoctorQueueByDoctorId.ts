import { UseCase } from '../../../../../shared/domain/UseCase';
import { IPatientStatusRepo } from '../../../repos/patientRepo/PatientStatusRepo';
import { Patient } from '../../../domain/patient';
import { IDoctorStatusCacheRepo } from '../../../repos/doctorRepo/DoctorStatusCacheRepo';
import { ReturnResult } from '../../../../../shared/core/logic/Result';
import { GetDoctorStatusById } from '../../doctor/getDoctorStatusById/GetDoctorStatusById';

type JoinDoctorQueueByDoctorIdRequest = { patientId: string; doctorId: string };
type JoinDoctorQueueByDoctorIdResponse = any;

export class JoinDoctorQueueByDoctorId
    implements UseCase<JoinDoctorQueueByDoctorIdRequest, JoinDoctorQueueByDoctorIdResponse> {
    private patientStatusRepo: IPatientStatusRepo;
    private getDoctorStatusById: GetDoctorStatusById;
    constructor(patientStatusRepo: IPatientStatusRepo, getDoctorStatusById: GetDoctorStatusById) {
        this.patientStatusRepo = patientStatusRepo;
        this.getDoctorStatusById = getDoctorStatusById;
    }
    async execute(request: JoinDoctorQueueByDoctorIdRequest): Promise<JoinDoctorQueueByDoctorIdResponse> {
        // check patient status joined
        // check doctor status active and pause
        const { patientId, doctorId } = request;

        const doctorStatusResult: ReturnResult = await this.getDoctorStatusById.execute({ id: doctorId });
    }
}
