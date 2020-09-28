import { Result } from '../../../../../shared/core/logic/Result';
import { fakeListRepo } from '../../../repos/ListRepos/fakeListRepo';
import { CreateNewList } from '../createNewList/CreateNewList';
import { AddNewEntry } from './AddNewEntry';

let addNewEntry = new AddNewEntry(fakeListRepo);
let createNewList = new CreateNewList(fakeListRepo);

let addNewEntryResult: Result<boolean>;
let createNewListResult: Result<boolean>;
let bookId: string;
let entryDetail;
let listName = 'saud chougle';

beforeAll(async () => {
  bookId = 'sdlfkasjflsfjf';
  entryDetail = {
    name: 'saud',
    phone: 7387307106,
    address: 'chiplun',
  };
  addNewEntryResult = await addNewEntry.execute({
    bookId,
    entryDetail,
  });
});

describe('AddNewEntry', () => {
  it('If there is no list\n\t addNewEntryResult must be false', () => {
    expect(addNewEntryResult.isSuccess).toBeTruthy();
    expect(addNewEntryResult.getValue()).toBeFalsy();
  });
  it('Since there is no list create new list and\n\t createNewList must be true', async () => {
    createNewListResult = await createNewList.execute({ bookId, listName });
    expect(createNewListResult.isSuccess).toBeTruthy();
    expect(createNewListResult.getValue()).toBeTruthy();
  });
  it('This time we created new list now\n\t addNewEntryResult must be true', () => {
    expect(addNewEntryResult.isSuccess).toBeTruthy();
    expect(addNewEntryResult.getValue()).toBeFalsy();
  });
});
