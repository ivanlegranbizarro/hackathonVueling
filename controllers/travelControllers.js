import Airtrip from "../models/airtrip.js";
import Landtrip from "../models/landtrip.js";
import cities from "../helpers/translator.js";

const TravelControllers = {
    async getAirtrip(req, res) {
        const {search} = req.query;
        if (search.length < 3) {
            return res.status(400).json({message: 'Search must have at least 3 characters'});
        }
        const airtrip = await Airtrip.find({
            $or: [
                {tripName: {$regex: search, $options: 'i'}},
                {cities: {$regex: search, $options: 'i'}},
                {'flights.departureCity': {$regex: search, $options: 'i'}}
            ]
        });
        if (airtrip.length === 0) {
            return res.status(404).json({message: 'No trip found'});
        }
        if (airtrip) {
            airtrip.forEach((trip) => {
                    trip.cities.forEach((city, index) => {
                        if (cities[city]) {
                            trip.cities[index] = cities[city];
                        }
                    });
                    trip.flights.forEach((flight, index) => {
                        if (cities[flight.departureCity]) {
                            trip.flights[index].departureCity = cities[flight.departureCity];
                        }
                    });
                }
            );
            const results = airtrip.map((trip) => {
                let tripName = trip.tripName;
                let type = trip.type;
                let duration = `${trip.duration} days`;
                let flight = trip.flights[0];
                let departureCity = flight.departureCity;
                let departureTime = flight.departureTime;
                let flight2 = trip.flights[1];
                let arrivalCity = flight2.departureCity;
                let arrivalTime = flight2.departureTime;


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
            landtrip.forEach((trip) => {
                    trip.cities.forEach((city, index) => {
                        if (cities[city]) {
                            trip.cities[index] = cities[city];
                        }
                    });
                    trip.hotels.forEach((hotel, index) => {
                        if (cities[hotel.name]) {
                            trip.hotels[index].name = cities[hotel.name];
                        }
                    });
                }
            );
            const results = landtrip.map((trip) => {
                    let tripName = trip.tripName;
                    let type = trip.type;
                    let duration = `${trip.duration} days`;
                    let hotel = trip.hotels[0];
                    let hotelName = hotel.name;
                    let hotelCategory = hotel.category;
                    let hotelStars = hotel.stars;

                    return `${tripName}; ${type}; ${duration}; ${hotelName}; ${hotelStars} stars; ${hotelCategory}`;
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