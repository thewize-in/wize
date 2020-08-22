import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    doctor_id: {
        type: String,
        require: true,
    },
    status: {
        active: {
            type: Boolean,
            required: true,
        },
        resume: {
            type: Boolean,
            require: true,
        },
    },
});
doctorSchema.index({ doctor_id: -1 });
export { doctorSchema };
