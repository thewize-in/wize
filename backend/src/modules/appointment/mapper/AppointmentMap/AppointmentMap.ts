import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { Mapper } from '../../../../shared/infra/Mapper';
import { Appointment } from '../../domain/appointment';
import { AppointmentId } from '../../domain/appointmentId';
import { DateAndTime } from '../../domain/dateAnTime';

export class AppointmentMap implements Mapper<Appointment> {
  public static toPersistence(appointment: Appointment) {
    return {
      id: appointment.appointmentId.id.toString(),
      doctor_id: appointment.doctorId,
      patient_id: appointment.patientId,
      date_and_time: appointment.dateAndTime,
      status: appointment.status,
    };
  }
  public static toDomain(raw: any): Appointment {
    const appointmentId = new UniqueEntityID(raw.id);
    const dateAndTime = DateAndTime.create({ value: raw.dateAndTime }).getValue();

    const appointment = Appointment.create(
      {
        doctorId: raw.doctorId,
        patientId: raw.patientId,
        status: raw['status'],
        dateAndTime: dateAndTime,
      },
      appointmentId
    ).getValue();

    return appointment;
  }
}
