import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import Calendar from '../components/Calendar';

const CalendarPage: React.FC = () => {
  const { t } = useLanguage();

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
          {t.calendar.title}
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          {t.calendar.subtitle}
        </p>
      </motion.div>

      {/* Calendar Container */}
      <motion.div
        className="w-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Calendar />
      </motion.div>
    </div>
  );
};

export default CalendarPage;
