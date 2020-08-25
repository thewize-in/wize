import { DoctorStatus } from './doctorStatus';
import { Doctor } from './doctor';

// doctor status
const doctorCustomActiveStatusResult = DoctorStatus.create({ active: true, resume: true });
const doctorCustomInactiveStatusResult = DoctorStatus.create({ active: true, resume: true });
const doctorCustomPausedStatusResult = DoctorStatus.create({ active: true, resume: false });
const doctorCustomResumedStatusResult = DoctorStatus.create({ active: true, resume: true });
const doctorActiveStatusResult = DoctorStatus.createActiveStatus();
const doctorInactiveStatusResult = DoctorStatus.createInactiveStatus();
const doctorPausedStatusResult = DoctorStatus.createPauseStatus();
const doctorResumedStatusResult = DoctorStatus.createResumeStatus();

test('create Doctor custom active status', () => {
    expect(doctorCustomActiveStatusResult.isSuccess).toBeTruthy();
});

test('create Doctor custom in-active status', () => {
    expect(doctorCustomInactiveStatusResult.isSuccess).toBeTruthy();
});

test('create Doctor custom paused status', () => {
    expect(doctorCustomPausedStatusResult.isSuccess).toBeTruthy();
});

test('create Doctor custom resumed status', () => {
    expect(doctorCustomResumedStatusResult.isSuccess).toBeTruthy();
});

test('create Doctor active status', () => {
    expect(doctorActiveStatusResult.isSuccess).toBeTruthy();
});

test('create Doctor in-active status', () => {
    expect(doctorInactiveStatusResult.isSuccess).toBeTruthy();
});
test('create Doctor paused status', () => {
    expect(doctorPausedStatusResult.isSuccess).toBeTruthy();
});

test('create Doctor resumed status', () => {
    expect(doctorResumedStatusResult.isSuccess).toBeTruthy();
});

// doctor class with status
const doctorWithCustomeActiveStatusResult = Doctor.create({ status: doctorCustomActiveStatusResult.getValue() });
const doctorWithCustomInactiveStatusResult = Doctor.create({ status: doctorCustomInactiveStatusResult.getValue() });
const doctorWithCustomPausedStatusResult = Doctor.create({ status: doctorCustomPausedStatusResult.getValue() });
const doctorWithCustomeResumedStatusResult = Doctor.create({ status: doctorCustomResumedStatusResult.getValue() });

const doctorWithActiveStatusResult = Doctor.create({ status: doctorActiveStatusResult.getValue() });
const doctorWithInactiveStatusResult = Doctor.create({ status: doctorInactiveStatusResult.getValue() });
const doctorWithPausedStatusResult = Doctor.create({ status: doctorPausedStatusResult.getValue() });
const doctorWithResumedStatusResult = Doctor.create({ status: doctorResumedStatusResult.getValue() });

test('create Doctor with custom active status', () => {
    expect(doctorWithCustomeActiveStatusResult.isSuccess).toBeTruthy();
});
test('create Doctor with custom in-active status', () => {
    expect(doctorWithCustomInactiveStatusResult.isSuccess).toBeTruthy();
});
test('create Doctor with custom paused status', () => {
    expect(doctorWithCustomPausedStatusResult.isSuccess).toBeTruthy();
});
test('create Doctor with custom resumed status', () => {
    expect(doctorWithCustomeResumedStatusResult.isSuccess).toBeTruthy();
});

test('create Doctor with active status', () => {
    expect(doctorWithActiveStatusResult.isSuccess).toBeTruthy();
});
test('create Doctor with in-active status', () => {
    expect(doctorWithInactiveStatusResult.isSuccess).toBeTruthy();
});
test('create Doctor with paused status', () => {
    expect(doctorWithPausedStatusResult.isSuccess).toBeTruthy();
});
test('create Doctor with resumed status', () => {
    expect(doctorWithResumedStatusResult.isSuccess).toBeTruthy();
});

// update doctor status
const doctor = doctorWithCustomeActiveStatusResult.getValue();

test('doctor status should be active', () => {
    doctor.activateStatus();
    expect(doctor.status.isActive()).toBeTruthy();
    expect(doctor.status.isResume()).toBeTruthy();
});

test('doctor status should be in-active', () => {
    doctor.deactivateStatus();
    expect(doctor.status.isActive()).toBeFalsy();
    expect(doctor.status.isResume()).toBeFalsy();
});

test('doctor status should be pause', () => {
    doctor.pauseStatus();
    expect(doctor.status.isActive()).toBeTruthy();
    expect(doctor.status.isResume()).toBeFalsy();
});

test('doctor status should be resume', () => {
    doctor.resumeStatus();
    expect(doctor.status.isActive()).toBeTruthy();
    expect(doctor.status.isResume()).toBeTruthy();
});

// domain event (testing only doctor)
test('how many domain event added', () => {
    expect(doctor.domainEvents.length).toBe(1);
});
