export interface CalcomBooking {
  id: number;
  uid: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  attendees: Array<{
    name: string;
    email: string;
    timeZone: string;
  }>;
  status: "ACCEPTED" | "PENDING" | "CANCELLED";
  eventTypeId: number;
}

export interface CalcomEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  customerName: string;
  customerEmail: string;
  status: string;
  backgroundColor?: string;
  borderColor?: string;
}

export class CalcomService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.CALCOM_API_KEY || "";
    this.apiUrl = process.env.CALCOM_API_URL || "https://api.cal.com/v2";
  }

  private async makeRequest<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    if (!this.apiKey) {
      throw new Error("Cal.com API key not configured");
    }

    const url = `${this.apiUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData: any = await response.json().catch(() => ({}));
      throw new Error(
        `Cal.com API error: ${response.status} - ${
          errorData.message || response.statusText
        }`
      );
    }

    return response.json() as Promise<T>;
  }

  /**
   * Busca todos os bookings do Cal.com
   */
  async getBookings(params?: {
    status?: string;
    userId?: number;
    eventTypeId?: number;
    afterStart?: string;
    beforeEnd?: string;
  }): Promise<CalcomBooking[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.status) queryParams.append("status", params.status);
      if (params?.userId)
        queryParams.append("userId", params.userId.toString());
      if (params?.eventTypeId)
        queryParams.append("eventTypeId", params.eventTypeId.toString());
      if (params?.afterStart)
        queryParams.append("afterStart", params.afterStart);
      if (params?.beforeEnd) queryParams.append("beforeEnd", params.beforeEnd);

      const endpoint = `/bookings?${queryParams.toString()}`;
      const response = await this.makeRequest<{ bookings: CalcomBooking[] }>(
        endpoint
      );

      return response.bookings || [];
    } catch (error) {
      console.error("Error fetching Cal.com bookings:", error);
      throw error;
    }
  }

  /**
   * Busca próximos bookings (futuros e não cancelados)
   */
  async getUpcomingBookings(): Promise<CalcomBooking[]> {
    try {
      const now = new Date().toISOString();
      return await this.getBookings({
        afterStart: now,
        status: "ACCEPTED",
      });
    } catch (error) {
      console.error("Error fetching upcoming Cal.com bookings:", error);
      throw error;
    }
  }

  /**
   * Converte bookings do Cal.com para formato do calendário
   */
  convertBookingsToEvents(bookings: CalcomBooking[]): CalcomEvent[] {
    return bookings.map((booking) => ({
      id: booking.uid,
      title: booking.title || "Agendamento Cal.com",
      start: booking.startTime,
      end: booking.endTime,
      customerName: booking.attendees[0]?.name || "Cliente",
      customerEmail: booking.attendees[0]?.email || "",
      status: booking.status,
      backgroundColor: booking.status === "ACCEPTED" ? "#10b981" : "#f59e0b",
      borderColor: booking.status === "ACCEPTED" ? "#059669" : "#d97706",
    }));
  }

  /**
   * Busca eventos formatados para o calendário
   */
  async getCalendarEvents(params?: {
    afterStart?: string;
    beforeEnd?: string;
  }): Promise<CalcomEvent[]> {
    try {
      const bookings = await this.getBookings({
        afterStart: params?.afterStart,
        beforeEnd: params?.beforeEnd,
      });

      return this.convertBookingsToEvents(bookings);
    } catch (error) {
      console.error("Error fetching calendar events from Cal.com:", error);
      throw error;
    }
  }

  /**
   * Cria um novo booking no Cal.com
   */
  async createBooking(data: {
    eventTypeId: number;
    start: string;
    attendee: {
      name: string;
      email: string;
      timeZone?: string;
    };
    metadata?: Record<string, any>;
  }): Promise<CalcomBooking> {
    try {
      const response = await this.makeRequest<{ booking: CalcomBooking }>(
        "/bookings",
        {
          method: "POST",
          body: JSON.stringify({
            eventTypeId: data.eventTypeId,
            start: data.start,
            responses: {
              name: data.attendee.name,
              email: data.attendee.email,
            },
            timeZone: data.attendee.timeZone || "America/Sao_Paulo",
            metadata: data.metadata,
          }),
        }
      );

      return response.booking;
    } catch (error) {
      console.error("Error creating Cal.com booking:", error);
      throw error;
    }
  }

  /**
   * Cancela um booking
   */
  async cancelBooking(bookingId: number, reason?: string): Promise<void> {
    try {
      await this.makeRequest(`/bookings/${bookingId}/cancel`, {
        method: "DELETE",
        body: JSON.stringify({ reason }),
      });
    } catch (error) {
      console.error("Error cancelling Cal.com booking:", error);
      throw error;
    }
  }

  /**
   * Verifica se a API está configurada
   */
  isConfigured(): boolean {
    return !!this.apiKey && !!this.apiUrl;
  }
}
