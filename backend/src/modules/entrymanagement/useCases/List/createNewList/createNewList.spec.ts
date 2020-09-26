import { Result } from '../../../../../shared/core/logic/Result';
import { fakeListRepo } from '../../../repos/ListRepos/fakeListRepo';
import { CreateNewList } from './CreateNewList';

let createNewList = new CreateNewList(fakeListRepo);
let result: Result<boolean>;
let bookId: string;
beforeAll(async () => {
  bookId = 'sdlfkasjflsfjf';
  result = await createNewList.execute({ bookId });
});

describe('CreateNewList', () => {
  it('There is no list exists so result must be true that means new list created :)', () => {
    expect(result.isSuccess).toBeTruthy();
    expect(result.getValue()).toBeTruthy();
  });

  it('Now this time if want to create new list result should be false that means list exists', async () => {
    result = await createNewList.execute({ bookId });
    expect(result.isSuccess).toBeTruthy();
    expect(result.getValue()).toBeFalsy();
  });
});
