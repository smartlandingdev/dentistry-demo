import React, { useState } from 'react';
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
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1C1C1C]">{t.settings.title}</h1>
        <p className="text-[#A8A29E] mt-2">{t.settings.subtitle}</p>
      </div>

      <div className="max-w-4xl space-y-8">
        <div className="bg-[#E8E4DF] border border-[#1C1C1C]/20 p-6">
          <div className="flex items-center mb-6">
            <User className="w-5 h-5 text-[#A8A29E] mr-2" strokeWidth={1.5} />
            <h2 className="text-xl font-semibold text-[#1C1C1C]">{t.settings.businessInfo.title}</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1C1C1C] mb-2">
                {t.settings.businessInfo.businessName}
              </label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="w-full px-3 py-2 border border-[#1C1C1C]/20 bg-[#F2EFEA] text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C]"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#E8E4DF] border border-[#1C1C1C]/20 p-6">
          <div className="flex items-center mb-6">
            <Clock className="w-5 h-5 text-[#A8A29E] mr-2" strokeWidth={1.5} />
            <h2 className="text-xl font-semibold text-[#1C1C1C]">{t.settings.businessHours.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#1C1C1C] mb-2">
                {t.settings.businessHours.startTime}
              </label>
              <input
                type="time"
                value={settings.businessHours.start}
                onChange={(e) => handleNestedInputChange('businessHours', 'start', e.target.value)}
                className="w-full px-3 py-2 border border-[#1C1C1C]/20 bg-[#F2EFEA] text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1C1C1C] mb-2">
                {t.settings.businessHours.endTime}
              </label>
              <input
                type="time"
                value={settings.businessHours.end}
                onChange={(e) => handleNestedInputChange('businessHours', 'end', e.target.value)}
                className="w-full px-3 py-2 border border-[#1C1C1C]/20 bg-[#F2EFEA] text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C1C1C] mb-3">
              {t.settings.businessHours.workingDays}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {Object.entries(settings.workingDays).map(([day, enabled]) => (
                <label key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => handleNestedInputChange('workingDays', day, e.target.checked)}
                    className="border-[#1C1C1C]/20 text-[#1C1C1C] focus:ring-[#1C1C1C]"
                  />
                  <span className="ml-2 text-sm text-[#1C1C1C] capitalize">{t.settings.businessHours.days[day as keyof typeof t.settings.businessHours.days]?.substring(0, 3)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#E8E4DF] border border-[#1C1C1C]/20 p-6">
          <div className="flex items-center mb-6">
            <Bell className="w-5 h-5 text-[#A8A29E] mr-2" strokeWidth={1.5} />
            <h2 className="text-xl font-semibold text-[#1C1C1C]">{t.settings.notifications.title}</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([type, enabled]) => (
              <label key={type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => handleNestedInputChange('notifications', type, e.target.checked)}
                    className="border-[#1C1C1C]/20 text-[#1C1C1C] focus:ring-[#1C1C1C]"
                  />
                  <span className="ml-3 text-sm font-medium text-[#1C1C1C] capitalize">
                    {t.settings.notifications[type as keyof typeof t.settings.notifications] || `${type} Notifications`}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-[#E8E4DF] border border-[#1C1C1C]/20 p-6">
          <div className="flex items-center mb-6">
            <Palette className="w-5 h-5 text-[#A8A29E] mr-2" strokeWidth={1.5} />
            <h2 className="text-xl font-semibold text-[#1C1C1C]">{t.settings.appearance.title}</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C1C1C] mb-3">
              {t.settings.appearance.theme}
            </label>
            <select
              value={settings.theme}
              onChange={(e) => handleInputChange('theme', e.target.value)}
              className="w-full px-3 py-2 border border-[#1C1C1C]/20 bg-[#F2EFEA] text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C]"
            >
              <option value="light">{t.settings.appearance.themes.light}</option>
              <option value="dark">{t.settings.appearance.themes.dark}</option>
              <option value="auto">{t.settings.appearance.themes.auto}</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#1C1C1C] hover:bg-[#A8A29E] text-[#F2EFEA] px-6 py-2 font-medium transition-all duration-200 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" strokeWidth={1.5} />
            {t.settings.saveSettings}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
