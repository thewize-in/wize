export type CreateOnlinePatientEntryDTO = {
    patientDetails: {
        name: string;
        id: string;
        tag: string;
    };
    doctorId: string;
};
