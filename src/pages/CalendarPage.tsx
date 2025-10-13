import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import Calendar from '../components/Calendar';

const CalendarPage: React.FC = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const Container = isMobile ? 'div' : motion.div;

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Cabeçalho */}
      <Container className="mb-6 sm:mb-8" {...(!isMobile && { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } })}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1A365D] to-[#3B82F6] bg-clip-text text-transparent">
          {t.calendar.title}
        </h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
          {t.calendar.subtitle}
        </p>
      </Container>

      {/* Calendar Container */}
      <Container className="w-full overflow-hidden" {...(!isMobile && { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 } })}>
        <Calendar />
      </Container>
    </div>
  );
};

export default CalendarPage;
