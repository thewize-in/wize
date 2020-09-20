import { CreateOfflinePatientEntry } from './CreateOfflinePatientEntry';
import { entryBookRepo } from '../../../repos';
import { CreateOfflinePatientEntryController } from './CreateOfflinePatientEntryController';

const createOfflinePatientEntry = new CreateOfflinePatientEntry(entryBookRepo);

const createOfflinePatientEntryController = new CreateOfflinePatientEntryController(
  createOfflinePatientEntry
);

export { createOfflinePatientEntry, createOfflinePatientEntryController };
