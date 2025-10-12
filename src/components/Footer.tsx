import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  isSidebarCollapsed?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isSidebarCollapsed = false }) => {
  const { t } = useLanguage();

  return (
    <motion.footer
      className={`bg-white border-t border-gray-100 mt-auto transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-full mx-auto px-6 py-6">
        <div className="text-center text-sm text-gray-600 font-medium">
          {t.footer.copyright}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
