# 📅 Cal.com Integration Guide

All Cal.com integration is now handled through the **backend API** for better security and control.

## 🔧 Setup Instructions

### 1. Get Your Cal.com API Key

1. Go to https://app.cal.com/settings/developer/api-keys
2. Click "Create New API Key"
3. Copy the generated API key

### 2. Configure Backend Environment

Edit `backend/.env` and add:

```env
# Cal.com Integration
CALCOM_API_KEY=cal_live_xxxxxxxxxxxxxxxxxxxxxxxxxx
CALCOM_API_URL=https://api.cal.com/v2
```

**Important:** Use Cal.com API **v2** (not v1)

### 3. Restart Backend Server

```bash
npm run dev:backend
```

The server will now connect to Cal.com API.

## 📡 Available API Endpoints

### Backend Endpoints

All Cal.com endpoints are under `/api/calcom`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/calcom/status` | Check if Cal.com is configured |
| GET | `/api/calcom/events` | Get events formatted for calendar |
| GET | `/api/calcom/bookings` | Get all bookings |
| GET | `/api/calcom/bookings/upcoming` | Get upcoming bookings |
| POST | `/api/calcom/bookings` | Create new booking |
| DELETE | `/api/calcom/bookings/:id` | Cancel a booking |

### Frontend Usage

Use the `apiService` from `src/services/api.ts`:

```typescript
import { apiService } from '../services/api';

// Check if Cal.com is configured
const statusResponse = await apiService.getCalcomStatus();
console.log(statusResponse.data?.configured); // true/false

// Get calendar events
const eventsResponse = await apiService.getCalcomEvents({
  afterStart: new Date().toISOString(),
  beforeEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
});

if (eventsResponse.success) {
  const events = eventsResponse.data; // CalcomEvent[]
}

// Create booking
const bookingResponse = await apiService.createCalcomBooking({
  eventTypeId: 123456,
  start: '2025-10-15T14:00:00Z',
  attendee: {
    name: 'João Silva',
    email: 'joao@example.com',
    timeZone: 'America/Sao_Paulo'
  }
});

// Cancel booking
await apiService.cancelCalcomBooking(bookingId, 'Cancelado pelo paciente');
```

## 🎨 Calendar Integration Example

Here's how to integrate Cal.com events into your Calendar component:

```typescript
import { useEffect, useState } from 'react';
import { apiService, type CalcomEvent } from '../services/api';

function Calendar() {
  const [calcomEvents, setCalcomEvents] = useState<CalcomEvent[]>([]);
  const [isCalcomConfigured, setIsCalcomConfigured] = useState(false);

  useEffect(() => {
    // Check if Cal.com is configured
    const checkCalcomStatus = async () => {
      const response = await apiService.getCalcomStatus();
      if (response.success && response.data) {
        setIsCalcomConfigured(response.data.configured);
      }
    };

    checkCalcomStatus();
  }, []);

  useEffect(() => {
    if (!isCalcomConfigured) return;

    // Fetch Cal.com events
    const fetchCalcomEvents = async () => {
      const now = new Date();
      const oneMonthLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      const response = await apiService.getCalcomEvents({
        afterStart: now.toISOString(),
        beforeEnd: oneMonthLater.toISOString(),
      });

      if (response.success && response.data) {
        setCalcomEvents(response.data);
      }
    };

    fetchCalcomEvents();

    // Refresh every 5 minutes
    const interval = setInterval(fetchCalcomEvents, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isCalcomConfigured]);

  // Convert CalcomEvent to FullCalendar event format
  const calendarEvents = calcomEvents.map(event => ({
    id: event.id,
    title: `${event.title} - ${event.customerName}`,
    start: event.start,
    end: event.end,
    backgroundColor: event.backgroundColor,
    borderColor: event.borderColor,
    extendedProps: {
      customerEmail: event.customerEmail,
      status: event.status,
      source: 'calcom'
    }
  }));

  return (
    <FullCalendar
      events={calendarEvents}
      // ... other props
    />
  );
}
```

## 📊 Event Data Structure

### CalcomEvent (Calendar Format)

```typescript
interface CalcomEvent {
  id: string;                  // Unique booking ID
  title: string;               // Event title
  start: string;               // Start time (ISO 8601)
  end: string;                 // End time (ISO 8601)
  customerName: string;        // Attendee name
  customerEmail: string;       // Attendee email
  status: string;              // ACCEPTED, PENDING, CANCELLED
  backgroundColor?: string;    // Event color
  borderColor?: string;        // Border color
}
```

### CalcomBooking (Full Booking Data)

```typescript
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
```

## 🎯 Color Coding

The backend automatically assigns colors based on booking status:

- **ACCEPTED** (Confirmed): Green (#10b981 / #059669)
- **PENDING**: Orange (#f59e0b / #d97706)
- **CANCELLED**: Red (not shown by default)

## 🔒 Security

- ✅ API key is stored **only on the backend** (never exposed to frontend)
- ✅ All requests go through your backend API
- ✅ CORS protection prevents unauthorized access
- ✅ Backend validates all requests before forwarding to Cal.com

## 🧪 Testing

### Test if Cal.com is configured:

```bash
curl http://localhost:3001/api/calcom/status
```

Expected response:
```json
{
  "success": true,
  "data": {
    "configured": true,
    "message": "Cal.com integration is configured and ready"
  }
}
```

### Test fetching events:

```bash
curl "http://localhost:3001/api/calcom/events?afterStart=2025-10-01T00:00:00Z"
```

## 🚨 Troubleshooting

### "Cal.com integration not configured"

**Solution:** Add `CALCOM_API_KEY` to `backend/.env` and restart the backend server.

### "Cal.com API error: 401"

**Solution:** Your API key is invalid or expired. Generate a new key at https://app.cal.com/settings/developer/api-keys

### Events not showing on calendar

**Solutions:**
1. Check if Cal.com is configured: `GET /api/calcom/status`
2. Verify you have bookings in the date range
3. Check browser console for errors
4. Verify backend is running and accessible

## 📚 Next Steps

1. **Add your API key** to `backend/.env`
2. **Restart backend** with `npm run dev:backend`
3. **Update Calendar component** to fetch and display Cal.com events
4. **Test** by creating a booking on Cal.com

## 🔗 Useful Links

- Cal.com API Documentation: https://cal.com/docs/api-reference
- Get API Key: https://app.cal.com/settings/developer/api-keys
- Event Types: https://app.cal.com/event-types

## 💡 Pro Tips

- Use `getCalcomEvents()` for calendar display (formatted and filtered)
- Use `getCalcomBookings()` for detailed booking management
- Set up webhooks on Cal.com to get real-time updates (advanced)
- Cache events in frontend to reduce API calls
