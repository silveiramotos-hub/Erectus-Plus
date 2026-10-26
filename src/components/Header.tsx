import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#140608]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#topo"
          className="font-display text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8E900]"
        >
          Erectus Plus
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav
          aria-label="Navegação Principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300"
        >
          <a
            href="#beneficios"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Benefícios
          </a>
          <a
            href="#formula"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Fórmula
          </a>
          <a
            href="#kits"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Kits e Preços
          </a>
          <a
            href="#depoimentos"
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Depoimentos
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <a
            href="#kits"
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-950 bg-[#B8E900] hover:bg-[#c8f526] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Comprar Agora
          </a>
        </div>
      </div>
    </header>
  );
};
