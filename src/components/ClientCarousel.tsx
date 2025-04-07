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
      <div className="absolute top-0 right-0 w-1/4 h-64 bg-gradient-to-l from-[#060623] to-transparent opacity-50 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-1/4 h-64 bg-gradient-to-r from-[#060623] to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto max-w-7xl px-4 py-16 pt-28">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 mb-4">
              <Star className="w-3 h-3 text-cyan-400 mr-2" />
              <span className="text-xs text-cyan-400 font-medium">TRUSTED PARTNERS</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Clients</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We're proud to work with forward-thinking businesses across various industries. Our collaborative approach has helped these brands achieve their digital goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 flex items-center justify-center mr-3">
                  <Award className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">40+</h4>
                  <p className="text-gray-400 text-sm">Projects</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 flex items-center justify-center mr-3">
                  <Award className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">98%</h4>
                  <p className="text-gray-400 text-sm">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/20 transition-colors duration-300 backdrop-blur-sm">
            <div className="pl-3 border-l-2 border-cyan-500/30">
              <p className="text-gray-300/90 italic text-lg mb-6">
                "Their ability to understand our brand and translate it into a stunning digital experience was impressive. The team was responsive and professional throughout the entire process."
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/10 mr-3 flex items-center justify-center">
                <span className="text-cyan-400 font-bold">V</span>
              </div>
              <div>
                <p className="text-white font-medium">Marketing Director</p>
                <p className="text-cyan-400/80 text-sm">VIVI</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carousel section with custom design */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
            <div className="inline-block px-6 py-2 bg-gradient-to-b from-[#060623] via-[#050725] to-[#050725] text-white/60 text-sm font-medium tracking-wider uppercase">
              Our Partners
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-14">
            {/* Carousel container with mask */}
            <div className="relative overflow-hidden">
              {/* Stronger fade gradients at edges */}
              <div className="absolute left-0 top-0 z-10 h-full w-[120px] bg-gradient-to-r from-[#060623] via-[#060623]/90 to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 z-10 h-full w-[120px] bg-gradient-to-l from-[#060623] via-[#060623]/90 to-transparent pointer-events-none"></div>
              
              {/* Carousel content */}
              <div className="flex space-x-16 animate-scroll py-8">
                {[...clients, ...clients, ...clients].map((client, index) => (
                  <motion.div 
                    key={`${client.id}-${index}`}
                    className="flex-none md:w-[160px] w-[120px] transition-all duration-1000 ease-out mx-3"
                  >
                    <div className="bg-white/[0.02] rounded-xl p-5 md:h-28 h-24 flex items-center justify-center transition-all duration-300 border border-white/5">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain filter brightness-110"
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
      </div>
    </section> 
  );
}
