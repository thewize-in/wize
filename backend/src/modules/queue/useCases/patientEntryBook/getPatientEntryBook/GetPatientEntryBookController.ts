import { BaseController } from '../../../../../shared/infra/BaseController';
import { GetAllPatients } from './GetAllPatients';
import { GetPatientEntryBookDTO } from './GetPatientEntryBookDTO';
import { Result } from '../../../../../shared/core/logic/Result';
import { GetDonePatients } from './GetDonePatients';
import { GetUndonePatients } from './GetUndonePatients';

export class GetPatientEntryBookController extends BaseController {
    private getAllPatients: GetAllPatients;
    private getDonePatients: GetDonePatients;
    private getUndonePatients: GetUndonePatients;
    constructor(
        getAllPatients: GetAllPatients,
        getDonePatients: GetDonePatients,
        getUndonePatients: GetUndonePatients,
    ) {
        super();
        this.getAllPatients = getAllPatients;
        this.getDonePatients = getDonePatients;
        this.getUndonePatients = getUndonePatients;
    }
    async executeImpl(): Promise<any> {
        const id = this.request.session['user']['id'];
        const list = this.request.query['list'];

        const dto: GetPatientEntryBookDTO = { bookId: id };
        let result: Result<any>;

        switch (list) {
            case 'all_patients':
                result = await this.getAllPatients.execute(dto);
                break;
            case 'done_patients':
                result = await this.getDonePatients.execute(dto);
                break;
            case 'undone_patients':
                result = await this.getUndonePatients.execute(dto);
                break;
            default:
                result = Result.fail<any>('not found');
                break;
        }

        if (result.isFailure) return this.fail('list not found');

        return this.ok(this.response.status(200), result.getValue());
    }
}
