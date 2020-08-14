import { CreatePatient } from './CreatePatient';
import { patientStatusRepo } from '../../../repos';

const createPatient = new CreatePatient(patientStatusRepo);

export { createPatient };
