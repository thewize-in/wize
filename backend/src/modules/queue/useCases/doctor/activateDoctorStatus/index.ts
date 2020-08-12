import { ActivateDoctorStatusController } from './ActivateDoctorStatusController';
import { ActivateDoctorStatus } from './ActivateDoctorStatus';
import { doctorStatusRepo, doctorStatusCacheRepo } from '../../../repos';

const activateDoctorStatus = new ActivateDoctorStatus(doctorStatusRepo, doctorStatusCacheRepo);
const activateDoctorStatusController = new ActivateDoctorStatusController(activateDoctorStatus);

export { activateDoctorStatusController, activateDoctorStatus };
