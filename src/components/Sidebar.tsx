import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Settings, Menu, X, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  onToggleCollapse?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggleCollapse }) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  const navigationItems = [
    { name: t.sidebar.dashboard, href: '/sistema', icon: LayoutDashboard },
    { name: t.sidebar.calendar, href: '/sistema/calendar', icon: Calendar },
    { name: 'Pacientes', href: '/sistema/clients', icon: Users },
    { name: t.sidebar.settings, href: '/sistema/settings', icon: Settings },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDesktopSidebar = () => {
    const newCollapsedState = !isDesktopCollapsed;
    setIsDesktopCollapsed(newCollapsedState);
    onToggleCollapse?.(newCollapsedState);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-[#1C1C1C] hover:text-[#A8A29E] bg-[#F2EFEA] border border-[#1C1C1C]/20"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 bg-[#E8E4DF] border-r border-[#1C1C1C]/20 transform transition-all duration-300 ease-in-out ${
        isDesktopCollapsed ? 'w-16' : 'w-64'
      } ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex-1 px-4 py-6">
            <div className="mt-16 md:mt-8">
              <div className="hidden md:flex justify-between items-center mb-8 px-4">
                {!isDesktopCollapsed && (
                  <h2 className="text-xl font-semibold text-[#1C1C1C]">SmileCare</h2>
                )}
                <button
                  onClick={toggleDesktopSidebar}
                  className="p-1.5 text-[#A8A29E] hover:text-[#1C1C1C] transition-colors"
                  title={isDesktopCollapsed ? t.sidebar.expandSidebar : t.sidebar.collapseSidebar}
                >
                  <ChevronLeft className={`w-4 h-4 transition-transform duration-200 ${isDesktopCollapsed ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? 'bg-[#1C1C1C] text-[#F2EFEA]'
                            : 'text-[#1C1C1C] hover:bg-[#D6CBB8]'
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                      title={isDesktopCollapsed ? item.name : ''}
                    >
                      <Icon className="w-5 h-5 mr-3 flex-shrink-0" strokeWidth={1.5} />
                      <span className={`${isDesktopCollapsed ? 'hidden' : 'block'}`}>
                        {item.name}
                      </span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className={`border-t border-[#1C1C1C]/20 p-4 ${isDesktopCollapsed ? 'text-center' : ''}`}>
            <div className={`text-xs text-[#A8A29E] ${isDesktopCollapsed ? 'hidden' : 'text-center'}`}>
              {t.sidebar.version}
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#1C1C1C] bg-opacity-50 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;
