export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  lastVisit?: string;
  nextAppointment?: string;
  totalVisits: number;
}

export interface DBClient {
  id: number;
  nomewpp: string;
  email: string;
  telefone: string;
}

export interface Appointment {
  id_agendamento: number;
  hora_inicio: string;
  hora_fim: string;
  id_cliente: number;
  finalizado: boolean;
}
