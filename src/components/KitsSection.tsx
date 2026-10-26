import React, { useState } from 'react';
import { Check, ShieldCheck, Truck, Lock, MapPin, ExternalLink } from 'lucide-react';
import { PRODUCT_KITS } from '../data/catalog';
import {
  calculateOrderPricing,
  calculateShippingEstimate,
  formatBRL,
  formatCEP,
  type ProductKit,
} from '../utils/commerce';
import { BottleShowcase } from './BottleShowcase';

interface KitsSectionProps {
  sharedCep: string;
  onChangeSharedCep: (cep: string) => void;
}

export const KitsSection: React.FC<KitsSectionProps> = ({
  sharedCep,
  onChangeSharedCep,
}) => {
  const [priceView, setPriceView] = useState<'pix' | 'card'>('pix');
  const shippingEstimate = calculateShippingEstimate(sharedCep);

  return (
    <section
      id="kits"
      className="bg-[#F3F0EA] text-zinc-900 py-16 lg:py-24 border-b border-zinc-200/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Interactive Price View Segmented Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#990A11] mb-2">
              Kits por Quantidade de Cápsulas · 1 Cápsula ao Dia
            </p>
            <h2
              className="font-display text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Escolha seu kit de 30, 60 ou 90 Cápsulas
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-zinc-600">
              Cada frasco contém 30 cápsulas da Fórmula Extra Forte (1 cápsula por dia). Escolha 30 cápsulas (1 frasco), 60 cápsulas (2 frascos) ou 90 cápsulas (3 frascos) com Frete Grátis.
            </p>
          </div>

          {/* Interactive Filter / Toggle for Price Display */}
          <div
            role="group"
            aria-label="Modo de exibição de preço"
            className="inline-flex items-center gap-1 p-1 bg-zinc-200/80 rounded-xl self-start md:self-auto"
          >
            <button
              type="button"
              onClick={() => setPriceView('pix')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                priceView === 'pix'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-700 hover:text-zinc-900'
              }`}
            >
              Valor à Vista (PIX)
            </button>
            <button
              type="button"
              onClick={() => setPriceView('card')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                priceView === 'card'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'text-zinc-700 hover:text-zinc-900'
              }`}
            >
              Parcelado em até 12x
            </button>
          </div>
        </div>

        {/* 3-Column Contiguous Purchase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PRODUCT_KITS.map((kit: ProductKit) => {
            const pricing = calculateOrderPricing(kit, 1, priceView);
            const isFeatured = kit.featured;

            return (
              <article
                key={kit.id}
                data-testid={`kit-card-${kit.slug}`}
                className={`rounded-2xl flex flex-col justify-between p-6 sm:p-8 transition-transform duration-200 hover:-translate-y-0.5 ${
                  isFeatured
                    ? 'bg-[#160609] text-white border-2 border-[#990A11] shadow-xl'
                    : 'bg-white text-zinc-900 border border-zinc-200/90 shadow-sm'
                }`}
              >
                <div>
                  {/* Single Unboxed Text Kicker */}
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold mb-2">
                    <span
                      className={
                        isFeatured ? 'text-[#B8E900]' : 'text-[#990A11]'
                      }
                    >
                      {kit.tagText}
                    </span>
                    <span
                      className={`font-mono-tabular ${
                        isFeatured ? 'text-zinc-300' : 'text-zinc-500'
                      }`}
                    >
                      {kit.durationDays} dias de uso
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                    {kit.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm mt-1 ${
                      isFeatured ? 'text-zinc-300' : 'text-zinc-500'
                    }`}
                  >
                    {kit.subtitle}
                  </p>

                  {/* Product Packshot */}
                  <div
                    className={`my-5 rounded-xl ${
                      isFeatured
                        ? 'bg-gradient-to-b from-[#2A0B11] to-[#120406] border border-white/10'
                        : 'bg-[#FAF8F5] border border-zinc-100'
                    }`}
                  >
                    <BottleShowcase
                      bottles={kit.bottles}
                      variant="card"
                    />
                  </div>

                  {/* Pricing Block */}
                  <div
                    className={`pb-5 mb-5 border-b ${
                      isFeatured ? 'border-white/10' : 'border-zinc-100'
                    }`}
                  >
                    <div className="flex items-baseline gap-2 text-xs">
                      <span
                        className={`line-through font-mono-tabular ${
                          isFeatured ? 'text-zinc-400' : 'text-zinc-400'
                        }`}
                      >
                        De {formatBRL(pricing.originalSubtotal)}
                      </span>
                      <span
                        className={`font-semibold ${
                          isFeatured ? 'text-[#B8E900]' : 'text-emerald-700'
                        }`}
                      >
                        Economia de {formatBRL(pricing.totalSavings)}
                      </span>
                    </div>

                    {priceView === 'pix' ? (
                      <div className="mt-2">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono-tabular text-3xl sm:text-4xl font-bold tracking-tight">
                            {formatBRL(kit.basePrice)}
                          </span>
                          <span
                            className={`text-xs font-medium ${
                              isFeatured ? 'text-[#B8E900]' : 'text-emerald-700'
                            }`}
                          >
                            à vista
                          </span>
                        </div>
                        <p
                          className={`text-xs mt-1 font-mono-tabular ${
                            isFeatured ? 'text-zinc-300' : 'text-zinc-500'
                          }`}
                        >
                          {kit.capsulesTotal} cápsulas ({kit.bottles}{' '}
                          {kit.bottles === 1 ? 'frasco' : 'frascos'}) ·{' '}
                          <strong
                            className={
                              isFeatured ? 'text-white' : 'text-zinc-900'
                            }
                          >
                            {formatBRL(pricing.perCapsuleFinal)}/cápsula
                          </strong>
                        </p>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-medium">12x de</span>
                          <span className="font-mono-tabular text-3xl sm:text-4xl font-bold tracking-tight">
                            {formatBRL(Number((kit.basePrice / 12).toFixed(2)))}
                          </span>
                        </div>
                        <p
                          className={`text-xs mt-1 font-mono-tabular ${
                            isFeatured ? 'text-zinc-300' : 'text-zinc-500'
                          }`}
                        >
                          Ou{' '}
                          <strong
                            className={
                              isFeatured ? 'text-[#B8E900]' : 'text-emerald-700'
                            }
                          >
                            {formatBRL(kit.basePrice)} à vista
                          </strong>{' '}
                          ({kit.capsulesTotal} cápsulas)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Kit Benefits Checklist */}
                  <ul className="space-y-2.5 text-xs sm:text-sm mb-7">
                    <li className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isFeatured ? 'text-[#B8E900]' : 'text-emerald-600'
                        }`}
                        aria-hidden="true"
                      />
                      <span>{kit.recommendedFor}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isFeatured ? 'text-[#B8E900]' : 'text-emerald-600'
                        }`}
                        aria-hidden="true"
                      />
                      <span>
                        Frete Grátis Expresso com Seguro e Rastreio
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isFeatured ? 'text-[#B8E900]' : 'text-emerald-600'
                        }`}
                        aria-hidden="true"
                      />
                      <span>
                        Embalagem 100% discreta e Garantia Oficial de 7 Dias
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Direct Braip Checkout CTA */}
                <div>
                  <a
                    href={kit.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`kit-checkout-link-${kit.slug}`}
                    className={`w-full py-4 px-5 rounded-xl font-bold text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2 ${
                      isFeatured
                        ? 'bg-[#B8E900] hover:bg-[#c8f526] text-zinc-950 shadow-lg'
                        : 'bg-[#059669] hover:bg-[#047857] text-white'
                    }`}
                  >
                    <span>Comprar {kit.capsulesTotal} Cápsulas Agora</span>
                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                  <p
                    className={`text-[11px] text-center mt-2.5 ${
                      isFeatured ? 'text-zinc-400' : 'text-zinc-500'
                    }`}
                  >
                    {kit.bottles} {kit.bottles === 1 ? 'Frasco' : 'Frascos'} · Posologia: 1 cápsula ao dia · Checkout Seguro Braip
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Interactive CEP Shipping & Discrete Delivery Simulator */}
        <div className="mt-10 rounded-2xl bg-white border border-zinc-200/90 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-[#990A11] shrink-0">
              <MapPin className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-zinc-900">
                Simulador de Prazo e Frete Discreto por CEP
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
                Consulte o prazo estimado de entrega em caixa parda sigilosa para sua região:
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="kits-cep-input" className="sr-only">
                Digite seu CEP para calcular o prazo
              </label>
              <input
                id="kits-cep-input"
                type="text"
                value={sharedCep}
                onChange={(e) => onChangeSharedCep(formatCEP(e.target.value))}
                placeholder="Digite seu CEP (ex: 01310-100)"
                className="w-full sm:w-52 px-3.5 py-2.5 text-sm font-mono-tabular rounded-xl border border-zinc-300 bg-[#FAF8F5] focus:bg-white focus:border-zinc-900 focus:outline-none"
              />
            </div>

            {shippingEstimate.valid ? (
              <div
                data-testid="shipping-estimate-result"
                className="text-xs sm:text-sm bg-emerald-50 border border-emerald-200 text-emerald-950 px-4 py-2.5 rounded-xl"
              >
                <strong className="font-semibold">
                  {shippingEstimate.cityStatePreview}:
                </strong>{' '}
                Entrega em{' '}
                <span className="font-mono-tabular font-bold">
                  {shippingEstimate.businessDaysMin} a{' '}
                  {shippingEstimate.businessDaysMax} dias úteis
                </span>{' '}
                · <span className="text-emerald-700 font-semibold">Frete Grátis em Todos os Kits</span>
              </div>
            ) : (
              <span className="text-xs text-zinc-500">
                Informe os 8 dígitos do CEP para ver o prazo exato.
              </span>
            )}
          </div>
        </div>

        {/* Bottom Trust Assurance Strip */}
        <div className="mt-8 pt-8 border-t border-zinc-300/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-zinc-700">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#990A11] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="text-zinc-900 block">
                Sigilo Total na Entrega e na Fatura
              </strong>
              Caixa parda lacrada sem marcações externas. Nenhum entregador ou vizinho saberá o conteúdo.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#990A11] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="text-zinc-900 block">
                Garantia Oficial de 7 Dias
              </strong>
              Compra protegida com 7 dias de garantia oficial a partir da entrega do seu pedido.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#990A11] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="text-zinc-900 block">
                Checkout Oficial Braip (PIX ou Cartão)
              </strong>
              Aprovação imediata no PIX ou parcelamento em até 12x no cartão de crédito com segurança Braip.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
