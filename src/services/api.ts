import { supabase } from "../lib/supabaseClient";

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface Client {
  id: number;
  nomewpp: string;
  telefone: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  // Computed fields for UI
  lastVisit?: string;
  nextAppointment?: string;
  totalVisits?: number;
}

export interface ClientInput {
  nomewpp: string;
  telefone: string;
  email: string;
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

  // ===== CLIENTS (Supabase) =====
  async getClients(): Promise<ApiResponse<Client[]>> {
    try {
      const { data, error } = await supabase
        .from('dados_cliente')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data || [],
      };
    } catch (error) {
      console.error('Error fetching clients:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar clientes',
      };
    }
  }

  async getClient(id: number): Promise<ApiResponse<Client>> {
    try {
      const { data, error } = await supabase
        .from('dados_cliente')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Error fetching client:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao buscar cliente',
      };
    }
  }

  async createClient(clientData: ClientInput): Promise<ApiResponse<Client>> {
    try {
      // Validate required fields
      if (!clientData.email || !clientData.telefone) {
        throw new Error('Email e telefone são obrigatórios');
      }

      // Add created_at timestamp
      const clientDataWithTimestamp = {
        ...clientData,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('dados_cliente')
        .insert([clientDataWithTimestamp])
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data,
        message: 'Cliente criado com sucesso',
      };
    } catch (error) {
      console.error('Error creating client:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao criar cliente',
      };
    }
  }

  async updateClient(id: number, clientData: Partial<ClientInput>): Promise<ApiResponse<Client>> {
    try {
      // Validate required fields if they are being updated
      if (clientData.email !== undefined && !clientData.email) {
        throw new Error('Email é obrigatório');
      }
      if (clientData.telefone !== undefined && !clientData.telefone) {
        throw new Error('Telefone é obrigatório');
      }

      const { data, error } = await supabase
        .from('dados_cliente')
        .update(clientData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        data,
        message: 'Cliente atualizado com sucesso',
      };
    } catch (error) {
      console.error('Error updating client:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar cliente',
      };
    }
  }

  async deleteClient(id: number): Promise<ApiResponse<void>> {
    try {
      const { error } = await supabase
        .from('dados_cliente')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return {
        success: true,
        message: 'Cliente excluído com sucesso',
      };
    } catch (error) {
      console.error('Error deleting client:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao excluir cliente',
      };
    }
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
