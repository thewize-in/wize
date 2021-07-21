import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { Mapper } from '../../../../shared/infra/Mapper';
import { Appointment } from '../../domain/appointment';

export class AppointmentMap implements Mapper<Appointment> {
  public static toPersistence(appointment: Appointment) {
    return {
      id: appointment.appointmentId.id.toString(),
      doctor_id: appointment.doctorId,
      patient_id: appointment.patientId,
      date: appointment.date,
      status: appointment.status,
      patient_name: appointment.patientName,
      created_at: appointment.createdAt,
    };
  }
  public static toDomain(raw: any): Appointment {
    const appointmentId = new UniqueEntityID(raw.id);

    const appointment = Appointment.create(
      {
        doctorId: raw.doctorId,
        patientId: raw.patientId,
        patientName: raw.patientName,
        status: raw.status,
        date: raw.date,
      },
      appointmentId
    ).getValue();

    return appointment;
  }
  public static toDTO(appointment: any): any {
    return {
      id: appointment.id,
      doctorId: appointment.doctor_id,
      patientId: appointment.patient_id,
      patientName: appointment.patient_name,
      status: appointment.status,
      date: appointment.date,
    };
  }
}
