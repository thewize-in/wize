import { Repo } from '../../../../shared/infra/Repo';
import { PatientEntryBook } from '../../domain/patientEntryBook';
import { Model, Document } from 'mongoose';
import { PatientEntryBookMap } from '../../mappers/patientEntryBookMap/PatientEntryBookMap';
import { Result } from '../../../../shared/core/logic/Result';
import { Guard } from '../../../../shared/core/logic/Guard';

export interface IPatientEntryBookRepo extends Repo<PatientEntryBook> {
    getPatientEntryBookByBookId(bookId: string): Promise<Result<PatientEntryBook>>;
    getAllPatients(bookId: string): Promise<Result<any>>;
    getDonePatients(bookId: string): Promise<Result<any>>;
    getUndonePatients(bookId: string): Promise<Result<any>>;
    delete(bookId: string): Promise<void>;
}

export class PatientEntryBookRepo implements IPatientEntryBookRepo {
    private model: Model<Document>;
    constructor(model: Model<Document>) {
        this.model = model;
    }
    async save(patientEntryBook: PatientEntryBook): Promise<void> {
        const bookId = patientEntryBook.bookId.id.toString();
        const patientEntryBookExist = await this.exists(bookId);

        const rawPatientEntryBook = PatientEntryBookMap.toPersistence(patientEntryBook);

        if (!patientEntryBookExist) {
            try {
                await new this.model(rawPatientEntryBook).save();
                console.log('patient entry book saved');
            } catch (error) {
                console.log(`[PatientEntryBookRepo]: something went wrong while saving\n${error}`);
            }
        } else {
            await this.model.findOneAndUpdate({ book_id: bookId }, rawPatientEntryBook);
        }
    }
    async exists(bookId: string): Promise<boolean> {
        try {
            const patientEntryBookExist = await this.model.findOne({ book_id: bookId });
            const guardResult = Guard.againstNullOrUndefined(patientEntryBookExist, 'patientEntryBookExist');

            if (!guardResult.succeeded) return false;
            return true;
        } catch (error) {
            console.log('[PatientEntryBookRepo]: patient entry book doesnot exists');
            return false;
        }
    }
    async delete(bookId: string): Promise<void> {
        try {
            await this.model.findOneAndDelete({ book_id: bookId });
        } catch (error) {
            console.log('[PatientEntryBookRepo]: failed to delete patientEntryBook');
        }
    }
    async getPatientEntryBookByBookId(bookId: string): Promise<Result<PatientEntryBook>> {
        const rawPatientEntryBook = await this.model.findOne({ book_id: bookId });
        const guardResult = Guard.againstNullOrUndefined(rawPatientEntryBook, 'rawPatientEntryBook');

        if (!guardResult.succeeded) return Result.fail<PatientEntryBook>('[getPatientEntryBookByBookId]: not found');

        return Result.ok<PatientEntryBook>(PatientEntryBookMap.toDomain(rawPatientEntryBook));
    }
    async getAllPatients(bookId: string): Promise<Result<any>> {
        const patientListResult: any = await this.model.findOne({ book_id: bookId }, { patient_list: 1 });

        const guardResult = Guard.againstNullOrUndefined(patientListResult, 'patientListResult');
        if (!guardResult.succeeded) return Result.fail<any>('patientList not found');

        return Result.ok<any>({ allPatients: patientListResult.patient_list });
    }
    async getDonePatients(bookId: string): Promise<Result<any>> {
        const donePatientListResult: any = await this.model.findOne({ book_id: bookId }, { done_patient_list: 1 });

        const guardResult = Guard.againstNullOrUndefined(donePatientListResult, 'donePatientListResult');
        if (!guardResult.succeeded) return Result.fail<any>('donePatientList not found');

        return Result.ok<any>({ donePatients: donePatientListResult.done_patient_list });
    }
    async getUndonePatients(bookId: string): Promise<Result<any>> {
        const undonePatientListResult: any = await this.model.findOne({ book_id: bookId }, { undone_patient_list: 1 });

        const guardResult = Guard.againstNullOrUndefined(undonePatientListResult, 'undonePatientListResult');
        if (!guardResult.succeeded) return Result.fail<any>('undonePatientList not found');

        return Result.ok<any>({ undonePatients: undonePatientListResult.undone_patient_list });
    }
}
