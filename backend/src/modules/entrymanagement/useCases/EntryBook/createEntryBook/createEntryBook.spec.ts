import { Result } from '../../../../../shared/core/logic/Result';
import { fakeEntryBookRepo } from '../../../repos/EntryBookRepos/fakeEntryBookRepo';
import { CreateEntryBook } from './CreateEntryBook';

let createEntryBook = new CreateEntryBook(fakeEntryBookRepo);
let result: Result<boolean>;
let bookId: string;
beforeAll(async () => {
  bookId = 'sdlfkasjflsfjf';
  result = await createEntryBook.execute({ bookId });
});

describe('CreateEntryBook', () => {
  it('There is no entrybook exists so result must be true that means new entrybook created :)', () => {
    expect(result.isSuccess).toBeTruthy();
    expect(result.getValue()).toBeTruthy();
  });

  it('Now this time if want to create new entrybook result should be false that means entrybook exists', async () => {
    result = await createEntryBook.execute({ bookId });
    expect(result.isSuccess).toBeTruthy();
    expect(result.getValue()).toBeFalsy();
  });
});
