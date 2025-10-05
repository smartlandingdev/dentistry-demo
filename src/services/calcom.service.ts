import type {
  CalComConfig,
  CalComBooking,
  CalComEventType,
  CreateCalComBookingRequest,
  UpdateCalComBookingRequest,
  CalComApiResponse,
  AppointmentEvent,
} from '../types';

/**
 * Serviço de integração com Cal.com API
 *
 * Este serviço fornece métodos para interagir com a API do Cal.com,
 * incluindo buscar, criar, atualizar e deletar bookings.
 *
 * SETUP:
 * 1. Configure as variáveis de ambiente no arquivo .env:
 *    - VITE_CALCOM_API_KEY: Sua API key do Cal.com
 *    - VITE_CALCOM_API_URL: URL da API (padrão: https://api.cal.com/v1)
 *    - VITE_CALCOM_EVENT_TYPE_ID: ID do tipo de evento padrão
 *
 * 2. Obtenha sua API key em: https://app.cal.com/settings/developer
 */

class CalComService {
  private config: CalComConfig | null = null;
  private baseUrl: string = 'https://api.cal.com/v1';

  /**
   * Inicializa o serviço com a configuração
   */
  initialize(config: CalComConfig) {
    this.config = config;
    if (config.apiUrl) {
      this.baseUrl = config.apiUrl;
    }
  }

  /**
   * Inicializa o serviço a partir das variáveis de ambiente
   */
  initializeFromEnv() {
    const apiKey = import.meta.env.VITE_CALCOM_API_KEY;
    const apiUrl = import.meta.env.VITE_CALCOM_API_URL;
    const eventTypeId = import.meta.env.VITE_CALCOM_EVENT_TYPE_ID;
    const teamId = import.meta.env.VITE_CALCOM_TEAM_ID;

    if (!apiKey) {
      console.warn('Cal.com API key não configurada. Defina VITE_CALCOM_API_KEY no arquivo .env');
      return false;
    }

    this.initialize({
      apiKey,
      apiUrl,
      eventTypeId,
      teamId,
    });

    return true;
  }

  /**
   * Verifica se o serviço está configurado
   */
  isConfigured(): boolean {
    return this.config !== null && !!this.config.apiKey;
  }

  /**
   * Headers padrão para requisições
   */
  private getHeaders(): HeadersInit {
    if (!this.config?.apiKey) {
      throw new Error('Cal.com API key não configurada');
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.apiKey}`,
    };
  }

  /**
   * Busca todos os bookings
   */
  async getBookings(filters?: {
    status?: 'accepted' | 'pending' | 'cancelled';
    fromDate?: string;
    toDate?: string;
  }): Promise<CalComBooking[]> {
    if (!this.isConfigured()) {
      throw new Error('Cal.com service não está configurado');
    }

    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.fromDate) params.append('fromDate', filters.fromDate);
    if (filters?.toDate) params.append('toDate', filters.toDate);

    const url = `${this.baseUrl}/bookings?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Erro ao buscar bookings: ${error.message || response.statusText}`);
    }

    const data: CalComApiResponse<CalComBooking> = await response.json();
    return data.bookings || [];
  }

  /**
   * Busca um booking específico pelo ID
   */
  async getBooking(bookingId: number): Promise<CalComBooking> {
    if (!this.isConfigured()) {
      throw new Error('Cal.com service não está configurado');
    }

    const response = await fetch(`${this.baseUrl}/bookings/${bookingId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Erro ao buscar booking: ${error.message || response.statusText}`);
    }

    const data: CalComApiResponse<CalComBooking> = await response.json();
    if (!data.booking) {
      throw new Error('Booking não encontrado');
    }

    return data.booking;
  }

  /**
   * Cria um novo booking no Cal.com
   */
  async createBooking(bookingData: CreateCalComBookingRequest): Promise<CalComBooking> {
    if (!this.isConfigured()) {
      throw new Error('Cal.com service não está configurado');
    }

    const response = await fetch(`${this.baseUrl}/bookings`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Erro ao criar booking: ${error.message || response.statusText}`);
    }

    const data: CalComApiResponse<CalComBooking> = await response.json();
    if (!data.booking) {
      throw new Error('Erro ao criar booking');
    }

