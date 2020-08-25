import { PatientEntryBook } from './patientEntryBook';
import { PatientStats } from './patientStats';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

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

const customPatientEntryBookResult = PatientEntryBook.create({ patientList: [], patientStats });
test('create custom patient entry book', () => {
    expect(customPatientEntryBookResult.isSuccess).toBeTruthy();
    expect(customPatientEntryBookResult.isFailure).toBeFalsy();
});

const defaultBookId = new UniqueEntityID('1');
const defaultPatientEntryBookResult = PatientEntryBook.createDefault(defaultBookId);
test('create default patient entry book', () => {
    expect(defaultPatientEntryBookResult.isSuccess).toBeTruthy();
    expect(defaultPatientEntryBookResult.isFailure).toBeFalsy();
});

const patientEntryBook = customPatientEntryBookResult.getValue();

test('create offline patient entry', () => {
    const patientDetails = {
        name: 'saud',
        tag: 'offline',
    };
    patientEntryBook.createOfflineEntry(patientDetails);
    expect(patientEntryBook.patientList.length).toBe(1);
    expect(patientEntryBook.patientList[0]).toMatchObject(patientDetails);
});

// test('create online patient entry', () => {
//     const patientDetails = {
//         name: 'saud',
//         tag: 'offline',
//         id: 'online1',
//     };
//     patientEntryBook.createOnlineEntry(patientDetails);
//     expect(patientEntryBook.patientList.length).toBe(2);
//     expect(patientEntryBook.patientList[0]).toMatchObject(patientDetails);
// });
