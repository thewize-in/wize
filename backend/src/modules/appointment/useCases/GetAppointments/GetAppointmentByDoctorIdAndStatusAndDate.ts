import { Result } from '../../../../shared/core/logic/Result';
import { UseCase } from '../../../../shared/domain/UseCase';
import { Appointment } from '../../domain/appointment';
import { IAppointmentRepo } from '../../repos/AppointmentRepo';
import { GetAppointmentByDoctorIdAndStatusAndDateDTO } from './GetAppointmentsDTO';

type Request = GetAppointmentByDoctorIdAndStatusAndDateDTO;
type Response = Result<Appointment[]>;

export class GetAppointmentsByDoctorIdAndStatusAndDate implements UseCase<Request, Response> {
  private appointmentRepo: IAppointmentRepo;

  constructor(appointmentRepo: IAppointmentRepo) {
    this.appointmentRepo = appointmentRepo;
  }
  async execute(request: Request): Promise<Response> {
    return await this.appointmentRepo.getAppointmentsByDoctorIdAndStatusAndDate(
      request.doctorId,
      request.status,
      request.date
    );
  }
}
