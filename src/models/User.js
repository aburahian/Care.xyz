import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    nid: {
        type: String,
        required: [true, 'Please provide an NID'],
    },
    contact: {
        type: String,
        required: [true, 'Please provide a contact number'],
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'staff'],
        default: 'user',
    },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Force refresh model in development to pick up schema changes immediately
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.User;
}

export default mongoose.models.User || mongoose.model('User', UserSchema);
