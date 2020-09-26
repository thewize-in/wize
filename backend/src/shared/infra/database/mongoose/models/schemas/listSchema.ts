import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  created_on: {
    type: String,
    required: true,
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
  entry_stats: {
    current_entry_number: {
      type: Number,
      default: 0,
    },
    total_entries: {
      type: Number,
      default: 0,
    },
    current_entry_details: {
      name: {
        type: String,
      },
      address: {
        type: String,
      },
      phone: {
        type: String,
      },
      number: {
        type: Number,
      },
      id: {
        type: String,
      },
      type: {
        type: String,
      },
    },
  },
});

listSchema.index({ book_id: -1 });
export { listSchema };
