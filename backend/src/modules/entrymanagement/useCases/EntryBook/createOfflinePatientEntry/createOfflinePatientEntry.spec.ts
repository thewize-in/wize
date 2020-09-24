import { Result } from '../../../../../shared/core/logic/Result';
import { fakeEntryBookRepo } from '../../../repos/EntryBookRepos/fakeEntryBookRepo';
import { CreateEntryBook } from '../createEntryBook/CreateEntryBook';
import { CreateOfflinePatientEntry } from './CreateOfflinePatientEntry';

let createOfflinePatientEntry = new CreateOfflinePatientEntry(
  fakeEntryBookRepo
);
let createEntryBook = new CreateEntryBook(fakeEntryBookRepo);

let createOfflinePatientEntryResult: Result<boolean>;
let createEntryBookResult: Result<boolean>;
let bookId: string;
let patientDetails;

beforeAll(async () => {
  bookId = 'sdlfkasjflsfjf';
  patientDetails = {
    name: 'saud',
    phone: 7387307106,
    address: 'chiplun',
  };
  createOfflinePatientEntryResult = await createOfflinePatientEntry.execute({
    bookId,
    patientDetails,
  });
});

describe('CreateOfflinePatientEntry', () => {
  it('If there is no entrybook\n\t createOfflinePatientEntryResult must be false', () => {
    expect(createOfflinePatientEntryResult.isSuccess).toBeTruthy();
    expect(createOfflinePatientEntryResult.getValue()).toBeFalsy();
  });
  it('Since there is no entrybook create new entrybook and\n\t createEntryBookResult must be true', async () => {
    createEntryBookResult = await createEntryBook.execute({ bookId });
    expect(createEntryBookResult.isSuccess).toBeTruthy();
    expect(createEntryBookResult.getValue()).toBeTruthy();
  });
  it('this time we created new entrybook now\n\t createOfflinePatientEntryResult must be true', () => {
    expect(createOfflinePatientEntryResult.isSuccess).toBeTruthy();
    expect(createOfflinePatientEntryResult.getValue()).toBeFalsy();
  });
});
