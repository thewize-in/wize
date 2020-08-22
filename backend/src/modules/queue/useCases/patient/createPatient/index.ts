import { CreatePatient } from './CreatePatient';
import { patientRepo } from '../../../repos';

const createPatient = new CreatePatient(patientRepo);

export { createPatient };
