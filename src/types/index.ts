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
}

export interface EventFormData {
  customerName: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  notes: string;
}