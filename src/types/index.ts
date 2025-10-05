export interface AppointmentEvent {
  id: string;
  title: string;
  start: Date | string;
  end: Date | string;
  customerName: string;
  service: string;
  notes?: string;
  backgroundColor?: string;
  borderColor?: string;
  calComId?: string; // ID do evento no Cal.com para sincronização
  source?: 'local' | 'calcom'; // Origem do evento
  synced?: boolean; // Status de sincronização
}

export interface EventFormData {
  customerName: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  notes: string;
}

// ===== Tipos para integração Cal.com =====

export interface CalComConfig {
  apiKey: string;
  apiUrl?: string; // URL da API do Cal.com (padrão: https://api.cal.com/v1)
  eventTypeId?: string; // ID do tipo de evento padrão
  teamId?: string; // ID do time (opcional)
}

export interface CalComBooking {
  id: number;
  uid: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  attendees: CalComAttendee[];
  location?: string;
  status: 'accepted' | 'pending' | 'cancelled';
  metadata?: Record<string, any>;
  eventType: {
    id: number;
    title: string;
    slug: string;
    length: number;
  };
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

export interface CalComAttendee {
  email: string;
  name: string;
  timeZone?: string;
  locale?: string;
}

export interface CalComEventType {
  id: number;
  title: string;
  slug: string;
  length: number;
  description?: string;
  hidden: boolean;
  position: number;
  userId?: number;
  teamId?: number;
}

export interface CalComAvailability {
  id: number;
  userId?: number;
  eventTypeId?: number;
  days: number[];
  startTime: string;
  endTime: string;
  date?: string;
}

// Tipos para requisições de criação/atualização
export interface CreateCalComBookingRequest {
  eventTypeId: number;
  start: string; // ISO 8601 format
  end?: string;
  attendee: {
    email: string;
    name: string;
    timeZone?: string;
  };
  metadata?: Record<string, any>;
  location?: string;
  title?: string;
  description?: string;
}

export interface UpdateCalComBookingRequest {
  startTime?: string;
  endTime?: string;
  title?: string;
  description?: string;
  status?: 'accepted' | 'pending' | 'cancelled';
}

// Tipos para respostas da API
export interface CalComApiResponse<T> {
  booking?: T;
  bookings?: T[];
  eventType?: CalComEventType;
  eventTypes?: CalComEventType[];
  message?: string;
  error?: string;
}

// Tipo para sincronização
export interface SyncStatus {
  lastSync: Date;
  syncing: boolean;
  error?: string;
  totalEvents: number;
  syncedEvents: number;
}