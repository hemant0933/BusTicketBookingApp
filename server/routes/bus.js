import express from 'express';
import { createNewTicket, getAvailableBuses, getBusDetails } from '../controllers/bus.js';

const router = express.Router();

// Get bus data based on searched parameter
router.get('/search_buses', getAvailableBuses);
router.get('/:busId', getBusDetails)
router.post('/create-ticket',createNewTicket);

export default router;