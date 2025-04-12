import React, { memo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t } = useLanguage();
  // Duplicamos os clientes para criar o efeito de loop infinito
  const allClients = [...clients, ...clients, ...clients];
  
  return (
    <section className="bg-gradient-to-b from-[#060623] via-[#050725] to-[#040620] -mt-4 relative">
      {/* Gradientes simplificados */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#060623] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#040620] to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-10">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-medium mb-3 inline-block">
            {t('clients.trustedPartners')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t('clients.title').split(/(?:Clients|Clientes)/).map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {t('clients.title').match(/(?:Clients|Clientes)/)?.[0]}
                </span>}
              </React.Fragment>
            ))}
          </h2>
          <div className="w-20 h-1 bg-blue-400/20 mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto overflow-hidden">
          <div className="client-carousel-container">
            <div className="flex space-x-8 client-carousel-scroll py-4">
              {allClients.map((client, index) => (
                <ClientItem key={`${client.id}-${index}`} client={client} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ClientCarousel);
