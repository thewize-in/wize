import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { Mapper } from '../../../../shared/infra/Mapper';
import { Appointment } from '../../domain/appointment';
import { AppointmentId } from '../../domain/appointmentId';

export class AppointmentMap implements Mapper<Appointment> {
  public static toPersistence(appointment: Appointment) {
    return {
      id: appointment.appointmentId.id.toString(),
      doctor_id: appointment.doctorId,
      patient_id: appointment.patientId,
      date: appointment.date,
      status: appointment.status,
    };
  }
  public static toDomain(raw: any): Appointment {
    const appointmentId = new UniqueEntityID(raw.id);

    const appointment = Appointment.create(
      {
        doctorId: raw.doctorId,
        patientId: raw.patientId,
        status: raw.status,
        date: raw.date,
      },
      appointmentId
    ).getValue();

    return appointment;
  }
}
