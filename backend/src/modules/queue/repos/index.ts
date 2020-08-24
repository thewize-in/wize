import { DoctorRepo } from './doctorRepos/DoctorRepo';
import { doctorModel } from '../../../shared/infra/database/mongoose/models/';
import { DoctorStatusCacheRepo } from './doctorRepos/DoctorStatusCacheRepo';
import { redisApplicationClient } from '../../../shared/services/caching/application/redisApplicationClient';
import { patientModel, patientEntryBookModel } from '../../../shared/infra/database/mongoose/models';
import { PatientRepo } from './patientRepos/PatientRepo';
import { PatientEntryBookRepo } from './patientEntryBookRepos/PatientEntryBookRepo';

const doctorRepo = new DoctorRepo(doctorModel);
const doctorStatusCacheRepo = new DoctorStatusCacheRepo(redisApplicationClient);
const patientEntryBookRepo = new PatientEntryBookRepo(patientEntryBookModel);
const patientRepo = new PatientRepo(patientModel);

export { doctorRepo, doctorStatusCacheRepo, patientRepo, patientEntryBookRepo };
