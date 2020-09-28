import { Mapper } from '../../../../shared/infra/Mapper';
import { List } from '../../domain/list';

export class ArchiveListMap implements Mapper<List> {
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
  public static archivedListMetadataToDTO(raw: any[]) {
    return raw;
  }
  public static archivedListToDTO(raw: any) {
    return {
      allEntries: raw.all_entries,
      doneEntries: raw.done_entries,
      undoneEntries: raw.undone_entries,
    };
  }
}
