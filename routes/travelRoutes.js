import express from "express";
import TravelControllers from "../controllers/travelControllers.js";
import {airTripValidation, landTripValidator} from "../validators/travelValidators.js";


const router = express.Router();

router.get("/airtrip", TravelControllers.getAirtrip);
router.get("/landtrip", TravelControllers.getLandtrip);

router.put("/airtrip/:id", TravelControllers.updateAirtrip);
router.put("/landtrip/:id", TravelControllers.updateLandtrip);

router.delete("/airtrip/:id", TravelControllers.deleteAirtrip);
router.delete("/landtrip/:id", TravelControllers.deleteLandtrip);

router.post("/airtrip", airTripValidation, TravelControllers.createAirtrip);
router.post("/landtrip", landTripValidator, TravelControllers.createLandtrip);

export default router;