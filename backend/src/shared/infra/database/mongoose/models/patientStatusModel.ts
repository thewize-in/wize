import mongoose from 'mongoose';

const patientStatusSchema = new mongoose.Schema({
    patient_id: {
        type: String,
        require: true,
    },
    joined: {
        type: Boolean,
        required: true,
    },
    joined_doctor_id: {
        type: String,
        required: true,
    },
});
patientStatusSchema.index({ patient_id: -1 });
const patientStatusModel = mongoose.model('patientStatus', patientStatusSchema);
export { patientStatusModel };
