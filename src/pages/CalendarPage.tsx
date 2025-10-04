import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Calendar from '../components/Calendar';

const CalendarPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-3 md:p-6 max-w-full">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1C1C1C]">{t.calendar.title}</h1>
        <p className="text-sm md:text-base text-[#A8A29E] mt-2">
          {t.calendar.subtitle}
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <Calendar />
      </div>
    </div>
  );
};

export default CalendarPage;
