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
    <section className="relative sm:rounded-2xl mx-auto bg-gradient-to-r from-[#060623]/50 via-[#000000]/80 to-[#060623]/50 overflow-hidden">
      <div className="mx-auto grid lg:grid-cols-4 gap-0 items-center ">
        {/* Texto à esquerda */}
        <div className="lg:col-span-1 lg:items-center lg:justify-center lg:flex col-span-2 xl:px-20 pl-1 text-center lg:text-left pr-1 py-5 lg:py-0 w-full h-full lg:bg-gradient-to-l lg:from-[#02020a] lg:to-[#060623]/50">
          <h2 className="text-white lg:text-base text-lg font-light">Companys that <span className='text-cyan-400'>trusted</span> in us</h2>
        </div>
        
        {/* Animação à direita */}
        <div className="lg:col-span-3 col-span-2 relative overflow-hidden pb-4">
        <div className="absolute right-0 top-0 z-10 h-full w-[100px]  sm:bg-gradient-to-l sm:from-[#02020a] sm:to-transparent lg:z-10 lg:bg-none"></div>
          <div className="absolute left-0 top-0 z-10 h-full w-[100px]  sm:bg-gradient-to-r sm:from-[#02020a] sm:to-transparent sm:z-10"></div>
          <div className="flex space-x-2 animate-scroll ">
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div 
                key={`${client.id}-${index}`}
                className="flex-none md:w-[200px] w-[120px] transition-all duration-1000 ease-out">
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
