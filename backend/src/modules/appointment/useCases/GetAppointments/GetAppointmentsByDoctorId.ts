import { Result } from '../../../../shared/core/logic/Result';
import { UseCase } from '../../../../shared/domain/UseCase';
import { Appointment } from '../../domain/appointment';
import { IAppointmentRepo } from '../../repos/AppointmentRepo';
import { GetAppointmentByDoctorIdDTO } from './GetAppointmentsDTO';

type Request = GetAppointmentByDoctorIdDTO;
type Response = Result<Appointment[]>;

export class GetAppointmentsByDoctorId implements UseCase<Request, Response> {
  private appointmentRepo: IAppointmentRepo;

  constructor(appointmentRepo: IAppointmentRepo) {
    this.appointmentRepo = appointmentRepo;
  }
  async execute(request: Request): Promise<Response> {
    return await this.appointmentRepo.getAppointmentsByDoctorId(request.doctorId);
  }
}
