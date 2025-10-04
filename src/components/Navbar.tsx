import React, { useState } from 'react';
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
    <header className="bg-[#F2EFEA] border-b border-[#1C1C1C]/20 px-6 py-4 sticky top-0 z-40">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#1C1C1C] flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#F2EFEA]" strokeWidth={1.5} />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-[#1C1C1C]">
                  {t.header.title}
                </h1>
                <p className="text-sm text-[#A8A29E]">{t.header.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-[#E8E4DF] border border-[#1C1C1C]/20 px-3 py-2 min-w-80">
              <Search className="w-4 h-4 text-[#A8A29E] mr-2" strokeWidth={1.5} />
              <input
                type="text"
                placeholder={t.header.searchPlaceholder}
                className="bg-transparent border-none outline-none text-sm text-[#1C1C1C] placeholder-[#A8A29E] w-full"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-2 px-3 py-2 text-[#1C1C1C] hover:text-[#A8A29E] transition-colors"
                title={t.settings.language.current}
              >
                <Globe className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm">{currentLanguage?.flag}</span>
                <ChevronDown className="w-3 h-3" strokeWidth={1.5} />
              </button>

              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-[#E8E4DF] border border-[#1C1C1C]/20 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#D6CBB8] flex items-center space-x-3 ${
                        language === lang.code ? 'bg-[#1C1C1C] text-[#F2EFEA]' : 'text-[#1C1C1C]'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="relative p-2 text-[#A8A29E] hover:text-[#1C1C1C] transition-colors"
              title={t.header.notifications}
            >
              <Bell className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#1C1C1C] rounded-full"></span>
            </button>

            <button
              onClick={openModal}
              className="bg-[#1C1C1C] hover:bg-[#A8A29E] text-[#F2EFEA] px-6 py-2 text-sm font-medium transition-all duration-300"
            >
              {t.header.newAppointment}
            </button>

            <div className="w-8 h-8 border border-[#1C1C1C]/20 flex items-center justify-center cursor-pointer hover:bg-[#E8E4DF] transition-colors" title={t.header.profile}>
              <User className="w-4 h-4 text-[#1C1C1C]" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
