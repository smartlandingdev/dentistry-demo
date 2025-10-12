import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import type { AppointmentEvent, EventFormData } from '../types';
import { useAppointment } from '../contexts/AppointmentContext';
import EventModal from './EventModal';
import styles from './Calendar.module.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface SupabaseAppointment {
  id_agendamento: string;
  id_cliente: number;
  clientName: string;
  hora_inicio: string;
  hora_fim: string;
  finalizado: boolean;
  cancelado: boolean;
}

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
  // Usa o context para gerenciar eventos locais
  const {
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
  } = useAppointment();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AppointmentEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  // Supabase appointments
  const [appointments, setAppointments] = useState<SupabaseAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calendarRef = useRef<FullCalendar>(null);

  // Detect screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Fetch appointments from Supabase via backend API
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE_URL}/appointments`);

        if (response.data.success) {
          console.log('📅 Appointments loaded from Supabase:', response.data.data.length);
          setAppointments(response.data.data);
        } else {
          setError('Failed to load appointments');
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Error loading appointments. Make sure backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();

    // Refresh every 2 minutes
    const interval = setInterval(fetchAppointments, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDateSelect = (selectInfo: any) => {
    const selectedStart = new Date(selectInfo.start);
    setSelectedDate(selectedStart.toISOString().split('T')[0]);
    setSelectedTime(selectedStart.toTimeString().slice(0, 5));
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (clickInfo: any) => {
    const event = getEventById(clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

  const handleEventDrop = (dropInfo: any) => {
    const eventId = dropInfo.event.id;
    updateEvent(eventId, {
      start: dropInfo.event.start,
      end: dropInfo.event.end,
    });
  };

  const handleEventResize = (resizeInfo: any) => {
    const eventId = resizeInfo.event.id;
    updateEvent(eventId, {
      start: resizeInfo.event.start,
      end: resizeInfo.event.end,
    });
  };

  const generateEventId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const handleSaveEvent = (eventData: EventFormData) => {
    const startDateTime = new Date(`${eventData.date}T${eventData.startTime}`);
    const endDateTime = new Date(`${eventData.date}T${eventData.endTime}`);

    const eventPayload: AppointmentEvent = {
      id: selectedEvent?.id || generateEventId(),
      title: `${eventData.service} - ${eventData.customerName}`,
      start: startDateTime,
      end: endDateTime,
      customerName: eventData.customerName,
      service: eventData.service,
      notes: eventData.notes,
      backgroundColor: '#1A365D',
      borderColor: '#3B82F6',
      source: 'local',
    };

    if (selectedEvent) {
      // Atualiza evento existente
      updateEvent(selectedEvent.id, eventPayload);
    } else {
      // Adiciona novo evento
      addEvent(eventPayload);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setIsModalOpen(false);
    }
  };

  const businessHours = {
    daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Saturday
    startTime: '08:00',
    endTime: '20:00',
  };

  // Convert Supabase appointments to FullCalendar events
  const calendarEvents = appointments.map(apt => ({
    id: `appointment-${apt.id_agendamento}`,
    title: apt.clientName,
    start: apt.hora_inicio,
    end: apt.hora_fim,
    backgroundColor: apt.finalizado ? '#10b981' : '#1A365D',
    borderColor: apt.finalizado ? '#059669' : '#3B82F6',
    extendedProps: {
      appointmentId: apt.id_agendamento,
      clientId: apt.id_cliente,
      clientName: apt.clientName,
      finalizado: apt.finalizado,
      source: 'supabase'
    }
  }));

  return (
    <div className={`bg-white rounded-3xl border border-gray-100 shadow-lg p-6 overflow-hidden ${styles['calendar-container']}`}>
      {/* Appointments Status */}
      <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
          <div
            className={`w-3 h-3 rounded-full ${
              loading
                ? 'bg-yellow-500 animate-pulse'
                : error
                ? 'bg-red-500'
                : 'bg-green-500'
            }`}
          />
          <span className="text-sm font-semibold text-gray-900">
            {loading
              ? 'Carregando agendamentos...'
              : error
              ? 'Erro ao carregar'
              : `${appointments.length} agendamento${appointments.length !== 1 ? 's' : ''}`}
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium">
          {error}
        </div>
      )}

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={
          isMobile
            ? {
                left: 'prev,next',
                center: 'title',
                right: 'today'
              }
            : {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }
        }
        initialView={isMobile ? 'dayGridMonth' : 'timeGridWeek'}
        editable={!isMobile}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={isMobile ? 2 : true}
        weekends={true}
        businessHours={businessHours}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
        height={isMobile ? 'auto' : 'auto'}
        aspectRatio={isMobile ? 1.0 : 1.35}
        contentHeight={isMobile ? 'auto' : 600}
        events={calendarEvents}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventDrop={!isMobile ? handleEventDrop : undefined}
        eventResize={!isMobile ? handleEventResize : undefined}
        moreLinkClick="popover"
        dayMaxEventRows={isMobile ? 2 : 6}
        eventDisplay="block"
        eventContent={(eventInfo) => (
          <div className={`p-1 ${isMobile ? 'text-center' : ''}`}>
            <div className={`font-medium truncate ${isMobile ? 'text-xs' : 'text-xs'}`}>
              {isMobile
                ? eventInfo.event.title.split(' - ')[0] || eventInfo.event.title.substring(0, 15) + '...'
                : eventInfo.event.title
              }
            </div>
            {!isMobile && (
              <div className="text-xs opacity-75 truncate">
                {eventInfo.timeText}
              </div>
            )}
          </div>
        )}
        // Mobile-specific settings
        dayHeaderFormat={isMobile ? { weekday: 'short' } : { weekday: 'short', month: 'numeric', day: 'numeric' }}
        titleFormat={isMobile ? { month: 'short', year: 'numeric' } : { month: 'long', year: 'numeric' }}
        slotLabelFormat={isMobile ? {
          hour: 'numeric',
          minute: '2-digit',
          hour12: false
        } : {
          hour: 'numeric',
          minute: '2-digit',
          hour12: false
        }}
        // Responsive event time display
        displayEventTime={!isMobile}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          hour12: false
        }}
        // Mobile view configuration
        views={{
          dayGridMonth: {
            dayMaxEventRows: isMobile ? 3 : 6,
            moreLinkClick: 'popover',
            eventOrder: 'start'
          },
          timeGridWeek: {
            slotDuration: isMobile ? '01:00:00' : '00:30:00',
            slotLabelInterval: isMobile ? '01:00:00' : '01:00:00',
            eventMinHeight: isMobile ? 30 : 15
          },
          timeGridDay: {
            slotDuration: '00:30:00',
            eventMinHeight: 20
          }
        }}
        // Touch and interaction improvements
        longPressDelay={isMobile ? 500 : 1000}
        eventDragMinDistance={isMobile ? 10 : 5}
        snapDuration={isMobile ? '01:00:00' : '00:15:00'}
        selectMinDistance={isMobile ? 10 : 0}
      />

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        event={selectedEvent}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />

      {selectedEvent && isModalOpen && (
        <button
          onClick={handleDeleteEvent}
          className={`fixed bg-gradient-to-r from-red-500 to-red-600 hover:shadow-2xl text-white rounded-2xl shadow-lg transition-all duration-300 z-50 ${
            isMobile
              ? 'bottom-20 right-4 p-3'
              : 'bottom-4 right-4 p-4'
          }`}
          title="Excluir Agendamento"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Calendar;
