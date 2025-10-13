import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Calendar, Users, Settings, Menu, X, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  onToggleCollapse?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggleCollapse }) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const Button = isMobile ? 'button' : motion.button;
  const Container = isMobile ? 'div' : motion.div;

  return (
    <>
      <Button
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 text-gray-700 bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
        onClick={toggleMobileMenu}
        {...(!isMobile && { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 } })}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      <Container
        className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-100 shadow-xl transition-all duration-300 ease-in-out ${
          isDesktopCollapsed ? 'w-20' : 'w-64'
        } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        {...(!isMobile && { initial: { x: -300 }, animate: { x: 0 } })}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 px-4 py-6">
            <div className="mt-16 md:mt-8">
              <div className="hidden md:flex justify-between items-center mb-8 px-4">
                {!isDesktopCollapsed && (
                  <h2 className="text-lg font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
                    SmileCare
                  </h2>
                )}
                <Button
                  onClick={toggleDesktopSidebar}
                  className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  title={isDesktopCollapsed ? t.sidebar.expandSidebar : t.sidebar.collapseSidebar}
                  {...(!isMobile && { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 } })}
                >
                  <ChevronLeft
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDesktopCollapsed ? 'rotate-180' : ''
                    }`}
                  />
                </Button>
              </div>

              <nav className="space-y-1.5">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  const LinkWrapper = isMobile ? 'div' : motion.div;
                  return (
                    <LinkWrapper
                      key={item.name}
                      {...(!isMobile && {
                        initial: { opacity: 0, x: -20 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: index * 0.05 }
                      })}
                    >
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-[#1A365D] to-[#3B82F6] text-white shadow-lg'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                        title={isDesktopCollapsed ? item.name : ''}
                      >
                        {({ isActive }) => (
                          <Container
                            className="flex items-center w-full"
                            {...(!isMobile && { whileHover: { x: isActive ? 0 : 4 } })}
                          >
                            <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                            <span className={`${isDesktopCollapsed ? 'hidden' : 'block'}`}>
                              {item.name}
                            </span>
                          </Container>
                        )}
                      </NavLink>
                    </LinkWrapper>
                  );
                })}
              </nav>
            </div>
          </div>

          <div
            className={`border-t border-gray-100 p-4 ${isDesktopCollapsed ? 'text-center' : ''}`}
          >
            <div className={`text-xs text-gray-400 ${isDesktopCollapsed ? 'hidden' : 'text-center'}`}>
              {t.sidebar.version}
            </div>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm md:hidden"
            onClick={toggleMobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
