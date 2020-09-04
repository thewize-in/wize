import { BaseController } from '../../../../../shared/infra/BaseController';
import { CreatePatientEntryBookDTO } from './CreatePatientEntryBookDTO';
import { CreatePatientEntryBook } from './CreatePatientEntryBook';

export class CreatePatientEntryBookController extends BaseController {
    private useCase: CreatePatientEntryBook;
    constructor(useCase: CreatePatientEntryBook) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const id = this.request.session['user']['id'];

        const dto: CreatePatientEntryBookDTO = { bookId: id };
        const result = await this.useCase.execute(dto);

        if (!result.getValue()) return this.fail('something went wrong');
        return this.ok(this.response.status(200), 'entrybook created');
    }
}
