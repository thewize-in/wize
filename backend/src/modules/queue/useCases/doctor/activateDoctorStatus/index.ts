import { ActivateDoctorStatusController } from './ActivateDoctorStatusController';
import { ActivateDoctorStatus } from './ActivateDoctorStatus';
import { doctorRepo, doctorStatusCacheRepo, patientEntryBookRepo } from '../../../repos';

const activateDoctorStatus = new ActivateDoctorStatus(doctorRepo, doctorStatusCacheRepo, patientEntryBookRepo);
const activateDoctorStatusController = new ActivateDoctorStatusController(activateDoctorStatus);

export { activateDoctorStatusController, activateDoctorStatus };
