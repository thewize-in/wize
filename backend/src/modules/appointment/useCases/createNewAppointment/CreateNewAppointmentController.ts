import { Result } from '../../../../shared/core/logic/Result';
import { BaseController } from '../../../../shared/infra/BaseController';
import { CreateNewAppointment } from './CreateNewAppointment';
import { CreateNewAppointmentDTO } from './CreateNewAppointmentDTO';

export class CreateNewAppointmentController extends BaseController {
  private useCase: CreateNewAppointment;
  constructor(useCase: CreateNewAppointment) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<any> {
    const dto: CreateNewAppointmentDTO = this.request.body;

    const response: Result<any> = await this.useCase.execute(dto);

    if (response.isFailure) {
      return this.fail('failed to create new appointment');
    }

    return this.created(this.response);
  }
}
