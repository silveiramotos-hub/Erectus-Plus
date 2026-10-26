import React from 'react';
import { PRODUCT_MOCKUP_PATH } from '../data/catalog';

export const VitalityBannerSection: React.FC = () => {
  return (
    <section
      data-testid="vitality-banner-section"
      aria-label="Superação e Vitalidade"
      className="bg-[#080708] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#46070D] via-[#2B0509] to-[#110406] border border-[#80E200]/35 shadow-2xl">
          {/* Ambient crimson & lime glow accents matching reference */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#990A11]/35 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/3 -bottom-24 w-72 h-72 rounded-full bg-[#80E200]/10 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-7 sm:p-10 lg:p-14">
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-left">
              <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.16em] text-[#80E200] mb-3">
                SUPERAÇÃO &amp; VITALIDADE
              </p>

              <h2
                className="font-display text-2xl sm:text-4xl lg:text-[2.65rem] font-bold text-white leading-[1.12] tracking-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                Viva o auge da sua forma física e surpreenda em todos os momentos.
              </h2>

              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-xl mb-7">
                Com o uso diário do{' '}
                <strong className="text-white font-bold">Erectus Plus</strong>,
                você sente o corpo responder com mais força nos esportes e muito
                mais presença na vida íntima.
              </p>

              <a
                href="#kits"
                data-testid="vitality-banner-cta"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-950 bg-[#80E200] hover:bg-[#92F510] rounded-full shadow-[0_0_28px_rgba(128,226,0,0.45)] transition-all duration-150 active:scale-[0.99] whitespace-nowrap shrink-0"
              >
                <span>VER OFERTAS COM FRETE GRÁTIS</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Right Bottle Showcase */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="relative flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#990A11]/50 via-[#ff1e27]/20 to-transparent blur-2xl scale-110"
                />
                <img
                  src={PRODUCT_MOCKUP_PATH}
                  alt="Frasco Erectus Plus — Superação e Vitalidade"
                  referrerPolicy="no-referrer"
                  className="relative z-10 h-64 sm:h-76 lg:h-80 w-auto object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.75)] select-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
