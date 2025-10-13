import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Bell, Search, User, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppointment } from '../contexts/AppointmentContext';
import type { Language } from '../locales';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { openModal } = useAppointment();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'pt-br', name: 'Português (BR)', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setShowLanguageDropdown(false);
  };

  const Container = isMobile ? 'header' : motion.header;
  const Button = isMobile ? 'button' : motion.button;
  const Div = isMobile ? 'div' : motion.div;

  return (
    <Container
      className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-3 sm:px-6 py-3 sm:py-4 sticky top-0 z-40 shadow-sm"
      {...(!isMobile && { initial: { y: -100 }, animate: { y: 0 }, transition: { duration: 0.3 } })}
    >
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#1A365D] to-[#3B82F6] rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="ml-2 sm:ml-4">
                <h1 className="text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
                  {t.header.title}
                </h1>
                <p className="hidden sm:block text-xs sm:text-sm text-gray-500">{t.header.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 min-w-80 focus-within:ring-2 focus-within:ring-[#3B82F6] focus-within:border-transparent transition-all">
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder={t.header.searchPlaceholder}
                className="bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-400 w-full"
              />
            </div>

            <div className="relative">
              <Button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                title={t.settings.language.current}
                {...(!isMobile && { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } })}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{currentLanguage?.flag}</span>
                <ChevronDown className="w-3 h-3" />
              </Button>

              <AnimatePresence>
                {showLanguageDropdown && (
                  <Div
                    className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-lg border border-gray-100 py-2 shadow-xl overflow-hidden"
                    {...(!isMobile && {
                      initial: { opacity: 0, y: -10 },
                      animate: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -10 },
                      transition: { duration: 0.2 }
                    })}
                  >
                    {languages.map((lang) => {
                      const LangButton = isMobile ? 'button' : motion.button;
                      return (
                        <LangButton
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full text-left px-3 sm:px-4 py-2 text-sm flex items-center space-x-2 sm:space-x-3 transition-colors ${
                            language === lang.code
                              ? 'bg-gradient-to-r from-[#1A365D] to-[#3B82F6] text-white'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          {...(!isMobile && { whileHover: { x: 4 } })}
                        >
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </LangButton>
                      );
                    })}
                  </Div>
                )}
              </AnimatePresence>
            </div>

            <Button
              className="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              title={t.header.notifications}
              {...(!isMobile && { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 } })}
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] rounded-full"></span>
            </Button>

            <Button
              onClick={openModal}
              className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] hover:shadow-lg text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300"
              {...(!isMobile && { whileHover: { scale: 1.05, y: -2 }, whileTap: { scale: 0.95 } })}
            >
              <span className="hidden sm:inline">{t.header.newAppointment}</span>
              <span className="sm:hidden">+</span>
            </Button>

            <Div
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer hover:shadow-md transition-all"
              title={t.header.profile}
              {...(!isMobile && { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 } })}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </Div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Header;
