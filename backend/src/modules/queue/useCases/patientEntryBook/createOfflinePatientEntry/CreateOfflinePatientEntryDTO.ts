export type CreateOfflinePatientEntryDTO = {
    patientDetails: {
        name: string;
        address?: string;
        phone?: number;
        type?: string;
    };
    bookId: string;
};
