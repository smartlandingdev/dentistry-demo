import { VercelRequest, VercelResponse } from '@vercel/node';

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
  res.setHeader('Access-Control-Allow-Methods', 'DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!process.env.CALCOM_API_KEY) {
    return res.status(503).json({
      success: false,
      message: 'Cal.com integration not configured. Please add CALCOM_API_KEY to your .env file.',
    });
  }

  try {
    const { id } = req.query;
    const bookingId = parseInt(id as string);

    if (isNaN(bookingId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID',
      });
    }

    const { reason } = req.body || {};

    await makeCalcomRequest(`/bookings/${bookingId}/cancel`, {
      method: 'DELETE',
      body: JSON.stringify({ reason }),
    });

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling Cal.com booking',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
