import React from 'react';
import { ShieldCheck, Lock, Truck, CheckCircle2 } from 'lucide-react';
import type { KitSlug } from '../utils/commerce';
import { BottleShowcase } from './BottleShowcase';

interface HeroSectionProps {
  onSelectKitAndCheckout: (kitSlug: KitSlug) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectKitAndCheckout,
}) => {
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
                  30, 60 OU 90 CÁPSULAS · 1 CÁPSULA AO DIA
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
            <ul className="space-y-2 text-xs sm:text-base text-zinc-200 mb-6 sm:mb-8">
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
              <button
                type="button"
                onClick={() => onSelectKitAndCheckout('caps-60')}
                className="inline-flex items-center justify-center px-6 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Comprar 60 Cápsulas · R$ 249,90
              </button>
            </div>

            {/* Quiet Trust Metadata */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#B8E900]" aria-hidden="true" />
                Checkout Criptografado 256-bit
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#B8E900]" aria-hidden="true" />
                Embalagem Parda Sem Identificação
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8E900]" aria-hidden="true" />
                Garantia Oficial de 7 Dias
              </span>
            </div>
          </div>

          {/* Right Column: Official Mockup Showcase */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#2A0A10] to-[#160508] border border-white/10 p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs text-zinc-300 border-b border-white/10 pb-4">
              <span>30 CÁPSULAS POR FRASCO · 1 CÁPSULA/DIA</span>
              <span className="font-mono-tabular font-semibold text-[#B8E900]">
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
                  Por apenas <span className="font-mono-tabular text-[#B8E900]">R$ 249,90</span> (ou 12x de R$ 20,83)
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectKitAndCheckout('caps-60')}
                className="px-4 py-2 text-xs font-bold text-zinc-950 bg-[#B8E900] hover:bg-[#c8f526] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Garantir Oferta
              </button>
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
              Até 36h
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Janela de suporte vasodilatador ativo com resposta natural ao estímulo
            </p>
          </div>
          <div>
            <p className="font-mono-tabular text-2xl sm:text-3xl font-bold text-white">
              7 Dias
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Garantia oficial de 7 dias após o recebimento e envio 100% discreto
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
