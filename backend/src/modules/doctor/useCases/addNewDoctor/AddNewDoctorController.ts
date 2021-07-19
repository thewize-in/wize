import { BaseController } from '../../../../shared/infra/BaseController';
import { AddNewDoctorDTO } from './AddNewDoctorDTO';
import { AddNewDoctor } from './AddNewDoctor';

export class AddNewDoctorController extends BaseController {
  private useCase: AddNewDoctor;
  constructor(useCase: AddNewDoctor) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<any> {
    // const id = this.request.session['user']['id'];

    const dto: AddNewDoctorDTO = {
      name: this.request.body['name'],
      phone: this.request.body['phone'],
    };

    const result = await this.useCase.execute(dto);

    if (result.isFailure) return this.ok(this.response, 'failed to add doctor');

    return this.created(this.response);
  }
}
