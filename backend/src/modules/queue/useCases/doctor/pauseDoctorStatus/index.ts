import { PauseDoctorStatus } from './PauseDoctorStatus';
import { doctorStatusRepo, doctorStatusCacheRepo } from '../../../repos';
import { PauseDoctorStatusController } from './PauseDoctorStatusController';

const pauseDoctorStatus = new PauseDoctorStatus(doctorStatusRepo, doctorStatusCacheRepo);
const pauseDoctorStatusController = new PauseDoctorStatusController(pauseDoctorStatus);

export { pauseDoctorStatusController, pauseDoctorStatus };
