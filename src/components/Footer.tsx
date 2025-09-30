import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  isSidebarCollapsed?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isSidebarCollapsed = false }) => {
  const { t } = useLanguage();

  return (
    <footer className={`bg-white/80 backdrop-blur-sm border-t border-slate-200 mt-auto transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="text-center text-sm text-slate-500">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;