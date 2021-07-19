import { Result } from '../../../../shared/core/logic/Result';
import { UseCase } from '../../../../shared/domain/UseCase';
import { CreateNewAppointmentDTO } from './CreateNewAppointmentDTO';

type Request = CreateNewAppointmentDTO;
type Response = Result<boolean>;

export class CreateNewAppointment implements UseCase<Request, Response> {
  private ClassName: IRepo;

  constructor(ClassName: IRepo) {
    this.ClassName = ClassName;
  }
  async execute(request: Request): Promise<Response> {
    try {
      example;
    } catch {}
  }
}
