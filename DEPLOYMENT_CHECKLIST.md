# ✅ Vercel Deployment Checklist

## What Was Fixed

1. ✅ Created missing `/api/appointments` endpoints
2. ✅ Updated `.env` to use relative API paths
3. ✅ Added appointments routes to `vercel.json`

## Complete API Endpoints

```
GET  /api/clients                    - Fetch all clients
GET  /api/appointments                - Fetch all appointments
GET  /api/appointments/upcoming       - Fetch upcoming appointments
GET  /api/calcom/status              - Cal.com status
GET  /api/calcom/bookings            - Get bookings
POST /api/calcom/bookings            - Create booking
GET  /api/calcom/bookings/upcoming   - Get upcoming bookings
DELETE /api/calcom/bookings/:id      - Cancel booking
GET  /api/calcom/events              - Get calendar events
```

## Environment Variables for Vercel

In your Vercel Dashboard → Settings → Environment Variables, add:

```bash
# Supabase (for API functions)
SUPABASE_URL=https://bgcgpdmasigbhmvrmydi.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnY2dwZG1hc2lnYmhtdnJteWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NDI1NjAsImV4cCI6MjA3NDQxODU2MH0.IH0IE5M9TIonPl9MHquajdMqxtJXFmIRoKuapP0I9_w

# Cal.com
CALCOM_API_KEY=cal_live_92a5e5dc81f8eccaa3464ccd99f6c1b7
CALCOM_API_URL=https://api.cal.com/v2

# Frontend (VITE_*)
VITE_SUPABASE_URL=https://bgcgpdmasigbhmvrmydi.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnY2dwZG1hc2lnYmhtdnJteWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NDI1NjAsImV4cCI6MjA3NDQxODU2MH0.IH0IE5M9TIonPl9MHquajdMqxtJXFmIRoKuapP0I9_w

# IMPORTANT: Leave VITE_API_URL empty or don't set it
VITE_API_URL=
```

## Deploy Steps

```bash
# 1. Commit changes
git add .
git commit -m "fix: add appointments API endpoints and update configuration"

# 2. Push to Vercel branch
git push origin vercel-prod

# 3. Verify environment variables in Vercel Dashboard

# 4. Wait for deployment to complete

# 5. Test your app
```

## Testing After Deployment

Visit your deployed app and check the browser console. You should see:
- ✅ API calls to `/api/appointments` (not localhost:3001)
- ✅ Data loading successfully
- ✅ No CORS errors

## Common Issues

**Still seeing localhost:3001?**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard reload (Ctrl+Shift+R)
- Check `.env` has `VITE_API_URL=` (empty)

**404 errors?**
- Verify environment variables are set in Vercel
- Redeploy after adding env vars

**CORS errors?**
- Check that all API functions have CORS headers
- Verify `vercel.json` is in root directory
