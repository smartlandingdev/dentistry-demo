import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import Settings from "./pages/Settings";

function App() {
  return (
    <LanguageProvider>
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
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
