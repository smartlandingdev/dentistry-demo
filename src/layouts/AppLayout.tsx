import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F2EFEA] flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar onToggleCollapse={setIsSidebarCollapsed} />

        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
          <div className="min-h-full">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
}
