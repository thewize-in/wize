import { Patient } from '../../../domain/patient';

export type CreatePatientEntryDTO = {
    patientDetails: {
        name: string;
        id?: string;
        tag: string;
    };
    doctorId: string;
    patient?: Patient;
};
