import React from 'react';

const clients = [
  {
    id: 1,
    name: "Frecnh 'G",
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
    logo: "make it green.png",
  },
];

export default function ClientCarousel() {
  return (
    <section className="relative rounded-2xl mx-auto bg-gradient-to-r from-[#060623]/50 via-[#000000]/80 to-[#060623]/50 pl-2 pr-5 overflow-hidden">
      <div className="mx-auto grid grid-cols-4 gap-0 items-center">
        {/* Texto à esquerda */}
        <div className="md:col-span-1 col-span-2 xl:px-20 pl-1 text-center md:text-left pr-1">
          <h2 className="text-white md:text-base text-xs font-light">Companys</h2>
          <h3 className="text-white md:text-base text-xs font-light">that <span className='text-cyan-400'>trusted</span> in us:</h3>
        </div>
        
        {/* Animação à direita */}
        <div className="md:col-span-3 col-span-2 relative overflow-hidden pb-4">
          <div className="absolute left-0 top-0 z-10 h-full w-[100px] to-transparent"></div>
          <div className="absolute right-0 top-0 z-10 h-full w-[100px] to-transparent"></div>  
          <div className="flex space-x-2 animate-scroll">
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div 
                key={`${client.id}-${index}`}
                className="flex-none md:w-[200px] w-[120px] transition-opacity duration-1000 ease-out">
                <div className="bg-transparent md:h-32 h-16 flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="text-white/80 text-sm font-light">{client.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section> 
  );
}
