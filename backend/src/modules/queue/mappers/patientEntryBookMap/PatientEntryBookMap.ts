import { Mapper } from '../../../../shared/infra/Mapper';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { PatientEntryBook } from '../../domain/patientEntryBook';
import { PatientStats } from '../../domain/patientStats';

export class PatientEntryBookMap implements Mapper<PatientEntryBook> {
    public static toPersistence(patientEntryBook: PatientEntryBook) {
        return {
            book_id: patientEntryBook.bookId.id.toString(),
            patient_list: patientEntryBook.patientList,
            patient_stats: {
                total_patient_number: patientEntryBook.patientStats.totalPatientNumber,
                current_patient_number: patientEntryBook.patientStats.currentPatientNumber,
                current_patient_details: patientEntryBook.currentPatientDetails,
            },
        };
    }
    public static toDomain(raw: any) {
        const id = new UniqueEntityID(raw.book_id);
        const patientEntryBookOrError = PatientEntryBook.create(
            {
                patientList: raw.patient_list,
                patientStats: PatientStats.create({
                    totalPatientNumber: raw.patient_stats.total_patient_number,
                    currentPatientNumber: raw.patient_stats.current_patient_number,
                    currentPatientDetails: raw.patient_stats.current_patient_details,
                }).getValue(),
            },
            id,
        );

        if (patientEntryBookOrError.isFailure) throw patientEntryBookOrError.errorValue();

        if (patientEntryBookOrError.isSuccess) return patientEntryBookOrError.getValue();
    }
}
