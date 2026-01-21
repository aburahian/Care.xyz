import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    userId: {
        type: String, // String to handle both Mongo IDs and NextAuth IDs
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    serviceId: {
        type: String, // String to handle service names or IDs
        required: true,
    },
    duration: {
        type: Number, // days or hours
        required: true,
    },
    location: {
        division: String,
        district: String,
        city: String,
        area: String,
        address: String,
    },
    totalCost: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid'],
        default: 'unpaid',
    },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
