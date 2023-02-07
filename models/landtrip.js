import mongoose from 'mongoose';

const landTripSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'Land Trip',
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    cities: [{
        type: String,
        required: true
    }],
    hotels: [{
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    }]
});

const LandTrip = mongoose.model('LandTrip', landTripSchema);

export default LandTrip;
