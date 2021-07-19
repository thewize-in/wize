import { prisma } from '../../../shared/infra/database/prisma/prisma';
import { DoctorRepo } from './DoctorRepo';

const doctorRepo = new DoctorRepo(prisma);

export { doctorRepo };
