import React, { useCallback } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import logo from "/src/assets/logo.png";
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  scrolled: boolean;
}

export function Navigation({ scrolled }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t, toggleLanguage, language } = useLanguage();

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <nav className="fixed z-50 transition-all duration-300 sm:p-5 mt-3 flex justify-center w-full">
      <div 
        className={`transition-all duration-300 flex flex-col justify-between items-center ${
          scrolled || isOpen ? 'bg-slate-900/90 backdrop-blur-sm shadow-lg w-[95%] sm:w-[80%] sm:py-1 py-0 px-6 sm:px-8 rounded-lg scale-100 origin-center' : 'bg-transparent w-[90%] sm:w-[70%] scale-95 origin-center' 
        }`}
      >
        <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center h-16 sm:h-20 relative w-full">
          <a href="#hero" className="flex items-center">
            <img src={logo} alt="ForOwners Logo" className="h-5 sm:h-7 w-auto" />
          </a>
          
          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleLanguage}
              className="text-white focus:outline-none p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1"
              aria-label="Toggle language"
              title={language === 'en' ? 'Mudar para Português' : 'Change to English'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium">{language === 'en' ? 'EN' : 'PT'}</span>
            </button>
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              title={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#services" className="text-white hover:text-blue-300 transition-colors">{t('navigation.services')}</a>
            <a href="#why-us" className="text-white hover:text-blue-300 transition-colors">{t('navigation.whyUs')}</a>
            <a href="#contact" className="text-white hover:text-blue-300 transition-colors">{t('navigation.contact')}</a>
            <button
              onClick={toggleLanguage}
              className="text-white focus:outline-none px-3 py-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1.5"
              aria-label="Toggle language"
              title={language === 'en' ? 'Mudar para Português' : 'Change to English'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'PT'}</span>
            </button>
            <a href="#contact" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg">
              {t('navigation.getInTouch')}
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden w-full overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 rounded-b-lg space-y-4">
            <a 
              href="#services" 
              className="block text-white hover:text-blue-300 transition-colors py-2"
              onClick={toggleMenu}
            >
              {t('navigation.services')}
            </a>
            <a 
              href="#why-us" 
              className="block text-white hover:text-blue-300 transition-colors py-2"
              onClick={toggleMenu}
            >
              {t('navigation.whyUs')}
            </a>
            <a 
              href="#contact" 
              className="block text-white hover:text-blue-300 transition-colors py-2"
              onClick={toggleMenu}
            >
              {t('navigation.contact')}
            </a>
            <a 
              href="#contact" 
              className="block px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg text-center"
              onClick={toggleMenu}
            >
              {t('navigation.getInTouch')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
