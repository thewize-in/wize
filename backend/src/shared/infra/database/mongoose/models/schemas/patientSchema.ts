import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    patient_id: {
        type: String,
        require: true,
    },
    status: {
        joined: {
            type: Boolean,
            required: true,
        },
        joined_doctor_id: {
            type: String,
            default: '',
            require: true,
        },
    },
    waiting_number: {
        type: Number,
        default: Infinity,
    },
});

patientSchema.index({ patient_id: -1 });
export { patientSchema };
