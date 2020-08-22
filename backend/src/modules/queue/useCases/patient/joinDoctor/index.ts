import { JoinDoctor } from './JoinDoctor';
import { JoinDoctorController } from './JoinDoctorController';
import { patientRepo, doctorRepo } from '../../../repos';

const joinDoctor = new JoinDoctor(patientRepo, doctorRepo);
const joinDoctorController = new JoinDoctorController(joinDoctor);

export { joinDoctorController, joinDoctor };
