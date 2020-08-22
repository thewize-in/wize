import { PauseDoctorStatus } from './PauseDoctorStatus';
import { doctorRepo, doctorStatusCacheRepo } from '../../../repos';
import { PauseDoctorStatusController } from './PauseDoctorStatusController';

const pauseDoctorStatus = new PauseDoctorStatus(doctorRepo, doctorStatusCacheRepo);
const pauseDoctorStatusController = new PauseDoctorStatusController(pauseDoctorStatus);

export { pauseDoctorStatusController, pauseDoctorStatus };
