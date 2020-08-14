import mongoose from 'mongoose';

const patientStatusSchema = new mongoose.Schema({
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
        joined_time: {
            type: Date,
            require: false,
        },
    },
});
patientStatusSchema.index({ patient_id: -1 });
const patientStatusModel = mongoose.model('patientStatus', patientStatusSchema);
export { patientStatusModel };
