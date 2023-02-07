import mongoose from 'mongoose';

const airTripSchema = new mongoose.Schema({
    tripName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'Air Trip',
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
    flights: [{
        departureCity: {
            type: String,
            required: true
        },
        departureTime: {
            type: String,
            required: true
        }
    }]
});

const AirTrip = mongoose.model('AirTrip', airTripSchema);

export default AirTrip;
