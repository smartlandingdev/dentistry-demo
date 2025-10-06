import { supabase } from '../config/supabase.js';
import type { Client, DBClient, Appointment } from '../types/index.js';

export class ClientService {
  async getClientsWithAppointments(): Promise<Client[]> {
    try {
      console.log('🔍 Iniciando busca de clientes e agendamentos...');

      // 1️⃣ Busca todos os clientes
      const { data: clientsData, error: clientsError } = await supabase
        .from('dados_cliente')
        .select('id, nomewpp, email, telefone');

      if (clientsError) {
        console.error('Erro ao buscar clientes:', clientsError.message);
        throw new Error(`Erro ao buscar clientes: ${clientsError.message}`);
      }

      console.log('✅ Clientes retornados:', clientsData);

      // 2️⃣ Busca todos os agendamentos
      console.log('🔍 Buscando agendamentos...');
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('agendamentos')
        .select('id_agendamento, hora_inicio, hora_fim, id_cliente, finalizado');

      if (appointmentsError) {
        console.error('❌ Erro ao buscar agendamentos:', appointmentsError);
        throw new Error(`Erro ao buscar agendamentos: ${appointmentsError.message}`);
      }

      console.log('✅ Agendamentos retornados:', appointmentsData);
      console.log('📊 Total de agendamentos:', appointmentsData?.length || 0);

      // 3️⃣ Combina clientes com agendamentos
      const mergedClients: Client[] = clientsData?.map((client: DBClient) => {
        const clientAppointments = appointmentsData?.filter(
          (a: Appointment) => a.id_cliente === client.id
        ) || [];

        console.log(`👤 Cliente ${client.nomewpp} (ID: ${client.id}):`, {
          totalAppointments: clientAppointments.length,
          appointments: clientAppointments,
        });

        const totalVisits = clientAppointments.filter(
          (a: Appointment) => a.finalizado === true
        ).length;

        const lastVisit = clientAppointments
          .filter((a: Appointment) => a.finalizado === true)
          .sort(
            (a: Appointment, b: Appointment) =>
              new Date(b.hora_inicio).getTime() - new Date(a.hora_inicio).getTime()
          )[0]?.hora_inicio;

        const nextAppointment = clientAppointments
          .filter((a: Appointment) => a.finalizado === false)
          .sort(
            (a: Appointment, b: Appointment) =>
              new Date(a.hora_inicio).getTime() - new Date(b.hora_inicio).getTime()
          )[0]?.hora_inicio;

        console.log(`📈 Processado para ${client.nomewpp}:`, {
          totalVisits,
          lastVisit,
          nextAppointment,
        });

        return {
          id: client.id,
          name: client.nomewpp,
          phone: client.telefone,
          email: client.email,
          lastVisit: lastVisit
            ? new Date(lastVisit).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
            : '-',
          nextAppointment: nextAppointment
            ? new Date(nextAppointment).toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : undefined,
          totalVisits,
        };
      }) || [];

      console.log('📊 Clientes combinados:', mergedClients);
      return mergedClients;
    } catch (error) {
      console.error('❌ Erro no serviço de clientes:', error);
      throw error;
    }
  }
}
