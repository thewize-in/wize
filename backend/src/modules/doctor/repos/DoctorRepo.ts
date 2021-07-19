import { PrismaClient } from '@prisma/client';
import { Result } from '../../../shared/core/logic/Result';
import { Repo } from '../../../shared/infra/Repo';
import { Doctor } from '../domain/doctor';

export interface IDoctorRepo extends Repo<Doctor> {
  save(doctor: Doctor): Promise<void>;
  exists(id: string): Promise<boolean>;
  update(doctor: Doctor): Promise<void>;
}

export class DoctorRepo implements IDoctorRepo {
  private _db: PrismaClient;
  constructor(db: PrismaClient) {
    this._db = db;
  }

  async save(doctor: Doctor): Promise<void> {
    try {
      const doctorExist = await this.exists(doctor.doctorId.toString());

      if (!doctorExist) {
        await this._db.doctor.create({
          data: {
            id: doctor.doctorId.id.toString(),
            name: doctor.name,
            verified: doctor.verified,
            phone: doctor.phone,
          },
        });
        return;
      }
      this.update(doctor);
    } catch (error) {
      throw error;
    }
  }
  async update(doctor: Doctor): Promise<void> {
    try {
      await this._db.doctor.update({
        where: {
          id: doctor.doctorId.toString(),
        },
        data: {
          name: doctor.name,
          verified: doctor.verified,
          phone: doctor.phone,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async exists(id: string): Promise<boolean> {
    try {
      const doctor = await this._db.doctor.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
        },
      });
      if (!!doctor) return true;

      return false;
    } catch (err) {
      return false;
    }
  }
}
