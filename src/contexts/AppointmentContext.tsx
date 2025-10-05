import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AppointmentEvent, SyncStatus } from '../types';
import { calComService } from '../services/calcom.service';

interface AppointmentContextType {
  // Modal state
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;

  // Events management
  events: AppointmentEvent[];
  addEvent: (event: AppointmentEvent) => void;
  updateEvent: (eventId: string, updates: Partial<AppointmentEvent>) => void;
  deleteEvent: (eventId: string) => void;
  getEventById: (eventId: string) => AppointmentEvent | undefined;

  // Cal.com integration
  isCalComEnabled: boolean;
  syncStatus: SyncStatus | null;
  syncWithCalCom: () => Promise<void>;
  createCalComBooking: (event: AppointmentEvent, attendeeEmail: string) => Promise<void>;

  // Loading and error states
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<AppointmentEvent[]>([]);
  const [isCalComEnabled, setIsCalComEnabled] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializa Cal.com service ao montar
  useEffect(() => {
    const initialized = calComService.initializeFromEnv();
    setIsCalComEnabled(initialized);

    if (initialized) {
      // Sincroniza automaticamente ao iniciar
      syncWithCalCom();
    } else {
      // Se Cal.com não está configurado, carrega eventos de exemplo
      loadSampleEvents();
    }
  }, []);

  // Modal functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Events management
  const addEvent = useCallback((event: AppointmentEvent) => {
    setEvents((prev) => [...prev, event]);
  }, []);

  const updateEvent = useCallback((eventId: string, updates: Partial<AppointmentEvent>) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, ...updates } : event))
    );
  }, []);

  const deleteEvent = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  }, []);

  const getEventById = useCallback(
    (eventId: string) => {
      return events.find((event) => event.id === eventId);
    },
    [events]
  );

  // Cal.com integration
  const syncWithCalCom = useCallback(async () => {
    if (!isCalComEnabled) {
      console.log('Cal.com não está configurado');
      return;
    }

    setIsLoading(true);
    setSyncStatus({
      lastSync: new Date(),
      syncing: true,
      totalEvents: 0,
      syncedEvents: 0,
    });

    try {
      // Busca eventos dos próximos 90 dias
      const now = new Date();
      const futureDate = new Date();
      futureDate.setDate(now.getDate() + 90);

      const calComEvents = await calComService.syncFromCalCom({
        fromDate: now.toISOString(),
        toDate: futureDate.toISOString(),
      });

      // Mescla eventos do Cal.com com eventos locais
      setEvents((prev) => {
        // Remove eventos antigos do Cal.com
        const localEvents = prev.filter((e) => e.source !== 'calcom');
        // Adiciona eventos novos do Cal.com
        return [...localEvents, ...calComEvents];
      });

      setSyncStatus({
        lastSync: new Date(),
        syncing: false,
        totalEvents: calComEvents.length,
        syncedEvents: calComEvents.length,
      });

      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao sincronizar com Cal.com';
      setError(errorMessage);
      setSyncStatus((prev) => ({
        lastSync: new Date(),
        syncing: false,
        error: errorMessage,
        totalEvents: prev?.totalEvents || 0,
        syncedEvents: 0,
      }));
    } finally {
      setIsLoading(false);
    }
  }, [isCalComEnabled]);

  const createCalComBooking = useCallback(
    async (event: AppointmentEvent, attendeeEmail: string) => {
      if (!isCalComEnabled) {
        throw new Error('Cal.com não está configurado');
      }

      setIsLoading(true);
      setError(null);

      try {
        const bookingRequest = calComService.appointmentEventToCalCom(event, attendeeEmail);
        const booking = await calComService.createBooking(bookingRequest);

        // Atualiza o evento local com informações do Cal.com
        const updatedEvent: AppointmentEvent = {
          ...event,
          calComId: booking.uid,
          source: 'calcom',
          synced: true,
        };

        addEvent(updatedEvent);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao criar booking no Cal.com';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [isCalComEnabled, addEvent]
  );

  // Error handling
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Sample events for testing (when Cal.com is not configured)
  const loadSampleEvents = () => {
    const sampleEvents: AppointmentEvent[] = [
      {
        id: '1',
        title: 'Consulta - João Silva',
        start: new Date(Date.now() + 2 * 60 * 60 * 1000),
        end: new Date(Date.now() + 3 * 60 * 60 * 1000),
        customerName: 'João Silva',
        service: 'Consulta',
        notes: 'Primeira consulta',
        backgroundColor: '#1C1C1C',
        borderColor: '#1C1C1C',
        source: 'local',
      },
      {
        id: '2',
        title: 'Limpeza - Maria Santos',
        start: new Date(Date.now() + 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000),
        end: new Date(Date.now() + 24 * 60 * 60 * 1000 + 15.5 * 60 * 60 * 1000),
        customerName: 'Maria Santos',
        service: 'Limpeza',
        notes: 'Limpeza de rotina',
        backgroundColor: '#A8A29E',
        borderColor: '#A8A29E',
        source: 'local',
      },
    ];

    setEvents(sampleEvents);
  };

  const value: AppointmentContextType = {
    isModalOpen,
    openModal,
    closeModal,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    isCalComEnabled,
    syncStatus,
    syncWithCalCom,
    createCalComBooking,
    isLoading,
    error,
    clearError,
  };

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within AppointmentProvider');
  }
  return context;
};
