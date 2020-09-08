import { Mapper } from '../../../../shared/infra/Mapper';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { PatientEntryBook } from '../../domain/patientEntryBook';
import { PatientStats } from '../../domain/patientStats';

export class PatientEntryBookMap implements Mapper<PatientEntryBook> {
  public static toPersistence(patientEntryBook: PatientEntryBook) {
    return {
      book_id: patientEntryBook.bookId.id.toString(),
      patient_list: patientEntryBook.patientList,
      done_patient_list: patientEntryBook.donePatientList,
      undone_patient_list: patientEntryBook.undonePatientList,
      patient_stats: {
        total_patient_number: patientEntryBook.totalPatientNumber,
        current_patient_number: patientEntryBook.currentPatientNumber,
        current_patient_details: patientEntryBook.currentPatientDetails,
      },
    };
  }
  public static toDomain(raw: any) {
    const bookId = new UniqueEntityID(raw.book_id);
    const patientEntryBookOrError = PatientEntryBook.create(
      {
        patientList: raw.patient_list,
        donePatientList: raw.done_patient_list,
        undonePatientList: raw.undone_patient_list,
        patientStats: PatientStats.create({
          totalPatientNumber: raw.patient_stats.total_patient_number,
          currentPatientNumber: raw.patient_stats.current_patient_number,
          currentPatientDetails: raw.patient_stats.current_patient_details,
        }).getValue(),
      },
      bookId
    );

    if (patientEntryBookOrError.isFailure)
      throw patientEntryBookOrError.errorValue();

    if (patientEntryBookOrError.isSuccess)
      return patientEntryBookOrError.getValue();
  }
  public static toDTO(raw: any) {
    return {
      stats: {
        total: raw.patient_stats.total_patient_number,
        current: raw.patient_stats.current_patient_number,
      },
      allPatients: raw.patient_list,
      donePatients: raw.done_patient_list,
      undonePatients: raw.undone_patient_list,
    };
  }
}
