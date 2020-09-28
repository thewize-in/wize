import { Repo } from '../../../../shared/infra/Repo';
import { Model, Document } from 'mongoose';
import { Result } from '../../../../shared/core/logic/Result';
import { Guard } from '../../../../shared/core/logic/Guard';
import { List } from '../../domain/list';
import { ArchiveListMap } from '../../mappers/ListMap/ArchiveListMap';

export interface IArchiveListRepo extends Repo<List> {
  getArchivedList(bookId: string, listId: string): Promise<Result<any>>;
  getArchivedListMetadata(bookId: string, date: string): Promise<Result<any>>;
}

export class ArchiveListRepo implements IArchiveListRepo {
  private model: Model<Document>;
  constructor(model: Model<Document>) {
    this.model = model;
  }
  async save(list: List): Promise<void> {
    const rawList = ArchiveListMap.toPersistence(list);
    await new this.model(rawList).save();
  }
  async exists(bookId: string): Promise<boolean> {
    try {
      const listExist = await this.model.findOne({
        book_id: bookId,
      });
      const guardResult = Guard.againstNullOrUndefined(listExist, 'listExist');

      if (!guardResult.succeeded) return false;
      return listExist ? true : false;
    } catch (error) {
      return false;
    }
  }
  async getArchivedList(bookId: string, listId: string): Promise<Result<any>> {
    try {
      const rawArchivedList = await this.model.findOne({
        book_id: bookId,
        _id: listId,
      });
      const guardResult = Guard.againstNullOrUndefined(
        rawArchivedList,
        'rawList'
      );

      if (!guardResult.succeeded) return Result.ok<any>(false);

      return Result.ok<any>(ArchiveListMap.archivedListToDTO(rawArchivedList));
    } catch (error) {
      return Result.ok<any>(false);
    }
  }
  async getArchivedListMetadata(
    bookId: string,
    date: string
  ): Promise<Result<any>> {
    try {
      const rawArchivedListMetadata = await this.model.find(
        { book_id: bookId, created_on: date },
        { created_on: 1, _id: 1, list_name: 1 }
      );

      const guardResult = Guard.againstNullOrUndefined(
        rawArchivedListMetadata,
        'rawArchivedListMetadata'
      );

      if (!guardResult.succeeded) return Result.ok<any>(false);

      return Result.ok<any>(
        ArchiveListMap.archivedListMetadataToDTO(rawArchivedListMetadata)
      );
    } catch (error) {
      return Result.ok<any>(false);
    }
  }
}
