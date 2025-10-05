import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { AppointmentEvent, EventFormData } from '../types';
import { useAppointment } from '../contexts/AppointmentContext';
import EventModal from './EventModal';
import styles from './Calendar.module.css';

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
  // Usa o context para gerenciar eventos
  const {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    isCalComEnabled,
    syncStatus,
    syncWithCalCom,
    isLoading,
    error,
  } = useAppointment();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AppointmentEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

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
    return Math.random().toString(36).substr(2, 9);
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
      backgroundColor: '#1C1C1C',
      borderColor: '#1C1C1C',
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

  return (
    <div className={`bg-[#E8E4DF] border border-[#1C1C1C]/20 p-3 md:p-6 overflow-hidden ${styles['calendar-container']}`}>
      {/* Cal.com Sync Status */}
      {isCalComEnabled && (
        <div className="mb-4 p-3 bg-white/50 border border-[#1C1C1C]/10 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <div
              className={`w-2 h-2 rounded-full ${
                syncStatus?.syncing
                  ? 'bg-yellow-500 animate-pulse'
                  : syncStatus?.error
                  ? 'bg-red-500'
                  : 'bg-green-500'
              }`}
            />
            <span className="text-xs md:text-sm text-[#1C1C1C]">
              {syncStatus?.syncing
                ? 'Sincronizando...'
                : syncStatus?.error
                ? `Erro: ${syncStatus.error}`
                : `Cal.com: ${syncStatus?.syncedEvents || 0} eventos`}
            </span>
          </div>
          <button
            onClick={syncWithCalCom}
            disabled={isLoading}
            className="px-3 py-1 text-xs md:text-sm bg-[#1C1C1C] text-[#F2EFEA] hover:bg-[#A8A29E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Sincronizando...' : 'Sincronizar'}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && !isCalComEnabled && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
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
        events={events}
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
          className={`fixed bg-[#1C1C1C] hover:bg-[#A8A29E] text-[#F2EFEA] shadow-lg transition-colors z-50 ${
            isMobile
              ? 'bottom-20 right-4 p-3'
              : 'bottom-4 right-4 p-3'
          }`}
          title="Delete Appointment"
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
