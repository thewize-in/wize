import mongoose from 'mongoose';

const archiveListSchema = new mongoose.Schema({
  created_on: {
    type: String,
    required: true,
  },
  list_name: {
    type: String,
  },
  book_id: {
    type: String,
    required: true,
  },
  all_entries: {
    type: Array,
    default: [],
  },
  done_entries: {
    type: Array,
    default: [],
  },
  undone_entries: {
    type: Array,
    default: [],
  },
});

archiveListSchema.index({ book_id: -1 });
export { archiveListSchema };
