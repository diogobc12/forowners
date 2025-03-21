import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-slate-900 md:p-8 p-6 rounded-2xl transition-transform hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-800/30">
      <div className="text-cyan-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  );
}