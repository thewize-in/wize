import { Mapper } from '../../../../shared/infra/Mapper';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { EntryBook } from '../../domain/entryBook';
import { PatientStats } from '../../domain/patientStats';

export class EntryBookMap implements Mapper<EntryBook> {
  public static toPersistence(entryBook: EntryBook) {
    return {
      book_id: entryBook.bookId.id.toString(),
      patient_list: entryBook.patientList,
      done_patient_list: entryBook.donePatientList,
      undone_patient_list: entryBook.undonePatientList,
      patient_stats: {
        total_patient_number: entryBook.totalPatientNumber,
        current_patient_number: entryBook.currentPatientNumber,
        current_patient_details: entryBook.currentPatientDetails,
      },
    };
  }
  public static toDomain(raw: any) {
    const bookId = new UniqueEntityID(raw.book_id);
    const entryBookOrError = EntryBook.create(
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

    if (entryBookOrError.isFailure) throw entryBookOrError.errorValue();

    if (entryBookOrError.isSuccess) return entryBookOrError.getValue();
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
