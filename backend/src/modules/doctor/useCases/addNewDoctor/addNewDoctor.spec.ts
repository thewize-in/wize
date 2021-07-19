import { Doctor } from '../../domain/doctor';

describe('Add New Doctor', () => {
  it('Create New Doctor Instance and result must be true', () => {
    const doctor = Doctor.create({
      name: 'doctorTest',
      phone: '1234567802',
      verified: true,
    });
    expect(doctor.isSuccess).toBeTruthy();
  });
});
