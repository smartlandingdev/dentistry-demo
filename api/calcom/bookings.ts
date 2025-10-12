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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (!process.env.CALCOM_API_KEY) {
    return res.status(503).json({
      success: false,
      message: 'Cal.com integration not configured. Please add CALCOM_API_KEY to your .env file.',
    });
  }

  try {
    // GET /api/calcom/bookings - Fetch all bookings
    if (req.method === 'GET') {
      const { status, userId, eventTypeId, afterStart, beforeEnd } = req.query;

      const queryParams = new URLSearchParams();
      if (status) queryParams.append('status', status as string);
      if (userId) queryParams.append('userId', userId as string);
      if (eventTypeId) queryParams.append('eventTypeId', eventTypeId as string);
      if (afterStart) queryParams.append('afterStart', afterStart as string);
      if (beforeEnd) queryParams.append('beforeEnd', beforeEnd as string);

      const endpoint = `/bookings?${queryParams.toString()}`;
      const response = await makeCalcomRequest<{ bookings: CalcomBooking[] }>(endpoint);

      return res.status(200).json({
        success: true,
        data: response.bookings || [],
      });
    }

    // POST /api/calcom/bookings - Create new booking
    if (req.method === 'POST') {
      const { eventTypeId, start, attendee, metadata } = req.body;

      if (!eventTypeId || !start || !attendee?.name || !attendee?.email) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: eventTypeId, start, attendee.name, attendee.email',
        });
      }

      const response = await makeCalcomRequest<{ booking: CalcomBooking }>('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          eventTypeId,
          start,
          responses: {
            name: attendee.name,
            email: attendee.email,
          },
          timeZone: attendee.timeZone || 'America/Sao_Paulo',
          metadata,
        }),
      });

      return res.status(201).json({
        success: true,
        data: response.booking,
      });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Cal.com API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing Cal.com request',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
