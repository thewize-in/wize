import { EntryBook } from './entryBook';
import { PatientStats } from './patientStats';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/logic/Result';

let customEntryBookResult: Result<EntryBook>,
  defaultEntryBookResult: Result<EntryBook>,
  entryBook: EntryBook;

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

// entrybook
test('create custom entrybook', () => {
  const patientStats = patientStatsResult.getValue();

  customEntryBookResult = EntryBook.create({
    patientList: [],
    donePatientList: [],
    undonePatientList: [],
    patientStats,
  });

  expect(customEntryBookResult.isSuccess).toBeTruthy();
  expect(customEntryBookResult.isFailure).toBeFalsy();
});

test('create default  entrybook', () => {
  const defaultBookId = new UniqueEntityID('1').toString();

  defaultEntryBookResult = EntryBook.createDefault(defaultBookId);

  expect(defaultEntryBookResult.isSuccess).toBeTruthy();
  expect(defaultEntryBookResult.isFailure).toBeFalsy();

  entryBook = customEntryBookResult.getValue();
});

test('create offline patient entry', () => {
  const offlineEntries = [
    {
      name: 'saud chougle',
      phone: 8983135422,
      address: 'chiplun',
      type: 'offline',
    },
    {
      name: 'arbaz nivsekar',
      phone: '',
      address: '',
      type: 'offline',
    },
    {
      name: 'nahid tambe',
      phone: 1234567890,
      address: '',
      type: 'offline',
    },
    {
      name: 'shaharukh chougle',
      phone: '',
      address: 'maap',
      type: 'offline',
    },
  ];
  offlineEntries.forEach((entry) => {
    entryBook.createOfflineEntry(entry);
  });
  expect(entryBook.patientList.length).toBe(offlineEntries.length);
  expect(entryBook.donePatientList.length).toBe(0);
  expect(entryBook.undonePatientList.length).toBe(0);
  expect(entryBook.totalPatientNumber).toBe(offlineEntries.length);
  expect(entryBook.currentPatientNumber).toBe(1);
});

test('entry number 1 is done so add to done list', () => {
  entryBook.addToDone();
  expect(entryBook.donePatientList.length).toBe(1);
  expect(entryBook.undonePatientList.length).toBe(0);
});

test('call next entry i.e 2', () => {
  entryBook.callNextEntry();
  expect(entryBook.currentPatientNumber).toBe(2);
  expect(entryBook.donePatientList.length).toBe(1);
  expect(entryBook.undonePatientList.length).toBe(0);
});

test('entry number 2 is not done so add to undone list', () => {
  entryBook.addToUndone();
  expect(entryBook.donePatientList.length).toBe(1);
  expect(entryBook.undonePatientList.length).toBe(1);
});

test('call next entry i.e 3', () => {
  entryBook.callNextEntry();
  expect(entryBook.currentPatientNumber).toBe(3);
  expect(entryBook.donePatientList.length).toBe(1);
  expect(entryBook.undonePatientList.length).toBe(1);
});

test('entry number 3 is done so add to done list', () => {
  entryBook.addToDone();
  expect(entryBook.donePatientList.length).toBe(2);
  expect(entryBook.undonePatientList.length).toBe(1);
});

test('call next entry i.e 4', () => {
  entryBook.callNextEntry();
  expect(entryBook.currentPatientNumber).toBe(4);
  expect(entryBook.donePatientList.length).toBe(2);
  expect(entryBook.undonePatientList.length).toBe(1);
});

test('entry number 4 is not done so add to undone list', () => {
  entryBook.addToUndone();
  expect(entryBook.donePatientList.length).toBe(2);
  expect(entryBook.undonePatientList.length).toBe(2);
});

test('call next entry i.e 5 but there are no more entries remaining there for it will not call next entry', () => {
  entryBook.callNextEntry();
  expect(entryBook.currentPatientNumber).toBe(4);
  expect(entryBook.donePatientList.length).toBe(2);
  expect(entryBook.undonePatientList.length).toBe(2);
});

test('create new offline entry in middle of done and undone entiries to test current number is updated', () => {
  entryBook.createOfflineEntry({
    name: 'sami chougle',
    phone: '7387307106',
    address: 'chiplun',
    type: 'offline',
  });
  expect(entryBook.totalPatientNumber).toBe(5);
  expect(entryBook.currentPatientNumber).toBe(5);
  expect(entryBook.donePatientList.length).toBe(2);
  expect(entryBook.undonePatientList.length).toBe(2);
});

test('create new offline entry in middle of done and undone entiries. but this time to test current number is not updated since we did not call next entry', () => {
  entryBook.createOfflineEntry({
    name: 'sami chougle',
    phone: '7387307106',
    address: 'chiplun',
    type: 'offline',
  });
  expect(entryBook.totalPatientNumber).toBe(6);
  expect(entryBook.currentPatientNumber).toBe(5);
  expect(entryBook.donePatientList.length).toBe(2);
  expect(entryBook.undonePatientList.length).toBe(2);
});
test('entry number 5 is not done so add to undone list', () => {
  entryBook.addToUndone();
  expect(entryBook.donePatientList.length).toBe(2);
  expect(entryBook.undonePatientList.length).toBe(3);
});
test('call next entry i.e 6', () => {
  entryBook.callNextEntry();
  expect(entryBook.currentPatientNumber).toBe(6);
  expect(entryBook.donePatientList.length).toBe(2);
  expect(entryBook.undonePatientList.length).toBe(3);
});

test('entry number 6 is done so add to done list', () => {
  entryBook.addToDone();
  expect(entryBook.donePatientList.length).toBe(3);
  expect(entryBook.undonePatientList.length).toBe(3);
});

test('FINAL TEST: call nextentry i.e 7 but there are no more entries remaining there for it will not call next entry', () => {
  expect(entryBook.totalPatientNumber).toBe(6);
  expect(entryBook.currentPatientNumber).toBe(6);
  expect(entryBook.donePatientList.length).toBe(3);
  expect(entryBook.undonePatientList.length).toBe(3);
});
