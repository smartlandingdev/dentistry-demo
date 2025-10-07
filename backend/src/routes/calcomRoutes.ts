import { Router } from 'express';
import { CalcomController } from '../controllers/calcomController.js';

const router = Router();
const calcomController = new CalcomController();

// GET /api/calcom/status - Verifica status da integração
router.get('/status', (req, res) => calcomController.getStatus(req, res));

// GET /api/calcom/bookings - Busca todos os bookings
router.get('/bookings', (req, res) => calcomController.getBookings(req, res));

// GET /api/calcom/bookings/upcoming - Busca próximos bookings
router.get('/bookings/upcoming', (req, res) => calcomController.getUpcomingBookings(req, res));

// GET /api/calcom/events - Busca eventos formatados para calendário
router.get('/events', (req, res) => calcomController.getCalendarEvents(req, res));

// POST /api/calcom/bookings - Cria novo booking
router.post('/bookings', (req, res) => calcomController.createBooking(req, res));

// DELETE /api/calcom/bookings/:id - Cancela booking
router.delete('/bookings/:id', (req, res) => calcomController.cancelBooking(req, res));

export default router;
