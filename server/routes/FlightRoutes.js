import express from 'express';
const router = express.Router();
import { getAirlines, getDestinations, getAllFlights } from '../controllers/FlightController.js';

// Ucus ile ilgili rotalar
router.get("/destinations", getDestinations);
router.get("/airlines", getAirlines);
router.get("/search", getAllFlights);

export default router;
