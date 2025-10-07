import { Request, Response } from 'express';
import { CalcomService } from '../services/calcomService.js';

const calcomService = new CalcomService();

export class CalcomController {
  /**
   * GET /api/calcom/bookings - Busca todos os bookings
   */
  async getBookings(req: Request, res: Response): Promise<void> {
    try {
      if (!calcomService.isConfigured()) {
        res.status(503).json({
          success: false,
          message: 'Cal.com integration not configured. Please add CALCOM_API_KEY to your .env file.',
        });
        return;
      }

      const { status, userId, eventTypeId, afterStart, beforeEnd } = req.query;

      const bookings = await calcomService.getBookings({
        status: status as string,
        userId: userId ? parseInt(userId as string) : undefined,
        eventTypeId: eventTypeId ? parseInt(eventTypeId as string) : undefined,
        afterStart: afterStart as string,
        beforeEnd: beforeEnd as string,
      });

      res.json({
        success: true,
        data: bookings,
      });
    } catch (error) {
      console.error('Error fetching Cal.com bookings:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching Cal.com bookings',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * GET /api/calcom/bookings/upcoming - Busca próximos bookings
   */
  async getUpcomingBookings(_req: Request, res: Response): Promise<void> {
    try {
      if (!calcomService.isConfigured()) {
        res.status(503).json({
          success: false,
          message: 'Cal.com integration not configured. Please add CALCOM_API_KEY to your .env file.',
        });
        return;
      }

      const bookings = await calcomService.getUpcomingBookings();

      res.json({
        success: true,
        data: bookings,
      });
    } catch (error) {
      console.error('Error fetching upcoming Cal.com bookings:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching upcoming Cal.com bookings',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * GET /api/calcom/events - Busca eventos formatados para o calendário
   */
  async getCalendarEvents(req: Request, res: Response): Promise<void> {
    try {
      if (!calcomService.isConfigured()) {
        res.status(503).json({
          success: false,
          message: 'Cal.com integration not configured. Please add CALCOM_API_KEY to your .env file.',
        });
        return;
      }

      const { afterStart, beforeEnd } = req.query;

      const events = await calcomService.getCalendarEvents({
        afterStart: afterStart as string,
        beforeEnd: beforeEnd as string,
      });

      res.json({
        success: true,
        data: events,
      });
    } catch (error) {
      console.error('Error fetching Cal.com calendar events:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching Cal.com calendar events',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * POST /api/calcom/bookings - Cria um novo booking
   */
  async createBooking(req: Request, res: Response): Promise<void> {
    try {
      if (!calcomService.isConfigured()) {
        res.status(503).json({
          success: false,
          message: 'Cal.com integration not configured. Please add CALCOM_API_KEY to your .env file.',
        });
        return;
      }

      const { eventTypeId, start, attendee, metadata } = req.body;

      // Validação básica
      if (!eventTypeId || !start || !attendee?.name || !attendee?.email) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: eventTypeId, start, attendee.name, attendee.email',
        });
        return;
      }

      const booking = await calcomService.createBooking({
        eventTypeId,
        start,
        attendee,
        metadata,
      });

      res.status(201).json({
        success: true,
        data: booking,
      });
    } catch (error) {
      console.error('Error creating Cal.com booking:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating Cal.com booking',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * DELETE /api/calcom/bookings/:id - Cancela um booking
   */
  async cancelBooking(req: Request, res: Response): Promise<void> {
    try {
      if (!calcomService.isConfigured()) {
        res.status(503).json({
          success: false,
          message: 'Cal.com integration not configured. Please add CALCOM_API_KEY to your .env file.',
        });
        return;
      }

      const bookingId = parseInt(req.params.id);
      const { reason } = req.body;

      if (isNaN(bookingId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid booking ID',
        });
        return;
      }

      await calcomService.cancelBooking(bookingId, reason);

      res.json({
        success: true,
        message: 'Booking cancelled successfully',
      });
    } catch (error) {
      console.error('Error cancelling Cal.com booking:', error);
      res.status(500).json({
        success: false,
        message: 'Error cancelling Cal.com booking',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * GET /api/calcom/status - Verifica se a integração está configurada
   */
  async getStatus(_req: Request, res: Response): Promise<void> {
    const isConfigured = calcomService.isConfigured();

    res.json({
      success: true,
      data: {
        configured: isConfigured,
        message: isConfigured
          ? 'Cal.com integration is configured and ready'
          : 'Cal.com integration not configured. Please add CALCOM_API_KEY to your .env file.',
      },
    });
  }
}
