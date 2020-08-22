import { Repo } from '../../../../shared/infra/Repo';
import { PatientEntryBook } from '../../domain/patientEntryBook';
import { Model, Document } from 'mongoose';
import { PatientEntryBookMap } from '../../mappers/patientEntryBookMap/PatientEntryBookMap';
import { Result } from '../../../../shared/core/logic/Result';
import { Guard } from '../../../../shared/core/logic/Guard';

export interface IPatientEntryBookRepo extends Repo<PatientEntryBook> {
    getPatientEntryBookByBookId(bookId: string): Promise<Result<PatientEntryBook>>;
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
    async getPatientEntryBookByBookId(bookId: string): Promise<Result<PatientEntryBook>> {
        const rawPatientEntryBook = await this.model.findOne({ book_id: bookId });
        const guardResult = Guard.againstNullOrUndefined(rawPatientEntryBook, 'rawPatientEntryBook');

        if (!guardResult.succeeded) return Result.fail<PatientEntryBook>('[getPatientEntryBookByBookId]: not found');

        return Result.ok<PatientEntryBook>(PatientEntryBookMap.toDomain(rawPatientEntryBook));
    }
}
