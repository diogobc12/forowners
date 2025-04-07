import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Star } from 'lucide-react';

const clients = [
  {
    id: 1,
    name: "French 'G",
    logo: "/French G.png",
  },
  {
    id: 2,
    name: "VIVI",
    logo: "/vivi.png",
  },
  {
    id: 3,
    name: "Atlantic Jewels",
    logo: "/Jewels.png",
  },
  {
    id: 4,
    name: "FitKet",
    logo: "/FitKet.png",
  },
  {
    id: 5,
    name: "Make it green",
    logo: "/make it green.png",
  },
];

export default function ClientCarousel() {
  return (
    <section className="bg-gradient-to-b from-[#060623] via-[#050725] to-[#040620] -mt-4 relative">
      {/* Side gradient overlays for smooth transition */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/4 h-64 bg-gradient-to-l from-[#060623] to-transparent opacity-50 pointer-events-none transform-gpu"></div>
        <div className="absolute top-0 left-0 w-1/4 h-64 bg-gradient-to-r from-[#060623] to-transparent opacity-50 pointer-events-none transform-gpu"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#040620] to-transparent pointer-events-none transform-gpu"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium mb-3 inline-block transform-gpu">
            TRUSTED PARTNERS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Our <span className="text-blue-300">Clients</span>
          </h2>
          <div className="w-20 h-1 bg-blue-400/20 mx-auto"></div>
        </div>

        <div className="max-w-7xl mx-auto overflow-hidden">
          <div className="relative">
            <div className="flex space-x-16 animate-scroll py-8">
              {[...clients, ...clients, ...clients].map((client, index) => (
                <motion.div 
                  key={`${client.id}-${index}`}
                  className="flex-none md:w-[160px] w-[120px] transition-all duration-1000 ease-out mx-3 transform-gpu"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white/[0.02] rounded-xl p-5 md:h-28 h-24 flex items-center justify-center transition-all duration-300 border border-white/5 hover:border-blue-300/10 transform-gpu backface-hidden">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-full max-w-full object-contain filter brightness-110 transform-gpu"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <p className="text-white/70 font-medium text-xs tracking-wide">{client.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
