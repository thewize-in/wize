import { GetDoctorStatusById } from './GetDoctorStatusById';
import { doctorStatusRepo, doctorStatusCacheRepo } from '../../../repos';
import { GetDoctorStatusByIdController } from './GetDoctorStatusByIdController';

const getDoctorStatusById = new GetDoctorStatusById(doctorStatusRepo, doctorStatusCacheRepo);
const getDoctorStatusByIdController = new GetDoctorStatusByIdController(getDoctorStatusById);

export { getDoctorStatusByIdController, getDoctorStatusById };
