import { model } from 'mongoose';
import '../hooks';

import { userSchema } from './schemas/userSchmea';
import { doctorSchema } from './schemas/doctorSchema';
import { patientSchema } from './schemas/patientSchema';
import { entryBooktSchema } from './schemas/entryBookSchema';
import { listSchema } from './schemas/listSchema';

const userModel = model('user', userSchema);
const doctorModel = model('doctor', doctorSchema);
const patientModel = model('patient', patientSchema);
const entryBookModel = model('entryBook', entryBooktSchema);
const listModel = model('list', listSchema);

export { userModel, doctorModel, patientModel, entryBookModel, listModel };
