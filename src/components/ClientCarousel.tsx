import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const clients = [
  {
    id: 1,
    name: "French 'G",
    logo: "/French G.png",
    industry: "Fashion"
  },
  {
    id: 2,
    name: "VIVI",
    logo: "/vivi.png",
    industry: "Retail"
  },
  {
    id: 3,
    name: "Atlantic Jewels",
    logo: "/Jewels.png",
    industry: "Luxury"
  },
  {
    id: 4,
    name: "FitKet",
    logo: "/FitKet.png",
    industry: "Fitness"
  },
  {
    id: 5,
    name: "Make it green",
    logo: "/make it green.png",
    industry: "Sustainability"
  },
];

export default function ClientCarousel() {
  return (
    <section className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -left-40 -top-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -right-40 -bottom-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 mb-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-4 py-1.5 rounded-full">
            <Star className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Trusted Partners</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Trusted by <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Industry Leaders</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our portfolio of satisfied clients spans multiple industries and regions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {[
            { number: "40+", label: "Projects Completed" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "15+", label: "Countries Served" },
            { number: "24/7", label: "Dedicated Support" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </p>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative overflow-hidden">
          <h3 className="text-xl font-semibold mb-8 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Featured</span> Partners
          </h3>
          
          {/* Gradient overlays for carousel */}
          <div className="absolute left-0 top-0 z-10 h-full w-[120px] bg-gradient-to-r from-[#050725] to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 z-10 h-full w-[120px] bg-gradient-to-l from-[#050725] to-transparent pointer-events-none"></div>
          
          <div className="flex space-x-10 animate-scroll">
            {[...clients, ...clients, ...clients].map((client, index) => (
              <motion.div 
                key={`${client.id}-${index}`}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="flex-none md:w-[200px] w-[150px] transition-all duration-1000 ease-out"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-5 md:h-32 h-24 flex items-center justify-center backdrop-blur-sm hover:shadow-xl hover:shadow-cyan-500/5 transition-all border border-white/5">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain filter brightness-110"
                  />
                </div>
                <div className="text-center mt-3">
                  <p className="text-white font-medium text-sm">{client.name}</p>
                  <p className="text-cyan-400/80 text-xs">{client.industry}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 rounded-lg text-white font-medium transition-all group"
          >
            <span>Join our list of trusted partners</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section> 
  );
}
