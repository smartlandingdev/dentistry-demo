import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Bell, Search, User, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppointment } from '../contexts/AppointmentContext';
import type { Language } from '../locales';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { openModal } = useAppointment();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'pt-br', name: 'Português (BR)', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setShowLanguageDropdown(false);
  };

  return (
    <motion.header
      className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 sticky top-0 z-40 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1A365D] to-[#3B82F6] rounded-xl flex items-center justify-center shadow-md">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
                  {t.header.title}
                </h1>
                <p className="text-sm text-gray-500">{t.header.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 min-w-80 focus-within:ring-2 focus-within:ring-[#3B82F6] focus-within:border-transparent transition-all">
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder={t.header.searchPlaceholder}
                className="bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-400 w-full"
              />
            </div>

            <div className="relative">
              <motion.button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                title={t.settings.language.current}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{currentLanguage?.flag}</span>
                <ChevronDown className="w-3 h-3" />
              </motion.button>

              <AnimatePresence>
                {showLanguageDropdown && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 py-2 shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center space-x-3 transition-colors ${
                          language === lang.code
                            ? 'bg-gradient-to-r from-[#1A365D] to-[#3B82F6] text-white'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              className="relative p-2.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              title={t.header.notifications}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-[#1A365D] to-[#3B82F6] rounded-full"></span>
            </motion.button>

            <motion.button
              onClick={openModal}
              className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] hover:shadow-lg text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.header.newAppointment}
            </motion.button>

            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:shadow-md transition-all"
              title={t.header.profile}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-5 h-5 text-gray-700" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
