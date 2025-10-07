# Vercel Serverless Deployment Guide

## ✅ Migration Complete

Your Express backend has been successfully converted to Vercel Serverless Functions!

## 📁 Project Structure

```
/api
├── clients.ts                    # GET /api/clients
├── calcom/
│   ├── status.ts                # GET /api/calcom/status
│   ├── bookings.ts              # GET, POST /api/calcom/bookings
│   ├── events.ts                # GET /api/calcom/events
│   └── bookings/
│       ├── upcoming.ts          # GET /api/calcom/bookings/upcoming
│       └── [id].ts              # DELETE /api/calcom/bookings/:id
```

## 🚀 Deployment Steps

### 1. Configure Environment Variables in Vercel

Go to your Vercel project dashboard → Settings → Environment Variables and add:

**Required Variables:**
```bash
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Cal.com
CALCOM_API_KEY=your_calcom_api_key
CALCOM_API_URL=https://api.cal.com/v2

# Frontend (VITE_*)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=  # Leave empty for production
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel --prod
```

Or push to your git repository if you have Vercel connected to it.

### 3. Update Your .env File

For local development, update your `.env`:

```bash
# Frontend will use relative paths /api/*
VITE_API_URL=/api

# Backend environment variables for local API testing
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
CALCOM_API_KEY=your_calcom_api_key
```

## 🔄 API Endpoints

All your existing endpoints work the same:

- `GET /api/clients` - Fetch all clients
- `GET /api/calcom/status` - Check Cal.com integration status
- `GET /api/calcom/bookings` - Get all bookings
- `GET /api/calcom/bookings/upcoming` - Get upcoming bookings
- `GET /api/calcom/events` - Get calendar events
- `POST /api/calcom/bookings` - Create new booking
- `DELETE /api/calcom/bookings/:id` - Cancel booking

## ✨ What Changed

1. **Removed Express Server** - No longer needed
2. **Created Serverless Functions** - Each route is now a separate function in `/api`
3. **CORS Handled** - Each function includes CORS headers
4. **Environment Variables** - Now uses Vercel's env vars directly
5. **Updated API URL** - Frontend now uses relative paths (`/api/*`)

## 🧪 Testing

After deployment, test your endpoints:

```bash
# Test clients endpoint
curl https://your-vercel-url.vercel.app/api/clients

# Test Cal.com status
curl https://your-vercel-url.vercel.app/api/calcom/status
```

## 🐛 Troubleshooting

### "import.meta" Error
- ✅ **Fixed**: API now uses serverless functions, no module loading issues

### CORS Errors
- ✅ **Fixed**: All API routes include proper CORS headers

### Environment Variables Not Working
- Check Vercel dashboard → Settings → Environment Variables
- Ensure all variables are set for Production, Preview, and Development
- Redeploy after adding variables

### API Returns 404
- Verify `vercel.json` is in the root directory
- Check that `/api` directory exists with the functions
- Redeploy the project

## 📝 Notes

- The old `/backend` directory is no longer needed for deployment
- All API logic is now in `/api` directory
- Vercel automatically handles scaling and serverless deployment
- Each function has a 10-second execution limit (Hobby plan)

## 🎉 Next Steps

1. Push changes to GitHub
2. Verify Vercel environment variables
3. Deploy to production
4. Test all API endpoints
5. Remove the old backend deployment if it exists
