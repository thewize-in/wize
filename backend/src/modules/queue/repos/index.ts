import { DoctorStatusRepo } from './DoctorStatusRepo';
import { doctorStatusModel } from '../../../shared/infra/database/mongoose/models/doctorStatusModel';
import { DoctorStatusCacheRepo } from './DoctorStatusCacheRepo';
import { redisApplicationClient } from '../../../shared/services/caching/application/redisApplicationClient';

const doctorStatusRepo = new DoctorStatusRepo(doctorStatusModel);
const doctorStatusCacheRepo = new DoctorStatusCacheRepo(redisApplicationClient);

export { doctorStatusRepo, doctorStatusCacheRepo };
