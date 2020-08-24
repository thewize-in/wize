import { JoinDoctor } from './JoinDoctor';
import { patientRepo } from '../../../repos';

const joinDoctor = new JoinDoctor(patientRepo);

export { joinDoctor };