    return data.booking;
  }

  /**
   * Atualiza um booking existente
   */
  async updateBooking(
    bookingId: number,
    updates: UpdateCalComBookingRequest
  ): Promise<CalComBooking> {
    if (!this.isConfigured()) {
      throw new Error('Cal.com service não está configurado');
    }

    const response = await fetch(`${this.baseUrl}/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Erro ao atualizar booking: ${error.message || response.statusText}`);
    }

    const data: CalComApiResponse<CalComBooking> = await response.json();
    if (!data.booking) {
      throw new Error('Erro ao atualizar booking');
    }

    return data.booking;
  }

  /**
   * Cancela um booking
   */
  async cancelBooking(bookingId: number, reason?: string): Promise<void> {
    if (!this.isConfigured()) {
      throw new Error('Cal.com service não está configurado');
    }

    const response = await fetch(`${this.baseUrl}/bookings/${bookingId}/cancel`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Erro ao cancelar booking: ${error.message || response.statusText}`);
    }
  }

  /**
   * Busca os tipos de eventos disponíveis
   */
  async getEventTypes(): Promise<CalComEventType[]> {
    if (!this.isConfigured()) {
      throw new Error('Cal.com service não está configurado');
    }

    const response = await fetch(`${this.baseUrl}/event-types`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Erro ao buscar event types: ${error.message || response.statusText}`);
    }

    const data: CalComApiResponse<CalComEventType> = await response.json();
    return data.eventTypes || [];
  }

  // ===== Funções de conversão entre Cal.com e FullCalendar =====

  /**
   * Converte um booking do Cal.com para formato AppointmentEvent do FullCalendar
   */
  calComToAppointmentEvent(booking: CalComBooking): AppointmentEvent {
    const attendee = booking.attendees[0];

    return {
      id: `calcom-${booking.id}`,
      title: booking.title || `${booking.eventType.title} - ${attendee.name}`,
      start: new Date(booking.startTime),
      end: new Date(booking.endTime),
      customerName: attendee.name,
      service: booking.eventType.title,
      notes: booking.description || '',
      backgroundColor: this.getColorByStatus(booking.status),
      borderColor: this.getColorByStatus(booking.status),
      calComId: booking.uid,
      source: 'calcom',
      synced: true,
    };
  }

  /**
   * Converte um AppointmentEvent para formato de criação do Cal.com
   */
  appointmentEventToCalCom(
    event: AppointmentEvent,
    attendeeEmail: string
  ): CreateCalComBookingRequest {
    const eventTypeId = this.config?.eventTypeId
      ? parseInt(this.config.eventTypeId)
      : 0;

    if (!eventTypeId) {
      throw new Error('Event Type ID não configurado');
    }

    return {
      eventTypeId,
      start: typeof event.start === 'string' ? event.start : event.start.toISOString(),
      end: typeof event.end === 'string' ? event.end : event.end.toISOString(),
      attendee: {
        email: attendeeEmail,
        name: event.customerName,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      title: event.title,
      description: event.notes,
      metadata: {
        source: 'fullcalendar',
        service: event.service,
      },
    };
  }

  /**
   * Retorna a cor baseada no status do booking
   */
  private getColorByStatus(status: string): string {
    switch (status) {
      case 'accepted':
        return '#10b981'; // Verde
      case 'pending':
        return '#f59e0b'; // Amarelo
      case 'cancelled':
        return '#ef4444'; // Vermelho
      default:
        return '#1C1C1C'; // Preto (padrão)
    }
  }

  /**
   * Sincroniza todos os bookings do Cal.com para eventos locais
   */
  async syncFromCalCom(filters?: {
    fromDate?: string;
    toDate?: string;
  }): Promise<AppointmentEvent[]> {
    try {
      const bookings = await this.getBookings({
        status: 'accepted',
        ...filters,
      });

      return bookings.map((booking) => this.calComToAppointmentEvent(booking));
    } catch (error) {
      console.error('Erro ao sincronizar do Cal.com:', error);
      throw error;
    }
  }

  /**
   * Webhook handler - processa webhooks do Cal.com
   *
   * Configure o webhook em: https://app.cal.com/settings/developer/webhooks
   * Endpoint: /api/webhooks/calcom
   * Events: booking.created, booking.rescheduled, booking.cancelled
   */
  async handleWebhook(payload: any): Promise<AppointmentEvent | null> {
    const { triggerEvent, payload: data } = payload;

    switch (triggerEvent) {
      case 'BOOKING_CREATED':
      case 'BOOKING_RESCHEDULED':
        return this.calComToAppointmentEvent(data);

      case 'BOOKING_CANCELLED':
        // Retorna o evento com informação de cancelamento
        return {
          ...this.calComToAppointmentEvent(data),
          backgroundColor: '#ef4444',
          borderColor: '#ef4444',
        };

      default:
        console.warn(`Evento de webhook não reconhecido: ${triggerEvent}`);
        return null;
    }
  }
}

// Export singleton instance
export const calComService = new CalComService();
export default calComService;
