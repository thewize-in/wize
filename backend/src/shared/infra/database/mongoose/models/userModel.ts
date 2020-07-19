import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        select: false,
    },
    display_name: {
        type: String,
        select: false,
    },
    first_name: {
        type: String,
        select: false,
        default: '',
    },
    last_name: {
        type: String,
        select: false,
        default: '',
    },
    profile_pic: {
        type: String,
        select: false,
    },
    email: {
        type: String,
        select: false,
        required: true,
    },
    is_email_verified: {
        type: Boolean,
        select: false,
        required: true,
    },
    google_id: {
        type: String,
        select: false,
        require: true,
    },
    user_local: {
        type: String,
        select: false,
        required: false,
    },
    user_role: {
        type: Number,
        required: true,
        select: false,
        default: 1,
    },
});

userSchema.index({ email: -1 });
const UserModel = mongoose.model('users', userSchema);
export { UserModel };
