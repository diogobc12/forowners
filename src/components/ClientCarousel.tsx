import React, { memo } from 'react';

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

// Componente de item memoizado para evitar re-renderizações desnecessárias
const ClientItem = memo(({ client }: { client: typeof clients[0] }) => (
  <div className="flex-none md:w-[160px] w-[120px] mx-3">
    <div className="bg-white/[0.02] rounded-xl p-4 md:h-24 h-20 flex items-center justify-center border border-white/5">
      <img
        src={client.logo}
        alt={client.name}
        className="max-h-full max-w-full object-contain"
        loading="lazy"
        width="80"
        height="80"
      />
    </div>
    <div className="text-center mt-2">
      <p className="text-white/70 font-medium text-xs tracking-wide">{client.name}</p>
    </div>
  </div>
));

function ClientCarousel() {
  // Reduzimos o número de duplicações para melhorar o desempenho
  const allClients = [...clients, ...clients];
  
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium mb-3 inline-block">
            TRUSTED PARTNERS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Our <span className="text-blue-500">Clients</span>
          </h2>
          <div className="w-20 h-1 bg-blue-400/20 mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto overflow-hidden">
          <div className="flex flex-wrap justify-center gap-4 py-4">
            {clients.map((client) => (
              <ClientItem key={client.id} client={client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ClientCarousel);
