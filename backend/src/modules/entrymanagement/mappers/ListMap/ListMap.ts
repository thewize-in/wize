import { Mapper } from '../../../../shared/infra/Mapper';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { List } from '../../domain/list';
import { EntryStats } from '../../domain/entryStats';

export class ListMap implements Mapper<List> {
  public static toPersistence(list: List) {
    return {
      created_on: list.props.createdOn,
      list_name: list.props.listName,
      book_id: list.bookId.id.toString(),
      all_entries: list.allEntries,
      done_entries: list.doneEntries,
      undone_entries: list.undoneEntries,
      entry_stats: {
        total_entries: list.totalEntries,
        current_entry_number: list.currentEntryNumber,
        current_entry_details: list.currentEntryDetails,
      },
    };
  }
  public static toDomain(raw: any) {
    const bookId = new UniqueEntityID(raw.book_id);
    const listOrError = List.create(
      {
        createdOn: raw.created_on,
        listName: raw.list_name,
        allEntries: raw.all_entries,
        doneEntries: raw.done_entries,
        undoneEntries: raw.undone_entries,
        entryStats: EntryStats.create({
          totalEntries: raw.entry_stats.total_entries,
          currentEntryNumber: raw.entry_stats.current_entry_number,
          currentEntryDetails: raw.entry_stats.current_entry_details,
        }).getValue(),
      },
      bookId
    );

    if (listOrError.isFailure) throw listOrError.errorValue();

    if (listOrError.isSuccess) return listOrError.getValue();
  }
  public static toDTO(raw: any) {
    return {
      stats: {
        total: raw.entry_stats.total_entries,
        current: raw.entry_stats.current_entry_number,
      },
      allEntries: raw.all_entries,
      doneEntries: raw.done_entries,
      undoneEntries: raw.undone_entries,
    };
  }
}
