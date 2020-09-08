import { CreateOfflinePatientEntry } from './CreateOfflinePatientEntry';
import { patientEntryBookRepo } from '../../../repos';
import { CreateOfflinePatientEntryController } from './CreateOfflinePatientEntryController';

const createOfflinePatientEntry = new CreateOfflinePatientEntry(
  patientEntryBookRepo
);

const createOfflinePatientEntryController = new CreateOfflinePatientEntryController(
  createOfflinePatientEntry
);

export { createOfflinePatientEntry, createOfflinePatientEntryController };
