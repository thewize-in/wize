import { Guard } from '../../../shared/core/logic/Guard';
import { Result } from '../../../shared/core/logic/Result';
import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { BookId } from './bookId';
import { EntryStats } from './entryStats';

export interface EntryDetail {
  name: string;
  id?: string;
  address?: string;
  phone?: number | string;
  number?: number;
  type?: string;
}

interface ListProps {
  createdOn: string;
  listName: string;
  bookId?: BookId;
  allEntries: EntryDetail[];
  doneEntries: EntryDetail[];
  undoneEntries: EntryDetail[];
  entryStats?: EntryStats;
}

export class List extends Entity<ListProps> {
  get bookId(): BookId {
    return BookId.create(this._id).getValue();
  }
  get allEntries(): EntryDetail[] {
    return this.props.allEntries;
  }
  get doneEntries(): EntryDetail[] {
    return this.props.doneEntries;
  }
  get undoneEntries(): EntryDetail[] {
    return this.props.undoneEntries;
  }
  get entryStats(): EntryStats {
    return this.props.entryStats;
  }
  get totalEntries(): number {
    return (this.props.entryStats.props.totalEntries = this.allEntries.length);
  }

  get currentEntryNumber(): number {
    return this.props.entryStats.props.currentEntryNumber;
  }
  get currentEntryDetails(): EntryDetail {
    return (this.props.entryStats.props.currentEntryDetails = this.allEntries[
      this.currentEntryNumber - 1
    ]);
  }

  public static create(props: ListProps, id?: UniqueEntityID): Result<List> {
    const isNewList = id ? false : true;

    const list = new List({ ...props }, id);

    const guardResult = Guard.againstNullOrUndefined(list, 'list');
    if (!guardResult.succeeded) throw Result.fail<List>(guardResult.message);

    return Result.ok<List>(list);
  }
  public static createDefault(id: string, listName: string): Result<List> {
    const bookId = new UniqueEntityID(id);
    const defaultEntryStats = EntryStats.createDefault().getValue();

    const defaultListProps: ListProps = {
      listName,
      createdOn: new Date().toISOString().substr(0, 10),
      allEntries: [],
      doneEntries: [],
      undoneEntries: [],
      entryStats: defaultEntryStats,
    };

    const defaultList = new List(defaultListProps, bookId);

    const guardResult = Guard.againstNullOrUndefined(
      defaultList,
      'defaultList'
    );
    if (!guardResult.succeeded) throw Result.fail<List>(guardResult.message);

    return Result.ok<List>(defaultList);
  }
  public createOfflineEntry(entryDetail: EntryDetail): void {
    this.addToAllEntries(entryDetail);
  }
  public callNextEntry(): void {
    if (this.currentEntryNumber < this.totalEntries) {
      this.updateCurrentEntryNumber();
    }
  }
  public addToDoneEntries(): void {
    this.doneEntries.push(this.currentEntryDetails);
  }
  public addToUndoneEntries(): void {
    this.undoneEntries.push(this.currentEntryDetails);
  }
  public addToAllEntries(entryDetail: EntryDetail): void {
    entryDetail.number = this.totalEntries + 1;

    if (
      this.sumOfDoneAndUndoneEntries() === this.totalEntries &&
      this.currentEntryNumber === this.totalEntries
    ) {
      this.updateCurrentEntryNumber();
    }
    this.allEntries.push(entryDetail);
  }
  private updateCurrentEntryNumber(): void {
    this.props.entryStats.incrCurrentEntryNumber();
  }
  private sumOfDoneAndUndoneEntries(): number {
    return this.doneEntries.length + this.undoneEntries.length;
  }
}
