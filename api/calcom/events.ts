import { VercelRequest, VercelResponse } from '@vercel/node';

interface CalcomBooking {
  id: number;
  uid: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  attendees: Array<{
    name: string;
    email: string;
    timeZone: string;
  }>;
  status: 'ACCEPTED' | 'PENDING' | 'CANCELLED';
  eventTypeId: number;
}

interface CalcomEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  customerName: string;
  customerEmail: string;
  status: string;
  backgroundColor?: string;
  borderColor?: string;
}

async function makeCalcomRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const apiKey = process.env.CALCOM_API_KEY;
  const apiUrl = process.env.CALCOM_API_URL || 'https://api.cal.com/v2';

  if (!apiKey) {
    throw new Error('Cal.com API key not configured');
  }

  const url = `${apiUrl}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorData: any = await response.json().catch(() => ({}));
    throw new Error(
      `Cal.com API error: ${response.status} - ${errorData.message || response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

function convertBookingsToEvents(bookings: CalcomBooking[]): CalcomEvent[] {
  return bookings.map((booking) => ({
    id: booking.uid,
    title: booking.title || 'Agendamento Cal.com',
    start: booking.startTime,
    end: booking.endTime,
    customerName: booking.attendees[0]?.name || 'Cliente',
    customerEmail: booking.attendees[0]?.email || '',
    status: booking.status,
    backgroundColor: booking.status === 'ACCEPTED' ? '#10b981' : '#f59e0b',
    borderColor: booking.status === 'ACCEPTED' ? '#059669' : '#d97706',
  }));
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

  if (!process.env.CALCOM_API_KEY) {
    return res.status(503).json({
      success: false,
      message: 'Cal.com integration not configured. Please add CALCOM_API_KEY to your .env file.',
    });
  }

  try {
    const { afterStart, beforeEnd } = req.query;

    const queryParams = new URLSearchParams();
    if (afterStart) queryParams.append('afterStart', afterStart as string);
    if (beforeEnd) queryParams.append('beforeEnd', beforeEnd as string);

    const endpoint = `/bookings?${queryParams.toString()}`;
    const response = await makeCalcomRequest<{ bookings: CalcomBooking[] }>(endpoint);

    const events = convertBookingsToEvents(response.bookings || []);

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching Cal.com calendar events',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
