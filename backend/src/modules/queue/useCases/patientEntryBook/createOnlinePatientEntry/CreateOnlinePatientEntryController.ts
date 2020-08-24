import { BaseController } from '../../../../../shared/infra/BaseController';
import { CreateOnlinePatientEntry } from './CreateOnlinePatientEntry';
import { CreateOnlinePatientEntryDTO } from './CreateOnlinePatientEntryDTO';

export class CreateOnlineEntryController extends BaseController {
    private useCase: CreateOnlinePatientEntry;
    constructor(useCase: CreateOnlinePatientEntry) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(): Promise<any> {
        const doctorId = this.request.params['id'];

        const patientDetails = {
            name: this.request.body['patientName'],
            id: this.request.session['user']['id'],
            tag: 'online',
        };

        const dto: CreateOnlinePatientEntryDTO = {
            doctorId,
            patientDetails,
        };
        const result = await this.useCase.execute(dto);

        if (!result)
            return this.ok(
                this.response.status(200),
                '1- patient status is joined.\n2- doctor status is inactive.\n3- doctor status is pause.',
            );
        return this.ok(this.response.status(200), 'successfully connected');
    }
}
