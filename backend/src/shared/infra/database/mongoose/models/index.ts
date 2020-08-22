import { model } from 'mongoose';
import '../hooks';

import { userSchema } from './schemas/userSchmea';
import { doctorSchema } from './schemas/doctorSchema';
import { patientSchema } from './schemas/patientSchema';
import { patienEntryBooktSchema } from './schemas/patientEntryBookSchema';

const userModel = model('user', userSchema);
const doctorModel = model('doctor', doctorSchema);
const patientModel = model('patient', patientSchema);
const patientEntryBookModel = model('patientEntryBook', patienEntryBooktSchema);

export { userModel, doctorModel, patientModel, patientEntryBookModel };
