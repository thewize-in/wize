import { Result } from '../../../../../shared/core/logic/Result';
import { CreateNewList } from '../createNewList/CreateNewList';
import { AddNewEntry } from '../addNewEntry/AddNewEntry';
import { NextEntry } from './NextEntry';
import { fakeListRepo } from '../../../repos/ListRepos/fakeListRepo';

let nextEntry = new NextEntry(fakeListRepo);
let createNewList = new CreateNewList(fakeListRepo);
let addNewEntry = new AddNewEntry(fakeListRepo);

let nextEntryResult: Result<boolean>;
let createNewListResult: Result<boolean>;
let addNewEntryResult: Result<boolean>;
let entryDetail;
let bookId: string;
let isPreviousEntryDone: boolean;
let listName = 'saud chougle';

beforeAll(async () => {
  bookId = 'sdlfkasjflsfjf';
  isPreviousEntryDone = false;
  entryDetail = {
    name: 'saud',
    phone: 7387307106,
    address: 'chiplun',
  };

  nextEntryResult = await nextEntry.execute({
    bookId,
    isPreviousEntryDone,
  });
});

describe('NextEntry', () => {
  it('If there is no list\n\t nextEntryResult must be false', () => {
    expect(nextEntryResult.isSuccess).toBeTruthy();
    expect(nextEntryResult.getValue()).toBeFalsy();
  });
  it('Since there is no list create new list and\n\t createNewListResult must be true', async () => {
    createNewListResult = await createNewList.execute({ bookId, listName });
    expect(createNewListResult.isSuccess).toBeTruthy();
    expect(createNewListResult.getValue()).toBeTruthy();
  });
  it('addNewEntry', async () => {
    addNewEntryResult = await addNewEntry.execute({
      bookId,
      entryDetail,
    });
    expect(addNewEntryResult.isSuccess).toBeTruthy();
    expect(addNewEntryResult.getValue()).toBeTruthy();
  });
  it('this time we created new list now\n\t nextEntryResult must be true', () => {
    expect(nextEntryResult.isSuccess).toBeTruthy();
    expect(nextEntryResult.getValue()).toBeFalsy();
  });
});
