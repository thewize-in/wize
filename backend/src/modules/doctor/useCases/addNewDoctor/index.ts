import { AddNewDoctor } from './AddNewDoctor';
import { AddNewDoctorController } from './AddNewDoctorController';
import { doctorRepo } from '../../repos';

const addNewDoctor = new AddNewDoctor(doctorRepo);

const addNewDoctorController = new AddNewDoctorController(addNewDoctor);

export { addNewDoctorController };
