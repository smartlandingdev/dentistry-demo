import { supabase } from "../config/supabase.js";

export interface AppointmentWithClient {
  id_agendamento: string;
  id_cliente: number;
  clientName: string;
  hora_inicio: string;
  hora_fim: string;
  finalizado: boolean;
  cancelado: boolean;
}

export class AppointmentService {
  async getAllAppointments(): Promise<AppointmentWithClient[]> {
    try {
      // 1. Busca todos os agendamentos (excluindo cancelados)
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from("agendamentos")
        .select("id_agendamento, hora_inicio, hora_fim, id_cliente, finalizado, cancelado")
        .eq("cancelado", false)
        .order("hora_inicio", { ascending: true });

      if (appointmentsError) {
        throw new Error(
          `Erro ao buscar agendamentos: ${appointmentsError.message}`
        );
      }

      // 2. Busca todos os clientes
      const { data: clientsData, error: clientsError } = await supabase
        .from("dados_cliente")
        .select("id, nomewpp");

      if (clientsError) {
        throw new Error(`Erro ao buscar clientes: ${clientsError.message}`);
      }

      // 3. Cria um mapa de clientes para lookup rápido
      const clientsMap = new Map(
        clientsData?.map((c: any) => [c.id, c.nomewpp]) || []
      );

      // 4. Combina agendamentos com nomes dos clientes
      const appointments: AppointmentWithClient[] =
        appointmentsData?.map((apt: any) => ({
          id_agendamento: apt.id_agendamento,
          id_cliente: apt.id_cliente,
          clientName: clientsMap.get(apt.id_cliente) || `Cliente #${apt.id_cliente}`,
          hora_inicio: apt.hora_inicio,
          hora_fim: apt.hora_fim,
          finalizado: apt.finalizado,
          cancelado: apt.cancelado,
        })) || [];

      return appointments;
    } catch (error) {
      throw error;
    }
  }

  async getUpcomingAppointments(
    limit: number = 10
  ): Promise<AppointmentWithClient[]> {
    try {
      const now = new Date().toISOString();

      // 1. Busca próximos agendamentos (não finalizados, não cancelados e futuros)
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from("agendamentos")
        .select("id_agendamento, hora_inicio, hora_fim, id_cliente, finalizado, cancelado")
        .eq("finalizado", false)
        .eq("cancelado", false)
        .gte("hora_inicio", now)
        .order("hora_inicio", { ascending: true })
        .limit(limit);

      if (appointmentsError) {
        throw new Error(
          `Erro ao buscar próximos agendamentos: ${appointmentsError.message}`
        );
      }

      if (!appointmentsData || appointmentsData.length === 0) {
        return [];
      }

      // 2. Busca clientes apenas dos IDs necessários
      const clientIds = [...new Set(appointmentsData.map((a: any) => a.id_cliente))];
      const { data: clientsData, error: clientsError } = await supabase
        .from("dados_cliente")
        .select("id, nomewpp")
        .in("id", clientIds);

      if (clientsError) {
        throw new Error(`Erro ao buscar clientes: ${clientsError.message}`);
      }

      // 3. Cria um mapa de clientes para lookup rápido
      const clientsMap = new Map(
        clientsData?.map((c: any) => [c.id, c.nomewpp]) || []
      );

      // 4. Combina agendamentos com nomes dos clientes
      const appointments: AppointmentWithClient[] =
        appointmentsData?.map((apt: any) => ({
          id_agendamento: apt.id_agendamento,
          id_cliente: apt.id_cliente,
          clientName: clientsMap.get(apt.id_cliente) || `Cliente #${apt.id_cliente}`,
          hora_inicio: apt.hora_inicio,
          hora_fim: apt.hora_fim,
          finalizado: apt.finalizado,
          cancelado: apt.cancelado,
        })) || [];

      return appointments;
    } catch (error) {
      throw error;
    }
  }
}
