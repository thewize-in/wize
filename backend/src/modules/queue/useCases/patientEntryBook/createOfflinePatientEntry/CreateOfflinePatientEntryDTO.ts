export type CreateOfflinePatientEntryDTO = {
    patientDetails: {
        name: string;
        tag: string;
    };
    doctorId: string;
};
