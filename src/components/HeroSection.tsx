import React from 'react';
import { ShieldCheck, Lock, Truck, CheckCircle2, Award } from 'lucide-react';
import { BRAIP_CHECKOUT_URLS } from '../utils/commerce';
import { BottleShowcase } from './BottleShowcase';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="topo"
      className="relative bg-gradient-to-b from-[#140608] via-[#1D080C] to-[#140608] text-white border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 lg:py-16">
        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: High-Conversion Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed Clean Metadata Kicker (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#B8E900] tracking-wide mb-3">
              <span>Tadalafila + Aminoácidos</span>
              <span aria-hidden="true">·</span>
              <span>Fórmula Extra Forte</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-300">Apenas 1 Cápsula por Dia</span>
            </div>

            <h1
              className="font-display font-bold text-white tracking-tight leading-[1.08] mb-4 max-w-2xl"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.65rem)',
                textWrap: 'balance',
              }}
            >
              Recupere a Firmeza, o Vigor e a Confiança em Qualquer Idade.
            </h1>

            <p className="text-sm sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-5 sm:mb-6">
              O <strong className="text-white font-semibold">Erectus Plus</strong> une a vasodilatação precisa da{' '}
              <strong className="text-white font-semibold">Tadalafila</strong> à reposição concentrada de{' '}
              <strong className="text-white font-semibold">Aminoácidos Precursores de Óxido Nítrico</strong> em uma dose prática de{' '}
              <strong className="text-[#B8E900] font-semibold">1 cápsula por dia</strong>.
            </p>

            {/* Mobile Above-the-Fold Product Highlight */}
            <div className="lg:hidden flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 p-3 mb-5">
              <BottleShowcase bottles={1} variant="compact" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-[#B8E900]">
                  30, 60 OU 90 CÁPSULAS · FRETE GRÁTIS
                </p>
                <p className="font-display font-bold text-sm text-white">
                  Erectus Plus — Fórmula Extra Forte
                </p>
                <p className="text-xs text-zinc-300 mt-0.5">
                  30 Cáps: <span className="font-mono-tabular font-semibold text-white">R$ 169,90</span> · 60 Cáps: <span className="font-mono-tabular font-semibold text-[#B8E900]">R$ 249,90</span>
                </p>
              </div>
            </div>

            {/* Concrete Outcomes List */}
            <ul className="space-y-2 text-xs sm:text-base text-zinc-200 mb-6 sm:mb-7">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8E900] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-white">Apenas 1 Cápsula por Dia:</strong> concentração Extra Forte que garante praticidade total (1 frasco de 30 cápsulas = 30 dias).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8E900] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-white">Fluxo Sanguíneo Maximizado:</strong> dilatação vascular profunda nos corpos cavernosos para rigidez superior.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8E900] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="text-white">Energia Física e Libido:</strong> aminoácidos bioativos que reduzem o cansaço e devolvem o apetite sexual.
                </span>
              </li>
            </ul>

            {/* Primary Decision Block */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#kits"
                className="inline-flex items-center justify-center px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-zinc-950 bg-[#B8E900] hover:bg-[#c8f526] rounded-xl shadow-lg transition-transform duration-150 active:scale-[0.99] whitespace-nowrap shrink-0"
              >
                Ver Kits de 30, 60 e 90 Cápsulas
              </a>
              <a
                href={BRAIP_CHECKOUT_URLS['caps-60']}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-direct-checkout-60"
                className="inline-flex items-center justify-center px-6 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Comprar 60 Cápsulas · R$ 249,90
              </a>
            </div>

            {/* Visual Trust Seals Section Directly Below Hero Checkout Buttons */}
            <div
              data-testid="hero-trust-seals"
              aria-label="Selos de Confiança e Segurança"
              className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {/* Seal 1: Compra Segura */}
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-3">
                <div className="w-9 h-9 rounded-lg bg-[#B8E900]/15 border border-[#B8E900]/35 flex items-center justify-center text-[#B8E900] shrink-0">
                  <Lock className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xs sm:text-sm font-bold text-white leading-tight">
                    Compra 100% Segura
                  </p>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    Criptografia SSL 256-Bit
                  </p>
                </div>
              </div>

              {/* Seal 2: Entrega Discreta + Frete Grátis */}
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-3">
                <div className="w-9 h-9 rounded-lg bg-[#B8E900]/15 border border-[#B8E900]/35 flex items-center justify-center text-[#B8E900] shrink-0">
                  <Truck className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xs sm:text-sm font-bold text-white leading-tight">
                    Entrega Discreta
                  </p>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    Caixa Parda · Frete Grátis
                  </p>
                </div>
              </div>

              {/* Seal 3: Garantia Oficial */}
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-3">
                <div className="w-9 h-9 rounded-lg bg-[#B8E900]/15 border border-[#B8E900]/35 flex items-center justify-center text-[#B8E900] shrink-0">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xs sm:text-sm font-bold text-white leading-tight">
                    Garantia de 7 Dias
                  </p>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    Satisfação & Originalidade
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Official Mockup Showcase */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#2A0A10] to-[#160508] border border-white/10 p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs text-zinc-300 border-b border-white/10 pb-4">
              <span>30 CÁPSULAS POR FRASCO · 1 CÁPSULA/DIA</span>
              <span className="inline-flex items-center gap-1 font-mono-tabular font-semibold text-[#B8E900]">
                <Award className="w-3.5 h-3.5" aria-hidden="true" />
                100% ORIGINAL
              </span>
            </div>

            <BottleShowcase bottles={3} variant="hero" />

            <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs text-zinc-400">
                  Kit Mais Vendido · 60 Cápsulas (2 Frascos)
                </p>
                <p className="text-sm font-semibold text-white">
                  Por apenas <span className="font-mono-tabular text-[#B8E900]">R$ 249,90</span> · Frete Grátis
                </p>
              </div>
              <a
                href={BRAIP_CHECKOUT_URLS['caps-60']}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-bold text-zinc-950 bg-[#B8E900] hover:bg-[#c8f526] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer text-center"
              >
                Garantir Oferta
              </a>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Proof Strip Below Split */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-white">
              1 Cápsula/Dia
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Dosagem concentrada Extra Forte: 30 cápsulas equivalem a 30 dias completos de uso
            </p>
          </div>
          <div>
            <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-white">
              Frete Grátis
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Envio expresso gratuito e 100% discreto em todos os kits (30, 60 e 90 cápsulas)
            </p>
          </div>
          <div>
            <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-white">
              7 Dias
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Garantia oficial de 7 dias após o recebimento com reembolso garantido por lei
            </p>
          </div>
          <div>
            <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-[#B8E900]">
              4,9 / 5,0
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Índice médio de satisfação entre clientes verificados em todo o Brasil
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
