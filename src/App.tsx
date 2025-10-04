import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppointmentProvider } from './contexts/AppointmentContext';
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";

function App() {
  return (
    <LanguageProvider>
      <AppointmentProvider>
        <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Sistema de Agendamento */}
          <Route path="/sistema" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="clients" element={<Clients />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        </Router>
      </AppointmentProvider>
    </LanguageProvider>
  );
}

export default App;
