import mongoose from 'mongoose';

const entryBooktSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date().toISOString(),
  },
  book_id: {
    type: String,
    required: true,
  },
  patient_list: {
    type: Array,
    default: [],
  },
  done_patient_list: {
    type: Array,
    default: [],
  },
  undone_patient_list: {
    type: Array,
    default: [],
  },
  patient_stats: {
    current_patient_number: {
      type: Number,
      default: 0,
    },
    total_patient_number: {
      type: Number,
      default: 0,
    },
    current_patient_details: {
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

entryBooktSchema.index({ book_id: -1 });
export { entryBooktSchema };