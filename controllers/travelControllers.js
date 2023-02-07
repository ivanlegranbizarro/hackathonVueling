import Airtrip from "../models/airtrip.js";
import Landtrip from "../models/landtrip.js";
import translateCities from "../helpers/translator.js";


const TravelControllers = {
    async getAirtrip(req, res) {
        const {search} = req.query;
        if (search.length < 3) {
            return res.status(400).json({message: 'Search must have at least 3 characters'});
        }
        const airtrip = await Airtrip.find({
            $or: [
                {tripName: {$regex: `.*${search}.*`, $options: 'i'}},
                {cities: {$regex: `.*${search}.*`, $options: 'i'}},
                {'flights.departureCity': {$regex: `.*${search}.*`, $options: 'i'}}
            ]
        });
        if (airtrip.length === 0) {
            return res.status(404).json({message: 'No trip found'});
        }
        if (airtrip) {
            const results = airtrip.map((trip) => {
                const tripName = trip.tripName;
                const type = trip.type;
                const duration = `${trip.duration} days`;
                const flight = trip.flights[0];
                let departureCity = flight.departureCity;
                const departureTime = flight.departureTime;
                const flight2 = trip.flights[1];
                let arrivalCity = flight2.departureCity;
                const arrivalTime = flight2.departureTime;

                if (departureCity in translateCities) {
                    departureCity = translateCities[departureCity];
                }

                if (arrivalCity in translateCities) {
                    arrivalCity = translateCities[arrivalCity];
                }

                return `${tripName}; ${type}; ${duration}; ${departureCity}; ${departureTime} - ${arrivalCity}; ${arrivalTime}`;
            });

            return res.status(200).json({results});
        }

    },
    async getLandtrip(req, res) {
        const {search} = req.query;
        if (search.length < 3) {
            return res.status(400).json({message: 'Search must have at least 3 characters'});
        }
        const landtrip = await Landtrip.find({
            $or: [
                {tripName: {$regex: search, $options: 'i'}},
                {cities: {$regex: search, $options: 'i'}},
                {'hotels.name': {$regex: search, $options: 'i'}}
            ]
        });
        if (landtrip.length === 0) {
            return res.status(404).json({message: 'No trip found'});
        }
        if (landtrip) {
            const results = landtrip.map((trip) => {
                    const tripName = trip.tripName;
                    const type = trip.type;
                    const duration = `${trip.duration} days`;
                    let cities = trip.cities;
                    const hotel = trip.hotels[0];
                    const hotelName = hotel.name;
                    const hotelCategory = hotel.category;
                    const hotelStars = hotel.stars;

                    if (cities in translateCities) {
                        cities = translateCities[cities];
                    }

                    return `${tripName}; ${type}; ${duration}; ${hotelName}; ${hotelStars} stars; ${hotelCategory} category; ${cities}`
                }
            );

            return res.status(200).json({results});
        }
    },
    async updateAirtrip(req, res) {
        const {id} = req.params;
        const {tripName, duration, cities, flights} = req.body;
        const airtrip = await Airtrip.findByIdAndUpdate(id, {
            tripName,
            duration,
            cities,
            flights
        }, {new: true});
        if (airtrip) {
            return res.status(200).json(airtrip);
        }
        return res.status(404).json({message: 'Trip not found'});
    },
    async updateLandtrip(req, res) {
        const {id} = req.params;
        const {tripName, duration, cities, hotels} = req.body;
        const landtrip = await Landtrip.findByIdAndUpdate(id, {
            tripName,
            duration,
            cities,
            hotels
        }, {new: true});
        if (landtrip) {
            return res.status(200).json(landtrip);
        }
        return res.status(404).json({message: 'Trip not found'});
    },
    async deleteAirtrip(req, res) {
        const {id} = req.params;
        const airtrip = await Airtrip.findByIdAndDelete(id);
        if (airtrip) {
            return res.status(200).json({message: 'Trip deleted'});
        }
        return res.status(404).json({message: 'Trip not found'});
    },
    async deleteLandtrip(req, res) {
        const {id} = req.params;
        const landtrip = await Landtrip.findByIdAndDelete(id);
        if (landtrip) {
            return res.status(200).json({message: 'Trip deleted'});
        }
        return res.status(404).json({message: 'Trip not found'});
    },
    async createAirtrip(req, res) {
        const {tripName, duration, cities, flights} = req.body;
        const airtrip = await Airtrip.create({
            tripName,
            duration,
            cities,
            flights
        });
        if (airtrip) {
            return res.status(201).json(airtrip);
        }
        return res.status(400).json({message: 'Error creating trip'});
    },
    async createLandtrip(req, res) {
        const {tripName, duration, cities, hotels} = req.body;
        const landtrip = await Landtrip.create({
            tripName,
            duration,
            cities,
            hotels
        });
        if (landtrip) {
            return res.status(201).json(landtrip);
        }
        return res.status(400).json({message: 'Error creating trip'});
    }
}

export default TravelControllers;