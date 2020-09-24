import { PatientStatus } from './patientStatus';
import { Patient } from './patient';

// patient status
const paitentCustomStatusResult = PatientStatus.create({ joined: false });
const paitentDefaultStatusResult = PatientStatus.createDefaultStatus();
const paitentJoinedStatusResult = PatientStatus.createJoinedStatus();
const paitentLeavedStatusResult = PatientStatus.createLeavedStatus();

test('create patient custom status', () => {
  expect(paitentCustomStatusResult.isSuccess).toBeTruthy();
});

test('create patient default status', () => {
  expect(paitentDefaultStatusResult.isSuccess).toBeTruthy();
});

test('create patient joined status', () => {
  expect(paitentJoinedStatusResult.isSuccess).toBeTruthy();
});
test('create patient leaved status', () => {
  expect(paitentLeavedStatusResult.isSuccess).toBeTruthy();
});

// patient with status

const patientWithCustomStatusResult = Patient.create({
  status: paitentCustomStatusResult.getValue(),
});
const patientWithDefaultStatusResult = Patient.create({
  status: paitentDefaultStatusResult.getValue(),
});
const patientWithJoinedStatusResult = Patient.create({
  status: paitentJoinedStatusResult.getValue(),
});
const patientWithLeavedStatusResult = Patient.create({
  status: paitentLeavedStatusResult.getValue(),
});

test('create patient with custom status', () => {
  expect(patientWithCustomStatusResult.isSuccess).toBeTruthy();
});
test('create patient with default status', () => {
  expect(patientWithDefaultStatusResult.isSuccess).toBeTruthy();
});
test('create patient with joined status', () => {
  expect(patientWithJoinedStatusResult.isSuccess).toBeTruthy();
});
test('create patient with leaved status', () => {
  expect(patientWithLeavedStatusResult.isSuccess).toBeTruthy();
});

// update patient status
const patient = patientWithCustomStatusResult.getValue();

test('update patient status as joined after he/she joined doctor', () => {
  patient.updateStatus(paitentJoinedStatusResult.getValue());
  expect(patient.hasJoined()).toBeTruthy();
});

test('set patient waiting-number after he/she joined doctor', () => {
  patient.setWatingNumber(1);
  expect(patient.waitingNumber).toBe(1);
});

test('update patient status as leaved after he/she leaved doctor', () => {
  patient.updateStatus(paitentLeavedStatusResult.getValue());
  expect(patient.hasJoined()).toBeFalsy();
});

test('set patient waiting-number to Infinity after he/she leaved doctor', () => {
  patient.setWatingNumber(Infinity);
  expect(patient.waitingNumber).toBe(Infinity);
});
