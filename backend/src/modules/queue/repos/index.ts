import { DoctorStatusRepo } from './doctorRepo/DoctorStatusRepo';
import { doctorStatusModel } from '../../../shared/infra/database/mongoose/models/doctorStatusModel';
import { DoctorStatusCacheRepo } from './doctorRepo/DoctorStatusCacheRepo';
import { redisApplicationClient } from '../../../shared/services/caching/application/redisApplicationClient';
import { PatientStatusRepo } from './patientRepo/PatientStatusRepo';
import { patientStatusModel } from '../../../shared/infra/database/mongoose/models/patientStatusModel';

const doctorStatusRepo = new DoctorStatusRepo(doctorStatusModel);
const doctorStatusCacheRepo = new DoctorStatusCacheRepo(redisApplicationClient);
const patientStatusRepo = new PatientStatusRepo(patientStatusModel);

export { doctorStatusRepo, doctorStatusCacheRepo, patientStatusRepo };
