import { Result } from '../../../../../shared/core/logic/Result';
import { fakeEntryBookRepo } from '../../../repos/EntryBookRepos/fakeEntryBookRepo';
import { CreateEntryBook } from '../createEntryBook/CreateEntryBook';
import { CreateOfflinePatientEntry } from '../createOfflinePatientEntry/CreateOfflinePatientEntry';
import { NextEntry } from './NextEntry';

let nextEntry = new NextEntry(fakeEntryBookRepo);
let createEntryBook = new CreateEntryBook(fakeEntryBookRepo);
let createOfflinePatientEntry = new CreateOfflinePatientEntry(
  fakeEntryBookRepo
);

let nextEntryResult: Result<boolean>;
let createEntryBookResult: Result<boolean>;
let createOfflinePatientEntryResult: Result<boolean>;
let patientDetails;
let bookId: string;
let isPreviousEntryDone: boolean;

beforeAll(async () => {
  bookId = 'sdlfkasjflsfjf';
  isPreviousEntryDone = false;
  patientDetails = {
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
  it('If there is no entrybook\n\t nextEntryResult must be false', () => {
    expect(nextEntryResult.isSuccess).toBeTruthy();
    expect(nextEntryResult.getValue()).toBeFalsy();
  });
  it('Since there is no entrybook create new entrybook and\n\t createEntryBookResult must be true', async () => {
    createEntryBookResult = await createEntryBook.execute({ bookId });
    expect(createEntryBookResult.isSuccess).toBeTruthy();
    expect(createEntryBookResult.getValue()).toBeTruthy();
  });
  it('createOfflinePatientEntry', async () => {
    createOfflinePatientEntryResult = await createOfflinePatientEntry.execute({
      bookId,
      patientDetails,
    });
    expect(createOfflinePatientEntryResult.isSuccess).toBeTruthy();
    expect(createOfflinePatientEntryResult.getValue()).toBeTruthy();
  });
  it('this time we created new entrybook now\n\t nextEntryResult must be true', () => {
    expect(nextEntryResult.isSuccess).toBeTruthy();
    expect(nextEntryResult.getValue()).toBeFalsy();
  });
});
