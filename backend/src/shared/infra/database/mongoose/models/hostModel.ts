import mongoose from "mongoose";

const hostSchema = new mongoose.Schema({
    host_id: {
        type: String,
    },
    host_name: {
        type: String,
        select: true
    },
    phone: {
        type: String,
        select: false
    },
    host_avatar: {
        type: String,
        select: true
    },
    host_email: {
        type: String(),
        select: false
    },
    is_email_verified: {
        type: Boolean,
        select: false
    },
    google_id: {
        type: String,
        select: false
    },
    host_local: {
        type: String,
        select: false
    }
});

hostSchema.index({ host_name: -1 });
const Host = mongoose.model("user", hostSchema);
export { Host };
