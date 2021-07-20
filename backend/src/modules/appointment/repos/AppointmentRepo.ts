import { PrismaClient } from '@prisma/client';
import { Result } from '../../../shared/core/logic/Result';
import { Repo } from '../../../shared/infra/Repo';
import { Appointment } from '../domain/appointment';
import { AppointmentMap } from '../mapper/AppointmentMap/AppointmentMap';

export interface IAppointmentRepo extends Repo<Appointment> {
  getAppointmentsByDoctorId(doctorId: string): Promise<Result<Appointment[]>>;
  save(appointment: Appointment): Promise<Result<void>>;
}

export class AppointmentRepo implements IAppointmentRepo {
  private _db: PrismaClient;
  constructor(db: PrismaClient) {
    this._db = db;
  }
  public async save(appointment: Appointment): Promise<Result<void>> {
    try {
      await this._db.appointment.create({
        data: {
          id: appointment.appointmentId.id.toString(),
          patient_id: appointment.patientId,
          doctor_id: appointment.doctorId,
          status: appointment.status.value,
          date: appointment.date,
        },
      });
      return Result.ok<void>();
    } catch {
      return Result.fail<void>('');
    }
  }
  public async getAppointmentsByDoctorId(doctorId: string): Promise<Result<Appointment[]>> {
    try {
      const appointments = await this._db.appointment.findMany({
        select: {
          id: true,
          doctor_id: true,
          patient_id: true,
          status: true,
          date: true,
        },
        where: {
          doctor_id: doctorId,
        },
      });

      return Result.ok<Appointment[]>(appointments.map((appointment) => AppointmentMap.toDomain(appointment)));
    } catch {
      return Result.fail<Appointment[]>([]);
    }
  }
  public async getAppointmentsByDoctorIdAndPatientId(
    doctorId: string,
    patientId: string
  ): Promise<Result<Appointment[]>> {
    try {
      const appointments = await this._db.appointment.findMany({
        select: {
          id: true,
          doctor_id: true,
          patient_id: true,
          status: true,
          date: true,
        },
        where: {
          doctor_id: doctorId,
          patient_id: patientId,
        },
      });

      return Result.ok<Appointment[]>(appointments.map((appointment) => AppointmentMap.toDomain(appointment)));
    } catch {
      return Result.fail<Appointment[]>([]);
    }
  }
  public async getAppointmentsByDate(date: Date): Promise<Result<Appointment[]>> {
    try {
      const appointments = await this._db.appointment.findMany({
        select: {
          id: true,
          doctor_id: true,
          patient_id: true,
          status: true,
          date: true,
        },
        where: {
          date: {
            equals: date,
          },
        },
      });

      return Result.ok<Appointment[]>(appointments.map((appointment) => AppointmentMap.toDomain(appointment)));
    } catch {
      return Result.fail<Appointment[]>([]);
    }
  }
  public async exists(appointmentId: string): Promise<boolean> {
    try {
      const exist = await this._db.appointment.findUnique({
        select: { id: true },
        where: {
          id: appointmentId,
        },
      });
      return !!exist ? true : false;
    } catch {
      return false;
    }
  }
}
