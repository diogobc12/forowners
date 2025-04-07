import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="group relative rounded-xl overflow-hidden h-full">
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10"></div>
      <div className="absolute inset-0.5 bg-slate-900 rounded-xl -z-5"></div>
      
      <div className="bg-slate-900/80 backdrop-blur-sm p-3 sm:p-5 rounded-xl transition-all duration-300 
        group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-sky-800/20 relative z-10 h-full flex flex-col">
        
        {/* Icon with glow effect */}
        <div className="text-cyan-400 mb-2 sm:mb-4 transition-all duration-300 
          group-hover:text-cyan-300 group-hover:scale-110 transform-gpu relative">
          <div className="w-5 h-5 sm:w-auto sm:h-auto">
            {icon}
          </div>
          <div className="absolute inset-0 bg-cyan-400/20 filter blur-xl rounded-full scale-0 group-hover:scale-125 transition-transform duration-300 -z-10"></div>
        </div>
        
        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-300 group-hover:text-slate-200 transition-colors duration-300 flex-grow">{description}</p>
      </div>
    </div>
  );
}