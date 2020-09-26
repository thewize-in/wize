import { Repo } from '../../../../shared/infra/Repo';
import { Model, Document } from 'mongoose';
import { Result } from '../../../../shared/core/logic/Result';
import { Guard } from '../../../../shared/core/logic/Guard';
import { List } from '../../domain/list';
import { ListMap } from '../../mappers/ListMap/ListMap';

export interface IListRepo extends Repo<List> {
  getListByBookId(bookId: string): Promise<Result<List>>;
  getList(bookId: string): Promise<Result<any>>;
  delete(bookId: string): Promise<void>;
}

export class ListRepo implements IListRepo {
  private model: Model<Document>;
  constructor(model: Model<Document>) {
    this.model = model;
  }
  async save(list: List): Promise<void> {
    const bookId = list.bookId.id.toString();
    const listExist = await this.exists(bookId);

    const rawList = ListMap.toPersistence(list);

    if (!listExist) {
      try {
        await new this.model(rawList).save();
      } catch (error) {
        console.log(`[ListRepo]: something went wrong while saving\n${error}`);
      }
    } else {
      await this.model.findOneAndUpdate({ book_id: bookId }, rawList);
    }
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
  async delete(bookId: string): Promise<void> {
    try {
      await this.model.findOneAndDelete({ book_id: bookId });
    } catch (error) {
      console.log('[ListRepo]: failed to delete List');
    }
  }
  async getListByBookId(bookId: string): Promise<Result<List>> {
    const rawList = await this.model.findOne({ book_id: bookId });
    const guardResult = Guard.againstNullOrUndefined(rawList, 'rawList');

    if (!guardResult.succeeded)
      return Result.fail<List>('[getListByBookId]: not found');

    return Result.ok<List>(ListMap.toDomain(rawList));
  }
  async getList(bookId: string): Promise<Result<any>> {
    const rawList = await this.model.findOne({ book_id: bookId });
    const guardResult = Guard.againstNullOrUndefined(rawList, 'rawList');

    if (!guardResult.succeeded) return Result.ok<boolean>(false);

    return Result.ok<any>(ListMap.toDTO(rawList));
  }
}
