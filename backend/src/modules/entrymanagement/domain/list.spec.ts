import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/logic/Result';
import { List } from './list';

let customListResult: Result<List>, defaultListResult: Result<List>, list: List;
const listName = 'saud chougle';

test('create custom list', () => {
  const defaultBookId = new UniqueEntityID('1');
  customListResult = List.create(
    {
      listName,
      createdOn: '28.5.20',
      allEntries: [],
      doneEntries: [],
      undoneEntries: [],
    },
    defaultBookId
  );

  expect(customListResult.isSuccess).toBeTruthy();
  expect(customListResult.isFailure).toBeFalsy();

  list = customListResult.getValue();
});

test('create default list', () => {
  const defaultBookId = new UniqueEntityID('1').toString();

  defaultListResult = List.createDefault(defaultBookId, listName);

  expect(defaultListResult.isSuccess).toBeTruthy();
  expect(defaultListResult.isFailure).toBeFalsy();

  list = defaultListResult.getValue();
});

test('create offline patient entry', () => {
  const offlineEntries = [
    {
      name: 'saud chougle',
      phone: 8983135422,
      address: 'chiplun',
      type: 'offline',
    },
    {
      name: 'arbaz nivsekar',
      phone: '',
      address: '',
      type: 'offline',
    },
    {
      name: 'nahid tambe',
      phone: 1234567890,
      address: '',
      type: 'offline',
    },
    {
      name: 'shaharukh chougle',
      phone: '',
      address: 'maap',
      type: 'offline',
    },
  ];
  offlineEntries.forEach((entry) => {
    list.createOfflineEntry(entry);
  });
  expect(list.allEntries.length).toBe(offlineEntries.length);
  expect(list.doneEntries.length).toBe(0);
  expect(list.undoneEntries.length).toBe(0);
  expect(list.totalEntries).toBe(offlineEntries.length);
  expect(list.currentEntryNumber).toBe(1);
});

test('entry number 1 is done so add to done list', () => {
  list.addToDoneEntries();
  expect(list.doneEntries.length).toBe(1);
  expect(list.undoneEntries.length).toBe(0);
});

test('call next entry i.e 2', () => {
  list.callNextEntry();
  expect(list.currentEntryNumber).toBe(2);
  expect(list.doneEntries.length).toBe(1);
  expect(list.undoneEntries.length).toBe(0);
});

test('entry number 2 is not done so add to undone list', () => {
  list.addToUndoneEntries();
  expect(list.doneEntries.length).toBe(1);
  expect(list.undoneEntries.length).toBe(1);
});

test('call next entry i.e 3', () => {
  list.callNextEntry();
  expect(list.currentEntryNumber).toBe(3);
  expect(list.doneEntries.length).toBe(1);
  expect(list.undoneEntries.length).toBe(1);
});

test('entry number 3 is done so add to done list', () => {
  list.addToDoneEntries();
  expect(list.doneEntries.length).toBe(2);
  expect(list.undoneEntries.length).toBe(1);
});

test('call next entry i.e 4', () => {
  list.callNextEntry();
  expect(list.currentEntryNumber).toBe(4);
  expect(list.doneEntries.length).toBe(2);
  expect(list.undoneEntries.length).toBe(1);
});

test('entry number 4 is not done so add to undone list', () => {
  list.addToUndoneEntries();
  expect(list.doneEntries.length).toBe(2);
  expect(list.undoneEntries.length).toBe(2);
});

test('call next entry i.e 5 but there are no more entries remaining there for it will not call next entry', () => {
  list.callNextEntry();
  expect(list.currentEntryNumber).toBe(4);
  expect(list.doneEntries.length).toBe(2);
  expect(list.undoneEntries.length).toBe(2);
});

test('create new offline entry in middle of done and undone entiries to test current number is updated', () => {
  list.createOfflineEntry({
    name: 'sami chougle',
    phone: '7387307106',
    address: 'chiplun',
    type: 'offline',
  });
  expect(list.totalEntries).toBe(5);
  expect(list.currentEntryNumber).toBe(5);
  expect(list.doneEntries.length).toBe(2);
  expect(list.undoneEntries.length).toBe(2);
});

test('create new offline entry in middle of done and undone entiries. but this time to test current number is not updated since we did not call next entry', () => {
  list.createOfflineEntry({
    name: 'sami chougle',
    phone: '7387307106',
    address: 'chiplun',
    type: 'offline',
  });
  expect(list.totalEntries).toBe(6);
  expect(list.currentEntryNumber).toBe(5);
  expect(list.doneEntries.length).toBe(2);
  expect(list.undoneEntries.length).toBe(2);
});
test('entry number 5 is not done so add to undone list', () => {
  list.addToUndoneEntries();
  expect(list.doneEntries.length).toBe(2);
  expect(list.undoneEntries.length).toBe(3);
});
test('call next entry i.e 6', () => {
  list.callNextEntry();
  expect(list.currentEntryNumber).toBe(6);
  expect(list.doneEntries.length).toBe(2);
  expect(list.undoneEntries.length).toBe(3);
});

test('entry number 6 is done so add to done list', () => {
  list.addToDoneEntries();
  expect(list.doneEntries.length).toBe(3);
  expect(list.undoneEntries.length).toBe(3);
});

test('FINAL TEST: call nextentry i.e 7 but there are no more entries remaining there for it will not call next entry', () => {
  expect(list.totalEntries).toBe(6);
  expect(list.currentEntryNumber).toBe(6);
  expect(list.doneEntries.length).toBe(3);
  expect(list.undoneEntries.length).toBe(3);
});
