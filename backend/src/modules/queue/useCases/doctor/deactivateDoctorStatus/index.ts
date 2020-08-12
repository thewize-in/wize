import { DeactivateDoctorStatus } from './DeactivateDoctorStatus';
import { DeactivateDoctorStatusController } from './DeactivateDoctorStatusController';
import { doctorStatusRepo, doctorStatusCacheRepo } from '../../../repos';

const deactiveDoctorStatus = new DeactivateDoctorStatus(doctorStatusRepo, doctorStatusCacheRepo);
const deactivateDoctorStatusController = new DeactivateDoctorStatusController(deactiveDoctorStatus);

export { deactivateDoctorStatusController, deactiveDoctorStatus };
