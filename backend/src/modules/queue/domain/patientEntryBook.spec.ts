import { PatientEntryBook } from './patientEntryBook';
import { PatientStats } from './patientStats';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Patient } from './patient';
import { Result } from '../../../shared/core/logic/Result';
import { PatientStatus } from './patientStatus';

let customPatientEntryBookResult: Result<PatientEntryBook>,
  defaultPatientEntryBookResult: Result<PatientEntryBook>,
  patientEntryBook: PatientEntryBook,
  patientDefaultStatusResult: Result<PatientStatus>,
  patientDefaultStatus: PatientStatus,
  onlinePatientResult: Result<Patient>,
  onlinePatient: Patient;

beforeAll(() => {
  patientDefaultStatusResult = null;
  patientDefaultStatus = null;
  onlinePatientResult = null;
  onlinePatient = null;
});

// patient stats

const patientStatsResult = PatientStats.create({
  totalPatientNumber: 0,
  currentPatientNumber: 0,
  currentPatientDetails: null,
});

test('create patient stats', () => {
  expect(patientStatsResult.isSuccess).toBeTruthy();
  expect(patientStatsResult.isFailure).toBeFalsy();
});
const patientStats = patientStatsResult.getValue();
test('increament current patient number', () => {
  for (let i = 1; i <= 1; i++) {
    patientStats.incrCurrentPatientNumber();
    expect(patientStats.props.currentPatientNumber).toBe(i);
  }
});

// patient entry book

test('create custom patient entry book', () => {
  customPatientEntryBookResult = PatientEntryBook.create({
    patientList: [],
    donePatientList: [],
    undonePatientList: [],
    patientStats,
  });

  expect(customPatientEntryBookResult.isSuccess).toBeTruthy();
  expect(customPatientEntryBookResult.isFailure).toBeFalsy();
});

test('create default patient entry book', () => {
  const defaultBookId = new UniqueEntityID('1').toString();

  defaultPatientEntryBookResult = PatientEntryBook.createDefault(defaultBookId);

  expect(defaultPatientEntryBookResult.isSuccess).toBeTruthy();
  expect(defaultPatientEntryBookResult.isFailure).toBeFalsy();

  patientEntryBook = customPatientEntryBookResult.getValue();
});

// patient default status
test('create patient default status', () => {
  patientDefaultStatusResult = PatientStatus.createDefaultStatus();

  expect(patientDefaultStatusResult.isSuccess).toBeTruthy();
  expect(patientDefaultStatusResult.isFailure).toBeFalsy();
});

test('create offline patient entry', () => {
  const offlinePatientDetails = {
    name: 'arbaz',
    tag: 'offline',
  };
  patientEntryBook.createOfflineEntry(offlinePatientDetails);
  expect(patientEntryBook.patientList.length).toBe(1);
  expect(patientEntryBook.patientList[0]).toMatchObject(offlinePatientDetails);
});
test('create patient with default status', () => {
  onlinePatientResult = Patient.create({
    status: patientDefaultStatus,
    waitingNumber: Infinity,
  });

  expect(onlinePatientResult.isSuccess).toBeTruthy();
  expect(onlinePatientResult.isFailure).toBeFalsy();
});

test('create online patient entry', () => {
  onlinePatient = onlinePatientResult.getValue();

  const patientDetails = {
    name: 'saud',
    tag: 'online',
    id: onlinePatient.patientId.id.toString(),
  };

  patientEntryBook.createOnlineEntry(patientDetails, onlinePatient);
  expect(patientEntryBook.patientList.length).toBe(2);
  expect(patientEntryBook.patientList[1]).toMatchObject(patientDetails);
  expect(onlinePatient.waitingNumber).toBe(2);
});
