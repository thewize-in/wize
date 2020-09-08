import { IsPatientEntryBookExist } from './IsPatientEntryBookExist';
import { patientEntryBookRepo } from '../../../repos';
import { IsPatientEntryBookExistController } from './IsPatientEntryBookExistController';

const isPatientEntryBookExist = new IsPatientEntryBookExist(
  patientEntryBookRepo
);
const isPatientEntryBookExistController = new IsPatientEntryBookExistController(
  isPatientEntryBookExist
);

export { isPatientEntryBookExist, isPatientEntryBookExistController };
