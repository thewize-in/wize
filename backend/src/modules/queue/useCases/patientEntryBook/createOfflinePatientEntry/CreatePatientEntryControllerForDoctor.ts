import { BaseController } from '../../../../../shared/infra/BaseController';
import { CreateOfflinePatientEntry } from './CreateOfflinePatientEntry';
import { CreateOfflinePatientEntryDTO } from './CreateOfflinePatientEntryDTO';

export class CreateOfflinePatientEntryController extends BaseController {
    private useCase: CreateOfflinePatientEntry;
    constructor(useCase: CreateOfflinePatientEntry) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const doctorId = this.request.session['user']['id'];

        const patientDetails = {
            name: this.request.body['patientName'],
            tag: 'offline',
        };

        const dto: CreateOfflinePatientEntryDTO = {
            patientDetails,
            doctorId,
        };
        const result = this.useCase.execute(dto);

        if (!result) return this.fail('something went wrong');
        return this.ok(this.response.status(200), 'successfully added');
    }
}
