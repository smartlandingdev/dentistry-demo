import { Router } from "express";
import { AppointmentController } from "../controllers/appointmentController.js";

const router = Router();
const appointmentController = new AppointmentController();

// GET /api/appointments - Busca todos os agendamentos
router.get("/", (req, res) => appointmentController.getAllAppointments(req, res));

// GET /api/appointments/upcoming - Busca próximos agendamentos
router.get("/upcoming", (req, res) => appointmentController.getUpcomingAppointments(req, res));

export default router;
