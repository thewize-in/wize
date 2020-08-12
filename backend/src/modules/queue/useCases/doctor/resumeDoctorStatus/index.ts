import { ResumeDoctorStatus } from './ResumeDoctorStatus';
import { doctorStatusRepo, doctorStatusCacheRepo } from '../../../repos';
import { ResumeDoctorStatusController } from './ResumeDoctorStatusController';

const resumeDoctorStatus = new ResumeDoctorStatus(doctorStatusRepo, doctorStatusCacheRepo);
const resumeDoctorStatusController = new ResumeDoctorStatusController(resumeDoctorStatus);

export { resumeDoctorStatusController, resumeDoctorStatus };
