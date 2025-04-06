import React from 'react';
import { motion } from 'framer-motion';

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
    <section className="relative mx-auto overflow-hidden py-16 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Trusted by <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Leading Companies</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Partnering with brands who value quality and innovation
          </p>
        </motion.div>

        <div className="mx-auto grid lg:grid-cols-8 gap-0 items-center">
          {/* Description area */}
          <div className="lg:col-span-2 lg:items-center lg:justify-center lg:flex col-span-2 xl:px-20 pl-1 text-center lg:text-left pr-1 py-5 lg:py-0 w-full h-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-white lg:text-xl text-lg font-medium">
                Trusted partnerships <span className="text-cyan-400">worldwide</span>
              </h3>
              <p className="text-gray-400 text-sm">
                Our clients range from startups to established enterprises across various industries
              </p>
              <div className="hidden lg:block">
                <a href="#contact" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
                  <span className="border-b border-cyan-400">Join our client list</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
          
          {/* Carousel area */}
          <div className="lg:col-span-6 col-span-2 relative overflow-hidden pb-4">
            <div className="absolute right-0 top-0 z-10 h-full w-[100px] bg-gradient-to-l from-black to-transparent"></div>
            <div className="absolute left-0 top-0 z-10 h-full w-[100px] bg-gradient-to-r from-black to-transparent"></div>
            
            <div className="flex space-x-8 animate-scroll">
              {[...clients, ...clients, ...clients].map((client, index) => (
                <motion.div 
                  key={`${client.id}-${index}`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="flex-none md:w-[220px] w-[150px] transition-all duration-1000 ease-out"
                >
                  <div className="bg-white/5 rounded-lg p-4 md:h-36 h-24 flex items-center justify-center backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-full max-w-full object-contain filter brightness-100"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <p className="text-white/80 text-sm font-medium">{client.name}</p>
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
