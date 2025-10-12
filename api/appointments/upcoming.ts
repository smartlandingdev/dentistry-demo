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
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const now = new Date().toISOString();

    // 1. Fetch upcoming appointments (not finished, not cancelled, future)
    const { data: appointmentsData, error: appointmentsError } = await supabase
      .from('agendamentos')
      .select('id_agendamento, hora_inicio, hora_fim, id_cliente, finalizado, cancelado')
      .eq('finalizado', false)
      .eq('cancelado', false)
      .gte('hora_inicio', now)
      .order('hora_inicio', { ascending: true })
      .limit(limit);

    if (appointmentsError) {
      throw new Error(`Error fetching upcoming appointments: ${appointmentsError.message}`);
    }

    if (!appointmentsData || appointmentsData.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    // 2. Fetch clients only for needed IDs
    const clientIds = [...new Set(appointmentsData.map((a: any) => a.id_cliente))];
    const { data: clientsData, error: clientsError } = await supabase
      .from('dados_cliente')
      .select('id, nomewpp')
      .in('id', clientIds);

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
      message: 'Error fetching upcoming appointments',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
