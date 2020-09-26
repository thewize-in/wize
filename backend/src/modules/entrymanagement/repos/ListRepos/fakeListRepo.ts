import { Result } from '../../../../shared/core/logic/Result';
import { Guard } from '../../../../shared/core/logic/Guard';
import { FakeRepo } from '../../../../shared/core/tests/FakeRepo';
import { IListRepo } from './ListRepo';
import { List } from '../../domain/list';
import { ListMap } from '../../mappers/ListMap/ListMap';

export class FakeListRepo extends FakeRepo<List> implements IListRepo {
  constructor() {
    super();
  }
  async save(list: List): Promise<void> {
    const bookId = list.bookId.id.toString();
    const listExist = await this.exists(bookId);

    const rawList = ListMap.toPersistence(list);

    if (!listExist) {
      try {
        await this.insert(bookId, rawList);
      } catch (error) {
        console.log(
          `[FakeListRepo]: something went wrong while saving\n${error}`
        );
      }
    } else {
      await this.findAndUpdate(bookId, rawList);
      //findOneAndUpdate raise domain event be carefull
    }
  }
  async exists(bookId: string): Promise<boolean> {
    try {
      const listExist = await this.has(bookId);
      const guardResult = Guard.againstNullOrUndefined(listExist, 'listExist');
      if (!guardResult.succeeded) return false;
      return listExist ? true : false;
    } catch (error) {
      return false;
    }
  }
  async delete(bookId: string): Promise<void> {
    try {
      await this.remove(bookId);
    } catch (error) {
      console.log('[FakeListRepo]: failed to delete list');
    }
  }
  async getListByBookId(bookId: string): Promise<Result<List>> {
    const rawList = await this.find(bookId);
    const guardResult = Guard.againstNullOrUndefined(rawList, 'rawList');

    if (!guardResult.succeeded)
      return Result.fail<List>('[getListBookId]: not found');

    return Result.ok<List>(ListMap.toDomain(rawList));
  }
  async getList(bookId: string): Promise<Result<any>> {
    const rawList = await this.find(bookId);
    const guardResult = Guard.againstNullOrUndefined(rawList, 'rawList');

    if (!guardResult.succeeded)
      return Result.fail<List>('[getList]: not found');

    return Result.ok<any>(ListMap.toDTO(rawList));
  }
}

const fakeListRepo = new FakeListRepo();
export { fakeListRepo };
