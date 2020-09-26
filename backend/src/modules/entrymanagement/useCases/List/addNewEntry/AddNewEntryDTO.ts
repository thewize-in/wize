export type AddNewEntryDTO = {
  entryDetail: {
    name: string;
    address?: string;
    phone?: number;
    type?: string;
  };
  bookId: string;
};
