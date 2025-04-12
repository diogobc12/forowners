import React from 'react';
import { Mail, Instagram } from 'lucide-react';
import logo from "/src/assets/logo.png"; 
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="relative pt-24 pb-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-20"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap justify-between">
          {/* Contact Section */}
          <div className="w-full lg:w-5/12 px-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <img src={logo} alt="ForOwners Logo" className="h-6 w-auto mb-6" />
            <h4 className="text-2xl font-semibold">{t('footer.keepInTouch')}</h4>
            <h5 className="text-lg mt-0 mb-2 text-gray-400">
              {t('footer.findUs')}
            </h5>
            <div className="mt-6 flex gap-4">
              <a 
                href="mailto:agency@forowners.co" 
                className="bg-white/[0.03] hover:bg-blue-400/5 border border-white/5 hover:border-blue-300/10 text-blue-300 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none flex transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/forowners" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/[0.03] hover:bg-blue-400/5 border border-white/5 hover:border-blue-300/10 text-blue-300 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none flex transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Useful Links Section */}
          <div className="w-full lg:w-3/12 px-4 mt-8 lg:mt-0">
            <div className="flex flex-col items-center lg:items-end">
              <span className="block uppercase text-sm font-semibold mb-4">{t('footer.usefulLinks')}</span>
              <ul className="flex flex-wrap justify-center lg:block gap-4 lg:gap-0 lg:text-right">
                <li className="lg:block">
                  <a className="text-gray-400 hover:text-blue-300 inline-block lg:block pb-2 text-sm px-2 lg:px-0" href="#services">{t('navigation.services')}</a>
                </li>
                <li className="lg:block">
                  <a className="text-gray-400 hover:text-blue-300 inline-block lg:block pb-2 text-sm px-2 lg:px-0" href="#why-us">{t('navigation.whyUs')}</a>
                </li>
                <li className="lg:block">
                  <a className="text-gray-400 hover:text-blue-300 inline-block lg:block pb-2 text-sm px-2 lg:px-0" href="#contact">{t('navigation.contact')}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-white/5" />
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-400 py-1">
              {t('footer.copyright')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;