import { IDoctorRepo } from '../../repos/DoctorRepo';
import { AddNewDoctorDTO } from './AddNewDoctorDTO';
import { Doctor } from '../../domain/doctor';
import { Result } from '../../../../shared/core/logic/Result';
import { UseCase } from '../../../../shared/domain/UseCase';

type Request = AddNewDoctorDTO;
type Response = Result<boolean>;

export class AddNewDoctor implements UseCase<Request, Response> {
  private doctorRepo: IDoctorRepo;

  constructor(doctorRepo: IDoctorRepo) {
    this.doctorRepo = doctorRepo;
  }
  async execute(request: Request): Promise<Response> {
    const { name, phone } = request;

    const doctor = Doctor.create({ name, phone }).getValue();

    try {
      await this.doctorRepo.save(doctor);
      return Result.ok<boolean>(true);
    } catch {
      return Result.fail<boolean>('faild to add doctor');
    }
  }
}
