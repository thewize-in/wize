import mongoose from 'mongoose';

const patienEntryBooktSchema = new mongoose.Schema({
    book_id: {
        type: String,
        required: true,
    },
    patient_list: {
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
            id: {
                type: String,
            },
            tag: {
                type: String,
            },
        },
    },
});

patienEntryBooktSchema.index({ book_id: -1 });
export { patienEntryBooktSchema };
