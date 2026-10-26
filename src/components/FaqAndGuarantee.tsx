import React, { useState } from 'react';
import { ShieldCheck, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/catalog';

export const FaqAndGuarantee: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#FAF8F5] text-zinc-900">
      {/* 7-Day Guarantee & FAQ Combined Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 5 Cols: 7-Day Official Guarantee Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#140608] text-white p-7 sm:p-9 border border-zinc-800">
            <div className="w-12 h-12 rounded-xl bg-[#B8E900]/15 border border-[#B8E900]/40 flex items-center justify-center text-[#B8E900] mb-5">
              <ShieldCheck className="w-6 h-6" aria-hidden="true" />
            </div>

            <p className="text-xs font-mono-tabular font-semibold uppercase tracking-wider text-[#B8E900] mb-2">
              COMPRA PROTEGIDA · GARANTIA LEGAL
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4"
              style={{ textWrap: 'balance' }}
            >
              Garantia Oficial de 7 Dias
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              Adquira seu kit de <strong className="text-white">30, 60 ou 90 cápsulas</strong> do Erectus Plus com total tranquilidade. Você conta com <strong className="text-white">7 dias de garantia oficial</strong> a partir do recebimento do seu pedido, assegurando a autenticidade da Fórmula Extra Forte (Tadalafila + Aminoácidos) e reembolso integral conforme o Código de Defesa do Consumidor.
            </p>

            <a
              href="#kits"
              className="w-full py-3.5 px-5 text-sm font-bold text-zinc-950 bg-[#B8E900] hover:bg-[#c8f526] rounded-xl transition-colors cursor-pointer whitespace-nowrap inline-flex items-center justify-center"
            >
              Escolher Meu Kit com Garantia de 7 Dias
            </a>
          </div>

          {/* Right 7 Cols: Frequently Asked Questions */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#990A11] mb-2">
              Dúvidas Frequentes Esclarecidas
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-6"
              style={{ textWrap: 'balance' }}
            >
              Tudo o que você precisa saber antes de pedir
            </h2>

            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={item.question} className="py-4">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 text-left font-display font-bold text-base sm:text-lg text-zinc-900 hover:text-[#990A11] transition-colors cursor-pointer"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 text-zinc-500 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#990A11]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-sm text-zinc-600 leading-relaxed pr-6">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Compliant Footer */}
      <footer className="bg-[#110507] text-zinc-400 border-t border-white/10 py-12 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="font-display text-lg font-bold text-white">
                Erectus Plus
              </span>
              <p className="text-xs text-zinc-400 mt-1">
                Tadalafila + Aminoácidos · Fórmula Extra Forte · 1 Cápsula ao Dia · Garantia de 7 Dias
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-300">
              <a href="#beneficios" className="hover:text-white">
                Benefícios
              </a>
              <a href="#formula" className="hover:text-white">
                Fórmula
              </a>
              <a href="#kits" className="hover:text-white">
                Kits e Preços
              </a>
              <a href="#depoimentos" className="hover:text-white">
                Depoimentos
              </a>
            </div>
          </div>

          <div className="mt-6 text-xs text-zinc-500 leading-relaxed space-y-2">
            <p>
              <strong>Aviso Importante e Orientação Médica:</strong> O Erectus Plus combina aminoácidos e ativos vasodilatadores (posologia recomendada: 1 cápsula por dia). Homens com histórico de cardiopatias severas, hipotensão/hipertensão descontrolada ou em uso de medicamentos contendo nitratos devem consultar um médico urologista ou cardiologista antes de iniciar o protocolo. Venda restrita para maiores de 18 anos.
            </p>
            <p>
              © {new Date().getFullYear()} Erectus Plus Oficial (erectusplus.com.br). Todos os direitos reservados. Garantia Oficial de 7 Dias · Atendimento ao Cliente: suporte@erectusplus.com.br · Envios discretos via Correios e Transportadora Expressa.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
