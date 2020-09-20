import { DoctorRepo } from './doctorRepos/DoctorRepo';
import { doctorModel } from '../../../shared/infra/database/mongoose/models';
import { DoctorStatusCacheRepo } from './doctorRepos/DoctorStatusCacheRepo';
import { redisApplicationClient } from '../../../shared/services/caching/application/redisApplicationClient';
import {
  patientModel,
  entryBookModel,
} from '../../../shared/infra/database/mongoose/models';
import { EntryBookRepo } from './EntryBookRepos/EntryBookRepo';

const doctorRepo = new DoctorRepo(doctorModel);
const doctorStatusCacheRepo = new DoctorStatusCacheRepo(redisApplicationClient);
const entryBookRepo = new EntryBookRepo(entryBookModel);

export { doctorRepo, doctorStatusCacheRepo, entryBookRepo };
