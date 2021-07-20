import { appointmentRepo } from '../../repos';
import { CreateNewAppointment } from './CreateNewAppointment';
import { CreateNewAppointmentController } from './CreateNewAppointmentController';

const createNewAppointment = new CreateNewAppointment(appointmentRepo);
const createNewAppointmentController = new CreateNewAppointmentController(createNewAppointment);

export { createNewAppointmentController };
