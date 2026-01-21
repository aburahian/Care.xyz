import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Baby Care', 'Elderly Care', 'Sick Care', 'Housekeeping'], // Exactly matching frontend options
    },
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

// In some environments, the model might need to be re-compiled if schema changes
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Service;
}

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
