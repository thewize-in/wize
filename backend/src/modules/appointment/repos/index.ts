import { prisma } from '../../../shared/infra/database/prisma/prisma';
import { AppointmentRepo } from './AppointmentRepo';

const appointmentRepo = new AppointmentRepo(prisma);

export { appointmentRepo };
