import { supabase } from "../config/supabase.js";
import type { Appointment } from "../types/index.js";

export class AppointmentService {
  /**
   * Retorna todos os agendamentos da tabela "agendamentos"
   */
  async getAllAppointments(): Promise<Appointment[]> {
    try {
      const { data, error } = await supabase
        .from("agendamentos")
        .select(
          "id_agendamento, hora_inicio, hora_fim, id_cliente, finalizado"
        );

      if (error) {
        console.error("Erro ao buscar agendamentos:", error.message);
        throw new Error(`Erro ao buscar agendamentos: ${error.message}`);
      }

      return data || [];
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

  /**
   * Retorna apenas agendamentos futuros (não finalizados)
   */
  async getUpcomingAppointments(limit: number): Promise<Appointment[]> {
    try {
      const now = new Date().toISOString();

      const { data, error } = await supabase
        .from("agendamentos")
        .select("id_agendamento, hora_inicio, hora_fim, id_cliente, finalizado")
        .gte("hora_inicio", now)
        .eq("finalizado", false)
        .order("hora_inicio", { ascending: true });

      if (error) {
        console.error("Erro ao buscar próximos agendamentos:", error.message);
        throw new Error(
          `Erro ao buscar próximos agendamentos: ${error.message}`
        );
      }

      return data || [];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retorna todos os agendamentos de um cliente específico
   */
  async getAppointmentsByClientId(clientId: string): Promise<Appointment[]> {
    try {
      const { data, error } = await supabase
        .from("agendamentos")
        .select("id_agendamento, hora_inicio, hora_fim, id_cliente, finalizado")
        .eq("id_cliente", clientId)
        .order("hora_inicio", { ascending: true });

      if (error) {
        console.error(
          `Erro ao buscar agendamentos do cliente ${clientId}:`,
          error.message
        );
        throw new Error(
          `Erro ao buscar agendamentos do cliente ${clientId}: ${error.message}`
        );
      }

      return data || [];
    } catch (error) {
      throw error;
    }
  }
}
