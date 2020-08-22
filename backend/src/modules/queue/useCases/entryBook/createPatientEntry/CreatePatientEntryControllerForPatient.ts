import { BaseController } from '../../../../../shared/infra/BaseController';
import { CreatePatientEntry } from './CreatePatientEntry';
import { CreatePatientEntryDTO } from './CreatePatientEntryDTO';

export class CreatePatientEntryControllerForPatient extends BaseController {
    private useCase: CreatePatientEntry;
    constructor(useCase: CreatePatientEntry) {
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

        const dto: CreatePatientEntryDTO = {
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
/**
 * if route is used by doctor
 *  doctorId --> in request cookie
 *  patient name --> in request body
 *  tag as offline --> if there is no patient id then offline
 *
 * if route is used by patient
 *  doctorId --> in
 *  patient name
 *  tag as online
 */
