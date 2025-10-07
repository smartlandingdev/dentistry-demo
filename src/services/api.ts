const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  lastVisit?: string;
  nextAppointment?: string;
  totalVisits: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
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
  status: 'ACCEPTED' | 'PENDING' | 'CANCELLED';
  eventTypeId: number;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  // ===== CLIENTS =====
  async getClients(): Promise<ApiResponse<Client[]>> {
    return this.request<Client[]>('/clients');
  }

  // ===== CAL.COM =====
  async getCalcomStatus(): Promise<ApiResponse<{ configured: boolean; message: string }>> {
    return this.request('/calcom/status');
  }

  async getCalcomEvents(params?: {
    afterStart?: string;
    beforeEnd?: string;
  }): Promise<ApiResponse<CalcomEvent[]>> {
    const queryParams = new URLSearchParams();
    if (params?.afterStart) queryParams.append('afterStart', params.afterStart);
    if (params?.beforeEnd) queryParams.append('beforeEnd', params.beforeEnd);

    const endpoint = `/calcom/events${queryParams.toString() ? `?${queryParams}` : ''}`;
    return this.request<CalcomEvent[]>(endpoint);
  }

  async getCalcomBookings(): Promise<ApiResponse<CalcomBooking[]>> {
    return this.request<CalcomBooking[]>('/calcom/bookings');
  }

  async getUpcomingCalcomBookings(): Promise<ApiResponse<CalcomBooking[]>> {
    return this.request<CalcomBooking[]>('/calcom/bookings/upcoming');
  }

  async createCalcomBooking(data: {
    eventTypeId: number;
    start: string;
    attendee: {
      name: string;
      email: string;
      timeZone?: string;
    };
    metadata?: Record<string, any>;
  }): Promise<ApiResponse<CalcomBooking>> {
    return this.request<CalcomBooking>('/calcom/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async cancelCalcomBooking(bookingId: number, reason?: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/calcom/bookings/${bookingId}`, {
      method: 'DELETE',
      body: JSON.stringify({ reason }),
    });
  }
}

export const apiService = new ApiService();
