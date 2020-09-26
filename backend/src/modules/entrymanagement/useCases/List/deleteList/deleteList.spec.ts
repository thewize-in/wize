import { Result } from '../../../../../shared/core/logic/Result';
import { fakeListRepo } from '../../../repos/ListRepos/fakeListRepo';
import { CreateNewList } from '../createNewList/CreateNewList';
import { DeleteList } from './DeleteList';

let deleteList = new DeleteList(fakeListRepo);
let createNewList = new CreateNewList(fakeListRepo);

let deleteListResult: Result<boolean>;
let createNewListResult: Result<boolean>;
let bookId: string;

beforeAll(async () => {
  bookId = 'sdlfkasjflsfjf';
  deleteListResult = await deleteList.execute({
    bookId,
  });
});

describe('DeleteList', () => {
  it('If there is no list\n\t deleteListResult must be false', () => {
    expect(deleteListResult.isSuccess).toBeTruthy();
    expect(deleteListResult.getValue()).toBeFalsy();
  });
  it('Since there is no list create new list and\n\t createNewListResult must be true', async () => {
    createNewListResult = await createNewList.execute({ bookId });
    expect(createNewListResult.isSuccess).toBeTruthy();
    expect(createNewListResult.getValue()).toBeTruthy();
  });
  it('this time we created new list now\n\t deleteListResult must be true', () => {
    expect(deleteListResult.isSuccess).toBeTruthy();
    expect(deleteListResult.getValue()).toBeFalsy();
  });
});
