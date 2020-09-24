import { Result } from '../../../../../shared/core/logic/Result';
import { fakeEntryBookRepo } from '../../../repos/EntryBookRepos/fakeEntryBookRepo';
import { CreateEntryBook } from '../createEntryBook/CreateEntryBook';
import { DeleteEntryBook } from './DeleteEntryBook';

let deleteEntryBook = new DeleteEntryBook(fakeEntryBookRepo);
let createEntryBook = new CreateEntryBook(fakeEntryBookRepo);

let deleteEntryBookResult: Result<boolean>;
let createEntryBookResult: Result<boolean>;
let bookId: string;

beforeAll(async () => {
  bookId = 'sdlfkasjflsfjf';
  deleteEntryBookResult = await deleteEntryBook.execute({
    bookId,
  });
});

describe('DeleteEntryBook', () => {
  it('If there is no entrybook\n\t deleteEntryBookResult must be false', () => {
    expect(deleteEntryBookResult.isSuccess).toBeTruthy();
    expect(deleteEntryBookResult.getValue()).toBeFalsy();
  });
  it('Since there is no entrybook create new entrybook and\n\t createEntryBookResult must be true', async () => {
    createEntryBookResult = await createEntryBook.execute({ bookId });
    expect(createEntryBookResult.isSuccess).toBeTruthy();
    expect(createEntryBookResult.getValue()).toBeTruthy();
  });
  it('this time we created new entrybook now\n\t deleteEntryBookResult must be true', () => {
    expect(deleteEntryBookResult.isSuccess).toBeTruthy();
    expect(deleteEntryBookResult.getValue()).toBeFalsy();
  });
});
