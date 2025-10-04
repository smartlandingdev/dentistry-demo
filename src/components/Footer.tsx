import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  isSidebarCollapsed?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isSidebarCollapsed = false }) => {
  const { t } = useLanguage();

  return (
    <footer className={`bg-[#E8E4DF] border-t border-[#1C1C1C]/20 mt-auto transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="text-center text-sm text-[#A8A29E]">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
