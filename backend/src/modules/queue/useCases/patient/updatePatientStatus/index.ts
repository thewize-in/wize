import { UpdatePatientStatus } from './UpdatePatientStatus';
import { patientRepo } from '../../../repos';

const updatePatientStatus = new UpdatePatientStatus(patientRepo);

export { updatePatientStatus };
