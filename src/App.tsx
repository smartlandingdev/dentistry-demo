import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import Settings from "./pages/Settings";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Header />

          <div className="flex flex-1">
            <Sidebar onToggleCollapse={setIsSidebarCollapsed} />

            <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
              <div className="min-h-full">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>

                {/* Placeholder for future external integrations */}
                {/*
                This is where external systems can integrate:
                1. WhatsApp → n8n → API endpoint → Calendar component
                2. Other booking systems → API → Calendar component
                3. External calendar services → Sync → Calendar component
                */}
              </div>
            </main>
          </div>

          <Footer isSidebarCollapsed={isSidebarCollapsed} />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
