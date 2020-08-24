import { ActivateDoctorStatusController } from './ActivateDoctorStatusController';
import { ActivateDoctorStatus } from './ActivateDoctorStatus';
import { doctorRepo, doctorStatusCacheRepo } from '../../../repos';

const activateDoctorStatus = new ActivateDoctorStatus(doctorRepo, doctorStatusCacheRepo);
const activateDoctorStatusController = new ActivateDoctorStatusController(activateDoctorStatus);

export { activateDoctorStatusController, activateDoctorStatus };
