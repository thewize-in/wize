import { GetDoctorStatusById } from './GetDoctorStatusById';
import { doctorRepo, doctorStatusCacheRepo } from '../../../repos';
import { GetDoctorStatusByIdController } from './GetDoctorStatusByIdController';

const getDoctorStatusById = new GetDoctorStatusById(doctorRepo, doctorStatusCacheRepo);
const getDoctorStatusByIdController = new GetDoctorStatusByIdController(getDoctorStatusById);

export { getDoctorStatusByIdController, getDoctorStatusById };
