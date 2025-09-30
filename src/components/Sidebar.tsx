import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Settings, Menu, X, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  onToggleCollapse?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggleCollapse }) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  const navigationItems = [
    { name: t.sidebar.dashboard, href: '/', icon: LayoutDashboard },
    { name: t.sidebar.calendar, href: '/calendar', icon: Calendar },
    { name: t.sidebar.settings, href: '/settings', icon: Settings },
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
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-gray-600 hover:text-gray-900 bg-white rounded-lg shadow-md"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 bg-white/95 backdrop-blur-md border-r border-slate-200 transform transition-all duration-300 ease-in-out ${
        isDesktopCollapsed ? 'w-16' : 'w-64'
      } ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex-1 px-4 py-6">
            <div className="mt-16 md:mt-8">
              <div className="hidden md:flex justify-end mb-4">
                <button
                  onClick={toggleDesktopSidebar}
                  className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                  title={isDesktopCollapsed ? t.sidebar.expandSidebar : t.sidebar.collapseSidebar}
                >
                  <ChevronLeft className={`w-4 h-4 transition-transform duration-200 ${isDesktopCollapsed ? 'rotate-180' : ''}`} />
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
                        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          isActive
                            ? 'bg-blue-50/80 text-blue-700 border-r-2 border-blue-700'
                            : 'text-slate-600 hover:bg-slate-50/80 hover:text-slate-900'
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                      title={isDesktopCollapsed ? item.name : ''}
                    >
                      <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className={`${isDesktopCollapsed ? 'hidden' : 'block'}`}>
                        {item.name}
                      </span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className={`border-t border-slate-200 p-4 ${isDesktopCollapsed ? 'text-center' : ''}`}>
            <div className={`text-xs text-slate-500 ${isDesktopCollapsed ? 'hidden' : 'text-center'}`}>
              {t.sidebar.version}
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;