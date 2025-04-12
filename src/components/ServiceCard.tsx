import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ServiceCardProps {
  icon: React.ReactNode;
  translationKey: string;
}

export function ServiceCard({ icon, translationKey }: ServiceCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-white/5 rounded-xl p-4 sm:p-6 hover:bg-gradient-to-br from-cyan-500/10 to-blue-500/10 transition-all duration-300 border border-white/5"
    >
      <div className="mb-3 sm:mb-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-r from-cyan-400/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-400/30 group-hover:to-blue-500/30 transition-all duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{t(`services.${translationKey}.title`)}</h3>
      <p className="text-gray-400 text-xs sm:text-sm mb-4">{t(`services.${translationKey}.description`)}</p>
      <a href="#contact" className="inline-flex items-center text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
        {t('services.requestService')} <ArrowRight className="ml-1 w-4 h-4" />
      </a>
    </motion.div>
  );
}