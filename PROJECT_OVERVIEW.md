# White-Label Scheduling Front-End

A generic, white-label scheduling system built with **React, TypeScript, TailwindCSS, and FullCalendar**. This project provides a complete appointment management solution that can be customized for different businesses (barbers, doctors, consultants, gyms, etc.).

## ✅ Features Implemented

### 🎯 Core Features
- **Clean, responsive design** with neutral white-label styling
- **FullCalendar integration** with timeGridWeek default view
- **Business hours** configuration (08:00 - 20:00, Monday-Saturday)
- **Interactive scheduling**:
  - Click time slots to create appointments
  - Drag & drop to reschedule
  - Resize events to adjust duration
  - Click events to edit or delete

### 📋 Event Management
- **Comprehensive appointment form** with fields:
  - Customer Name
  - Service/Appointment Type
  - Date & Time selection
  - Optional notes
- **Pre-loaded sample events** for demonstration
- **Real-time calendar updates**

### 🔧 Technical Implementation
- **React 19** with TypeScript for type safety
- **TailwindCSS 4** for modern, utility-first styling
- **FullCalendar 6** with plugins:
  - Day Grid View
  - Time Grid Views (week/day)
  - Drag & Drop interaction
- **Modular component architecture**:
  - `Navbar.tsx` - Top navigation
  - `Calendar.tsx` - Main calendar component
  - `EventModal.tsx` - Appointment creation/editing
- **Type definitions** for events and form data

### 🔌 Integration Ready
- **Placeholder functions** for external integrations:
  - WhatsApp → n8n → Calendar pipeline
  - External booking systems
  - Calendar sync services
- **Business configuration** system for white-label customization
- **Webhook handlers** for incoming bookings

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx       # Top navigation bar
│   ├── Calendar.tsx     # Main FullCalendar component
│   └── EventModal.tsx   # Appointment creation/editing modal
├── types/
│   └── index.ts         # TypeScript type definitions
├── utils/
│   └── integrations.ts  # External integration utilities
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## 🎨 Customization

### Business Configuration
The system is designed for easy white-label customization:

```typescript
// src/utils/integrations.ts
export interface BusinessConfig {
  businessName: string;
  businessHours: {
    start: string;
    end: string;
    daysOfWeek: number[];
  };
  services: string[];
  timezone: string;
}
```

### Styling
- All styling uses TailwindCSS classes
- Neutral color scheme (blues, grays, whites)
- Responsive design for mobile/desktop
- Easy to customize with Tailwind configuration

## 🔗 Future Integrations

The project includes placeholder code for:

1. **WhatsApp Integration** (`handleWhatsAppBooking`)
2. **External Calendar Sync** (`syncWithExternalCalendar`)
3. **Webhook Endpoints** (`handleIncomingBooking`)
4. **Business Configuration** (`getBusinessConfig`)

## 📱 Sample Events

The calendar comes pre-loaded with example appointments:
- "Meeting with Client A" - Consultation
- "Training Session" - Advanced training

## 🛠 Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety
- **TailwindCSS 4** - Styling
- **FullCalendar 6** - Calendar functionality
- **Vite** - Build tool and dev server

## 📈 Next Steps

1. **Backend Integration**: Connect to your preferred backend/API
2. **Authentication**: Add user management system
3. **Notifications**: Implement email/SMS reminders
4. **Multi-language**: Add i18n support
5. **Theming**: Implement dynamic theme switching
6. **Reporting**: Add analytics and reporting features

This white-label scheduling system provides a solid foundation for any appointment-based business!