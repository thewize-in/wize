import { LeaveDoctor } from './LeaveDoctor';
import { patientRepo } from '../../../repos';
import { LeaveDoctorController } from './LeaveDoctorController';

const leaveDoctor = new LeaveDoctor(patientRepo);
const leaveDoctorController = new LeaveDoctorController(leaveDoctor);

export { leaveDoctorController, leaveDoctor };
