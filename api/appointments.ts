import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

interface AppointmentWithClient {
  id_agendamento: string;
  id_cliente: number;
  clientName: string;
  hora_inicio: string;
  hora_fim: string;
  finalizado: boolean;
  cancelado: boolean;
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
    // 1. Fetch all appointments (excluding cancelled)
    const { data: appointmentsData, error: appointmentsError } = await supabase
      .from('agendamentos')
      .select('id_agendamento, hora_inicio, hora_fim, id_cliente, finalizado, cancelado')
      .eq('cancelado', false)
      .order('hora_inicio', { ascending: true });

    if (appointmentsError) {
      throw new Error(`Error fetching appointments: ${appointmentsError.message}`);
    }

    // 2. Fetch all clients
    const { data: clientsData, error: clientsError } = await supabase
      .from('dados_cliente')
      .select('id, nomewpp');

    if (clientsError) {
      throw new Error(`Error fetching clients: ${clientsError.message}`);
    }

    // 3. Create a map for quick lookup
    const clientsMap = new Map(
      clientsData?.map((c: any) => [c.id, c.nomewpp]) || []
    );

    // 4. Combine appointments with client names
    const appointments: AppointmentWithClient[] = appointmentsData?.map((apt: any) => ({
      id_agendamento: apt.id_agendamento,
      id_cliente: apt.id_cliente,
      clientName: clientsMap.get(apt.id_cliente) || `Cliente #${apt.id_cliente}`,
      hora_inicio: apt.hora_inicio,
      hora_fim: apt.hora_fim,
      finalizado: apt.finalizado,
      cancelado: apt.cancelado,
    })) || [];

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
