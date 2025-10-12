import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Clock, Palette, Bell } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Settings: React.FC = () => {
  const { t } = useLanguage();
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

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Cabeçalho */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
          {t.settings.title}
        </h1>
        <p className="text-gray-600 mt-2 text-lg">{t.settings.subtitle}</p>
      </motion.div>

      <div className="max-w-4xl space-y-8">
        {/* Business Info */}
        <motion.div
          className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t.settings.businessInfo.title}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.settings.businessInfo.businessName}
              </label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
              />
            </div>
          </div>
        </motion.div>

        {/* Business Hours */}
        <motion.div
          className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3">
              <Clock className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t.settings.businessHours.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.settings.businessHours.startTime}
              </label>
              <input
                type="time"
                value={settings.businessHours.start}
                onChange={(e) => handleNestedInputChange('businessHours', 'start', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.settings.businessHours.endTime}
              </label>
              <input
                type="time"
                value={settings.businessHours.end}
                onChange={(e) => handleNestedInputChange('businessHours', 'end', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              {t.settings.businessHours.workingDays}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {Object.entries(settings.workingDays).map(([day, enabled]) => (
                <label key={day} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => handleNestedInputChange('workingDays', day, e.target.checked)}
                    className="w-4 h-4 border-gray-300 text-[#3B82F6] focus:ring-[#3B82F6] rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 font-medium capitalize">{t.settings.businessHours.days[day as keyof typeof t.settings.businessHours.days]?.substring(0, 3)}</span>
                </label>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
              <Bell className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t.settings.notifications.title}</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([type, enabled]) => (
              <label key={type} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => handleNestedInputChange('notifications', type, e.target.checked)}
                    className="w-4 h-4 border-gray-300 text-[#3B82F6] focus:ring-[#3B82F6] rounded"
                  />
                  <span className="ml-3 text-sm font-semibold text-gray-900 capitalize">
                    {t.settings.notifications[type as keyof typeof t.settings.notifications] || `${type} Notifications`}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Appearance */}
        <motion.div
          className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-3">
              <Palette className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t.settings.appearance.title}</h2>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {t.settings.appearance.theme}
            </label>
            <select
              value={settings.theme}
              onChange={(e) => handleInputChange('theme', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
            >
              <option value="light">{t.settings.appearance.themes.light}</option>
              <option value="dark">{t.settings.appearance.themes.dark}</option>
              <option value="auto">{t.settings.appearance.themes.auto}</option>
            </select>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            onClick={handleSave}
            className="bg-gradient-to-r from-[#1A365D] to-[#3B82F6] hover:shadow-2xl text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Save className="w-5 h-5" strokeWidth={1.5} />
            {t.settings.saveSettings}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
