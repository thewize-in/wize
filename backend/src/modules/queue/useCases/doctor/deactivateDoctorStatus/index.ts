import { DeactivateDoctorStatus } from './DeactivateDoctorStatus';
import { DeactivateDoctorStatusController } from './DeactivateDoctorStatusController';
import { doctorRepo, doctorStatusCacheRepo } from '../../../repos';

const deactiveDoctorStatus = new DeactivateDoctorStatus(doctorRepo, doctorStatusCacheRepo);
const deactivateDoctorStatusController = new DeactivateDoctorStatusController(deactiveDoctorStatus);

export { deactivateDoctorStatusController, deactiveDoctorStatus };
