import mongoose from 'mongoose';

const doctorStatusSchema = new mongoose.Schema({
    doctor_id: {
        type: String,
        require: true,
    },
    status: {
        active: {
            type: Boolean,
            required: true,
        },
        pause: {
            type: Boolean,
            require: true,
        },
    },
});
doctorStatusSchema.index({ doctor_id: -1 });
const doctorStatusModel = mongoose.model('doctorStatus', doctorStatusSchema);
export { doctorStatusModel };
