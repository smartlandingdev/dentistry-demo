import { Request, Response } from "express";
import { AppointmentService } from "../services/appointmentService.js";

const appointmentService = new AppointmentService();

export class AppointmentController {
  async getAllAppointments(_req: Request, res: Response): Promise<void> {
    try {
      const appointments = await appointmentService.getAllAppointments();
      res.json({
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar agendamentos",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  }

  async getUpcomingAppointments(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const appointments = await appointmentService.getUpcomingAppointments(
        limit
      );
      res.json({
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.error("Erro ao buscar próximos agendamentos:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao buscar próximos agendamentos",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  }
}
