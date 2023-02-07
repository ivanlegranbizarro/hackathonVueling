import {check, validationResult} from "express-validator";


const useValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

const landTripValidator = [
    check('tripName').isString().withMessage('Trip Name must be a string'),
    check('tripName').not().isEmpty().withMessage('Trip Name is required'),
    check('tripName').isLength({min: 3}).withMessage('Trip Name must be at least 3 characters long'),
    check('duration').not().isEmpty().withMessage('Duration is required').isInt({min: 1}).withMessage('Duration must be indicate in number of days'),
    check('cities').not().isEmpty().withMessage('Cities are required').isArray().withMessage('Cities must be an array'),
    check('hotels').not().isEmpty().withMessage('Hotels are required').isArray().withMessage('Hotels must be an array'),
    check('hotels.*.name').not().isEmpty().withMessage('Hotel name is required'),
    check('hotels.*.category').not().isEmpty().withMessage('Hotel category is required'),

    useValidation
]

const airTripValidation = [
    check('tripName').isString().withMessage('Trip Name must be a string'),
    check('tripName').not().isEmpty().withMessage('Trip Name is required'),
    check('tripName').isLength({min: 3}).withMessage('Trip Name must be at least 3 characters long'),
    check('duration').isNumeric().withMessage('Duration must be a number'),
    check('duration').not().isEmpty().withMessage('Duration is required'),
    check('cities').isArray({min: 1}).withMessage('Cities must be an array with at least one element'),
    check('cities.*').isString().withMessage('Cities must be a string'),
    check('flights').isArray({min: 1}).withMessage('Flights must be an array with at least one element'),
    check('flights.*.departureCity').isString().withMessage('Departure City must be a string'),
    check('flights.*.departureTime').isString().withMessage('Departure Time must be a string')
];


export {useValidation, airTripValidation, landTripValidator};
