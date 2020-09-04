import { BaseController } from '../../../../../shared/infra/BaseController';
import { DeletePatientEntryBook } from './DeletePatientEntryBook';
import { DeletePatientEntryBookDTO } from './DeletePatientEntryBookDTO';

export class DeletePatientEntryBookController extends BaseController {
    private useCase: DeletePatientEntryBook;

    constructor(useCase: DeletePatientEntryBook) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const id = this.request.session['user']['id'];

        const dto: DeletePatientEntryBookDTO = { bookId: id };

        const result = await this.useCase.execute(dto);

        if (!result.getValue()) return this.fail('patient entrybook does not exist');

        return this.ok(this.response.status(200), 'succeccfuly deleted');
    }
}
