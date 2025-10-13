import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Clock, Palette, Bell } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Settings: React.FC = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [settings, setSettings] = useState({
    businessName: t.header.title,
    businessHours: {
      start: '08:00',
      end: '20:00',
    },
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
    notifications: {
      email: true,
      sms: false,
      desktop: true,
    },
    theme: 'light',
  });

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as object),
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
  };

  const Container = isMobile ? 'div' : motion.div;
  const Button = isMobile ? 'button' : motion.button;

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Cabeçalho */}
      <Container className="mb-6 sm:mb-8" {...(!isMobile && { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } })}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
          {t.settings.title}
        </h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">{t.settings.subtitle}</p>
      </Container>

      <div className="max-w-4xl space-y-4 sm:space-y-6 md:space-y-8">
        {/* Business Info */}
        <Container className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 shadow-lg p-4 sm:p-6 md:p-8" {...(!isMobile && { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 } })}>
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{t.settings.businessInfo.title}</h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                {t.settings.businessInfo.businessName}
              </label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 bg-gray-50 text-gray-900 text-sm sm:text-base rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
              />
            </div>
          </div>
        </Container>

        {/* Business Hours */}
        <Container className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 shadow-lg p-4 sm:p-6 md:p-8" {...(!isMobile && { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 } })}>
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{t.settings.businessHours.title}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                {t.settings.businessHours.startTime}
              </label>
              <input
                type="time"
                value={settings.businessHours.start}
                onChange={(e) => handleNestedInputChange('businessHours', 'start', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 bg-gray-50 text-gray-900 text-sm sm:text-base rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                {t.settings.businessHours.endTime}
              </label>
              <input
                type="time"
                value={settings.businessHours.end}
                onChange={(e) => handleNestedInputChange('businessHours', 'end', e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 bg-gray-50 text-gray-900 text-sm sm:text-base rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4">
              {t.settings.businessHours.workingDays}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
              {Object.entries(settings.workingDays).map(([day, enabled]) => (
                <label key={day} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => handleNestedInputChange('workingDays', day, e.target.checked)}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-gray-300 text-[#3B82F6] focus:ring-[#3B82F6] rounded"
                  />
                  <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700 font-medium capitalize">{t.settings.businessHours.days[day as keyof typeof t.settings.businessHours.days]?.substring(0, 3)}</span>
                </label>
              ))}
            </div>
          </div>
        </Container>

        {/* Notifications */}
        <Container className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 shadow-lg p-4 sm:p-6 md:p-8" {...(!isMobile && { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.3 } })}>
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{t.settings.notifications.title}</h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {Object.entries(settings.notifications).map(([type, enabled]) => (
              <label key={type} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => handleNestedInputChange('notifications', type, e.target.checked)}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-gray-300 text-[#3B82F6] focus:ring-[#3B82F6] rounded"
                  />
                  <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-semibold text-gray-900 capitalize">
                    {t.settings.notifications[type as keyof typeof t.settings.notifications] || `${type} Notifications`}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </Container>

        {/* Appearance */}
        <Container className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-100 shadow-lg p-4 sm:p-6 md:p-8" {...(!isMobile && { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.4 } })}>
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3">
              <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{t.settings.appearance.title}</h2>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              {t.settings.appearance.theme}
            </label>
            <select
              value={settings.theme}
              onChange={(e) => handleInputChange('theme', e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 bg-gray-50 text-gray-900 text-sm sm:text-base rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
            >
              <option value="light">{t.settings.appearance.themes.light}</option>
              <option value="dark">{t.settings.appearance.themes.dark}</option>
              <option value="auto">{t.settings.appearance.themes.auto}</option>
            </select>
          </div>
        </Container>

        {/* Save Button */}
        <Container className="flex justify-end" {...(!isMobile && { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: 0.5 } })}>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] hover:shadow-2xl text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 sm:gap-3"
            {...(!isMobile && { whileHover: { scale: 1.02, y: -2 }, whileTap: { scale: 0.98 } })}
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
            {t.settings.saveSettings}
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Settings;
