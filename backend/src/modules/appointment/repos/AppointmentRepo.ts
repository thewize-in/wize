import { PrismaClient } from '@prisma/client';
import { Result } from '../../../shared/core/logic/Result';
import { Repo } from '../../../shared/infra/Repo';
import { Appointment } from '../domain/appointment';
import { AppointmentMap } from '../mapper/AppointmentMap/AppointmentMap';

export interface IAppointmentRepo extends Repo<Appointment> {
  getAppointmentsByDoctorId(doctorId: string): Promise<Result<Appointment[]>>;
  getAppointmentsByDoctorIdAndStatus(doctorId: string, status: string): Promise<Result<Appointment[]>>;
  getAppointmentsByDoctorIdAndDate(doctorId: string, date: string): Promise<Result<Appointment[]>>;
  getAppointmentsByDoctorIdAndStatusAndDate(
    doctorId: string,
    status: string,
    date: string
  ): Promise<Result<Appointment[]>>;
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
          doctor_id: appointment.doctorId,
          patient_name: appointment.patientName,
          patient_id: appointment.patientId,
          status: appointment.status.value,
          date: appointment.date,
          created_at: appointment.createdAt,
        },
      });
      return Result.ok<void>();
    } catch (error) {
      throw error;
    }
  }
  public async getAppointmentsByDoctorId(doctorId: string): Promise<Result<Appointment[]>> {
    try {
      const appointments = await this._db.appointment.findMany({
        select: {
          id: true,
          doctor_id: true,
          patient_id: true,
          patient_name: true,
          status: true,
          date: true,
        },
        where: {
          doctor_id: doctorId,
        },
      });

      return Result.ok<Appointment[]>(appointments.map((appointment) => AppointmentMap.toDTO(appointment)));
    } catch {
      return Result.fail<Appointment[]>([]);
    }
  }
  public async getAppointmentsByDoctorIdAndStatus(doctorId: string, status: string): Promise<Result<Appointment[]>> {
    try {
      const appointments = await this._db.appointment.findMany({
        select: {
          id: true,
          doctor_id: true,
          patient_id: true,
          patient_name: true,
          status: true,
          date: true,
        },
        where: {
          doctor_id: doctorId,
          status: status,
        },
      });

      return Result.ok<Appointment[]>(appointments.map((appointment) => AppointmentMap.toDTO(appointment)));
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
  public async getAppointmentsByDoctorIdAndDate(doctorId: string, date: string): Promise<Result<Appointment[]>> {
    try {
      const appointments = await this._db.appointment.findMany({
        select: {
          id: true,
          doctor_id: true,
          patient_id: true,
          patient_name: true,
          status: true,
          date: true,
        },
        where: {
          doctor_id: doctorId,
          date: {
            equals: new Date(date),
          },
        },
      });

      return Result.ok<Appointment[]>(appointments.map((appointment) => AppointmentMap.toDTO(appointment)));
    } catch {
      return Result.fail<Appointment[]>([]);
    }
  }
  public async getAppointmentsByDoctorIdAndStatusAndDate(
    doctorId: string,
    status: string,
    date: string
  ): Promise<Result<Appointment[]>> {
    try {
      const appointments = await this._db.appointment.findMany({
        select: {
          id: true,
          doctor_id: true,
          patient_id: true,
          patient_name: true,
          status: true,
          date: true,
        },
        where: {
          doctor_id: doctorId,
          status,
          date: {
            equals: new Date(date),
          },
        },
      });

      return Result.ok<Appointment[]>(appointments.map((appointment) => AppointmentMap.toDTO(appointment)));
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
