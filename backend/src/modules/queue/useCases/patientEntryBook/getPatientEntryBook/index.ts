import { GetAllPatients } from './GetAllPatients';
import { patientEntryBookRepo } from '../../../repos';
import { GetPatientEntryBookController } from './GetPatientEntryBookController';
import { GetDonePatients } from './GetDonePatients';
import { GetUndonePatients } from './GetUndonePatients';

const getAllPatients = new GetAllPatients(patientEntryBookRepo);
const getDonePatients = new GetDonePatients(patientEntryBookRepo);
const getUndonePatients = new GetUndonePatients(patientEntryBookRepo);
const getPatientEntryBookController = new GetPatientEntryBookController(
    getAllPatients,
    getDonePatients,
    getUndonePatients,
);

export { getAllPatients, getDonePatients, getUndonePatients, getPatientEntryBookController };
