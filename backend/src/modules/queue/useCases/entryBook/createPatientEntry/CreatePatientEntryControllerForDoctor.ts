import { BaseController } from '../../../../../shared/infra/BaseController';
import { CreatePatientEntry } from './CreatePatientEntry';
import { CreatePatientEntryDTO } from './CreatePatientEntryDTO';

export class CreatePatientEntryControllerForDoctor extends BaseController {
    private useCase: CreatePatientEntry;
    constructor(useCase: CreatePatientEntry) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const doctorId = this.request.session['user']['id'];

        const patientDetails = {
            name: this.request.body['patientName'],
            tag: 'offline',
        };

        const dto: CreatePatientEntryDTO = {
            doctorId,
            patientDetails,
        };
        const result = this.useCase.execute(dto);

        if (!result) return this.fail('something went wrong');
        return this.ok(this.response.status(200), 'successfully added');
    }
}
