import { BaseController } from '../../../../../shared/infra/BaseController';
import { UpdateCurrentPatientNumber } from './UpdateCurrentPatientNumber';
import { UpdateCurrentPatientNumberDTO } from './UpdateCurrentPatientNumberDTO';

export class UpdateCurrentPatientNumberController extends BaseController {
    private useCase: UpdateCurrentPatientNumber;
    constructor(useCase: UpdateCurrentPatientNumber) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const bookId = this.request.session['user']['id'];
        const dto: UpdateCurrentPatientNumberDTO = { bookId };

        const result = await this.useCase.execute(dto);

        if (!result) return this.ok(this.response.status(200), 'no more patient');
        return this.ok(this.response.status(200), 'current number updated');
    }
}
