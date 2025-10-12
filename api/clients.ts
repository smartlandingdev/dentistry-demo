import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

interface DBClient {
  id: number;
  nomewpp: string;
  email: string;
  telefone: string;
}

interface Appointment {
  id_agendamento: number;
  hora_inicio: string;
  hora_fim: string;
  id_cliente: number;
  finalizado: boolean;
}

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  lastVisit?: string;
  nextAppointment?: string;
  totalVisits: number;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Fetch clients
    const { data: clientsData, error: clientsError } = await supabase
      .from('dados_cliente')
      .select('id, nomewpp, email, telefone');

    if (clientsError) {
      throw new Error(`Error fetching clients: ${clientsError.message}`);
    }

    // Fetch appointments
    const { data: appointmentsData, error: appointmentsError } = await supabase
      .from('agendamentos')
      .select('id_agendamento, hora_inicio, hora_fim, id_cliente, finalizado');

    if (appointmentsError) {
      throw new Error(`Error fetching appointments: ${appointmentsError.message}`);
    }

    // Merge data
    const mergedClients: Client[] = clientsData?.map((client: DBClient) => {
      const clientAppointments = appointmentsData?.filter(
        (a: Appointment) => a.id_cliente === client.id
      ) || [];

      const totalVisits = clientAppointments.filter(
        (a: Appointment) => a.finalizado === true
      ).length;

      const lastVisit = clientAppointments
        .filter((a: Appointment) => a.finalizado === true)
        .sort((a: Appointment, b: Appointment) =>
          new Date(b.hora_inicio).getTime() - new Date(a.hora_inicio).getTime()
        )[0]?.hora_inicio;

      const nextAppointment = clientAppointments
        .filter((a: Appointment) => a.finalizado === false)
        .sort((a: Appointment, b: Appointment) =>
          new Date(a.hora_inicio).getTime() - new Date(b.hora_inicio).getTime()
        )[0]?.hora_inicio;

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

    res.status(200).json({
      success: true,
      data: mergedClients,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching clients',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
