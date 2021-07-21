import { appointmentRepo } from '../../repos';
import { GetAppointmentsController } from './GetAppointmentsController';
import { GetAppointmentsByDoctorId } from './GetAppointmentsByDoctorId';
import { GetAppointmentsByDoctorIdAndStatus } from './GetAppointmentsByDoctorIdAndStatus';
import { GetAppointmentsByDoctorIdAndDate } from './GetAppointmentsByDoctorIdAndDate';

const getAppointmentsByDoctorId = new GetAppointmentsByDoctorId(appointmentRepo);
const getAppointmentsByDoctorIdAndStatus = new GetAppointmentsByDoctorIdAndStatus(appointmentRepo);
const getAppointmentsByDoctorIdAndDate = new GetAppointmentsByDoctorIdAndDate(appointmentRepo);

const getAppointmentsController = new GetAppointmentsController(
  getAppointmentsByDoctorId,
  getAppointmentsByDoctorIdAndStatus,
  getAppointmentsByDoctorIdAndDate
);

export { getAppointmentsController };
