import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    doctor_id: {
        type: String,
        required: true,
    },
    doctor_name: {
        type: String,
        select: true,
    },
    phone: {
        type: String,
        select: false,
    },
    address: {
        type: String,
        select: false,
    },
});

doctorSchema.index({ doctor_id: -1 });
const doctorModel = mongoose.model('doctor', doctorSchema);
export { doctorModel };
