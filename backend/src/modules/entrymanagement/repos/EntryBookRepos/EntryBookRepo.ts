import { Repo } from '../../../../shared/infra/Repo';
import { EntryBook } from '../../domain/entryBook';
import { Model, Document } from 'mongoose';
import { EntryBookMap } from '../../mappers/EntryBookMap/EntryBookMap';
import { Result } from '../../../../shared/core/logic/Result';
import { Guard } from '../../../../shared/core/logic/Guard';

export interface IEntryBookRepo extends Repo<EntryBook> {
  getEntryBookByBookId(bookId: string): Promise<Result<EntryBook>>;
  getEntryBook(bookId: string): Promise<Result<any>>;
  delete(bookId: string): Promise<void>;
}

export class EntryBookRepo implements IEntryBookRepo {
  private model: Model<Document>;
  constructor(model: Model<Document>) {
    this.model = model;
  }
  async save(entryBook: EntryBook): Promise<void> {
    const bookId = entryBook.bookId.id.toString();
    const entryBookExist = await this.exists(bookId);

    const rawPatientEntryBook = EntryBookMap.toPersistence(entryBook);

    if (!entryBookExist) {
      try {
        await new this.model(rawPatientEntryBook).save();
      } catch (error) {
        console.log(
          `[PatientEntryBookRepo]: something went wrong while saving\n${error}`
        );
      }
    } else {
      await this.model.findOneAndUpdate(
        { book_id: bookId },
        rawPatientEntryBook
      );
    }
  }
  async exists(bookId: string): Promise<boolean> {
    try {
      const entryBookExist = await this.model.findOne({
        book_id: bookId,
      });
      const guardResult = Guard.againstNullOrUndefined(
        entryBookExist,
        'entryBookExist'
      );

      if (!guardResult.succeeded) return false;
      return true;
    } catch (error) {
      return false;
    }
  }
  async delete(bookId: string): Promise<void> {
    try {
      await this.model.findOneAndDelete({ book_id: bookId });
    } catch (error) {
      console.log('[PatientEntryBookRepo]: failed to delete EntryBook');
    }
  }
  async getEntryBookByBookId(bookId: string): Promise<Result<EntryBook>> {
    const rawEntryBook = await this.model.findOne({ book_id: bookId });
    const guardResult = Guard.againstNullOrUndefined(
      rawEntryBook,
      'rawEntryBook'
    );

    if (!guardResult.succeeded)
      return Result.fail<EntryBook>('[getEntryBookByBookId]: not found');

    return Result.ok<EntryBook>(EntryBookMap.toDomain(rawEntryBook));
  }
  async getEntryBook(bookId: string): Promise<Result<any>> {
    const rawEntryBook = await this.model.findOne({ book_id: bookId });
    const guardResult = Guard.againstNullOrUndefined(
      rawEntryBook,
      'rawEntryBook'
    );

    if (!guardResult.succeeded)
      return Result.fail<EntryBook>('[getEntryBookByBookId]: not found');

    return Result.ok<any>(EntryBookMap.toDTO(rawEntryBook));
  }
}
