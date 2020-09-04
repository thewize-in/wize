import { BaseController } from '../../../../../shared/infra/BaseController';
import { NextEntry } from './NextEntry';
import { NextEntryDTO } from './NextEntryDTO';

export class NextEntryController extends BaseController {
    private useCase: NextEntry;
    constructor(useCase: NextEntry) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const bookId = this.request.session['user']['id'];
        let isPreviousEntryDone = this.request.body['isPreviousEntryDone'];

        const dto: NextEntryDTO = { bookId, isPreviousEntryDone };

        const result = await this.useCase.execute(dto);

        if (!result.getValue()) return this.ok(this.response.status(200), 'no more patient');

        return this.ok(this.response.status(200), 'current number updated');
    }
}
