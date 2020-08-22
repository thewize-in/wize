import { ResumeDoctorStatus } from './ResumeDoctorStatus';
import { doctorRepo, doctorStatusCacheRepo } from '../../../repos';
import { ResumeDoctorStatusController } from './ResumeDoctorStatusController';

const resumeDoctorStatus = new ResumeDoctorStatus(doctorRepo, doctorStatusCacheRepo);
const resumeDoctorStatusController = new ResumeDoctorStatusController(resumeDoctorStatus);

export { resumeDoctorStatusController, resumeDoctorStatus };
