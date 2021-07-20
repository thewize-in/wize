import { Result } from '../../../../shared/core/logic/Result';
import { UseCase } from '../../../../shared/domain/UseCase';
import { Appointment } from '../../domain/appointment';
import { Status } from '../../domain/status';
import { IAppointmentRepo } from '../../repos/AppointmentRepo';
import { CreateNewAppointmentDTO } from './CreateNewAppointmentDTO';

type Request = CreateNewAppointmentDTO;
type Response = Result<boolean>;

export class CreateNewAppointment implements UseCase<Request, Response> {
  private appointmentRepo: IAppointmentRepo;
  constructor(appointmentRepo: IAppointmentRepo) {
    this.appointmentRepo = appointmentRepo;
  }
  async execute(request: Request): Promise<Response> {
    try {
      const createdStatus = Status.created().getValue();

      const appointment = Appointment.create({
        doctorId: request.doctorId,
        patientId: request.patientId,
        status: createdStatus,
        date: new Date(request.date),
      }).getValue();

      await this.appointmentRepo.save(appointment);

      return Result.ok<boolean>(true);
    } catch {
      return Result.fail<boolean>('failed to create appointment');
    }
  }
}
