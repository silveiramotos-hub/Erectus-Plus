import React, { useState } from 'react';
import { FORMULA_COMPONENTS, PRODUCT_KITS } from '../data/catalog';
import {
  recommendProtocol,
  formatBRL,
  type ProtocolQuizInput,
  type KitSlug,
} from '../utils/commerce';

interface BenefitsAndFormulaProps {
  onSelectKitAndCheckout: (kitSlug: KitSlug) => void;
}

export const BenefitsAndFormula: React.FC<BenefitsAndFormulaProps> = ({
  onSelectKitAndCheckout,
}) => {
  const [selectedComponentId, setSelectedComponentId] = useState<string>(
    FORMULA_COMPONENTS[0].id
  );
  const [quizInput, setQuizInput] = useState<ProtocolQuizInput>({
    ageRange: '45-59',
    primaryGoal: 'firmeza',
    durationMonths: 'moderado',
  });

  const activeComponent =
    FORMULA_COMPONENTS.find((c) => c.id === selectedComponentId) ||
    FORMULA_COMPONENTS[0];

  const recommendation = recommendProtocol(quizInput);
  const recommendedKit =
    PRODUCT_KITS.find((k) => k.slug === recommendation.recommendedKitSlug) ||
    PRODUCT_KITS[1];

  return (
    <div className="bg-[#FAF8F5] text-zinc-900">
      {/* Section 1: 3 Mechanisms of Action (Editorial Numbering) */}
      <section
        id="beneficios"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-b border-zinc-200/80"
      >
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#990A11] mb-2">
            Mecanismo Triplo de Atuação Vascular · 1 Cápsula ao Dia
          </p>
          <h2
            className="font-display text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Por que a Fórmula Extra Forte funciona com apenas 1 cápsula por dia?
          </h2>
          <p className="mt-3 text-base text-zinc-600 leading-relaxed">
            Cada cápsula do Erectus Plus concentra a dosagem exata de Tadalafila e Aminoácidos para 24 horas de suporte contínuo: 30 cápsulas equivalem a 1 mês completo, 60 cápsulas a 2 meses e 90 cápsulas a 3 meses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <article className="rounded-2xl bg-white border border-zinc-200/90 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono-tabular text-xs font-semibold text-[#990A11]">
                ETAPA VASCULAR · 01
              </span>
              <h3 className="font-display text-xl font-bold text-zinc-900 mt-2 mb-3">
                01. Vasodilatação Profunda e Irrigação Caverneira
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                A sinergia da Tadalafila com L-Citrulina relaxa a musculatura endotelial e multiplica o afluxo de sangue arterial para os corpos cavernosos no momento do estímulo, garantindo ereções densas e estáveis.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-100 text-xs font-medium text-zinc-500">
              Atuação direta na circulação periférica · Apenas 1 cápsula ao dia
            </div>
          </article>

          <article className="rounded-2xl bg-white border border-zinc-200/90 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono-tabular text-xs font-semibold text-[#990A11]">
                ETAPA BIOQUÍMICA · 02
              </span>
              <h3 className="font-display text-xl font-bold text-zinc-900 mt-2 mb-3">
                02. Síntese Contínua de Óxido Nítrico (NO)
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Enquanto produtos comuns exigem várias doses ao dia, os aminoácidos L-Arginina e Taurina da Fórmula Extra Forte nutrem a parede vascular com 1 única cápsula diária.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-100 text-xs font-medium text-zinc-500">
              Efeito cumulativo · Sem picos de taquicardia
            </div>
          </article>

          <article className="rounded-2xl bg-white border border-zinc-200/90 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono-tabular text-xs font-semibold text-[#990A11]">
                ETAPA HORMONAL & VIGOR · 03
              </span>
              <h3 className="font-display text-xl font-bold text-zinc-900 mt-2 mb-3">
                03. Resistência Física e Confiança Psicológica
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Com Coenzima Q10, Zinco e Selênio Quelato, o protocolo reduz o tempo refratário entre as relações, elimina a fadiga noturna e devolve a segurança de manter o desempenho do início ao fim.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-100 text-xs font-medium text-zinc-500">
              Mais fôlego físico · Redução do tempo de recuperação
            </div>
          </article>
        </div>
      </section>

      {/* Section 2: Interactive Formula Breakdown + Personalized Protocol Calculator */}
      <section
        id="formula"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-b border-zinc-200/80"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 7 Cols: Interactive Formula Explorer */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#990A11] mb-2">
              Composição Científica Transparente
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3"
              style={{ textWrap: 'balance' }}
            >
              Inspecione cada ativo da Fórmula Extra Forte
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mb-6">
              Selecione um componente abaixo para verificar sua função fisiológica na dose diária de 1 cápsula:
            </p>

            {/* Interactive Segmented Selector */}
            <div
              role="tablist"
              aria-label="Componentes da fórmula Erectus Plus"
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6"
            >
              {FORMULA_COMPONENTS.map((comp) => {
                const isSelected = comp.id === activeComponent.id;
                return (
                  <button
                    key={comp.id}
                    role="tab"
                    type="button"
                    aria-selected={isSelected}
                    onClick={() => setSelectedComponentId(comp.id)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#180709] text-white border-[#990A11] shadow-sm'
                        : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <p
                      className={`text-xs font-mono-tabular ${
                        isSelected ? 'text-[#B8E900]' : 'text-[#990A11]'
                      }`}
                    >
                      {comp.concentration}
                    </p>
                    <p className="font-display font-bold text-sm sm:text-base mt-0.5">
                      {comp.name}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Ingredient Detail Panel */}
            <div className="rounded-2xl bg-white border border-zinc-200 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-100">
                <div>
                  <span className="text-xs text-zinc-500">Ativo Selecionado</span>
                  <h3 className="font-display text-xl font-bold text-zinc-900">
                    {activeComponent.name}
                  </h3>
                </div>
                <span className="font-mono-tabular text-xs font-semibold text-[#990A11]">
                  {activeComponent.role}
                </span>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed mt-4">
                {activeComponent.mechanism}
              </p>

              <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs sm:text-sm">
                <span className="text-zinc-500">Indicador de Desempenho:</span>
                <span className="font-semibold text-zinc-900">
                  {activeComponent.clinicalMetric}
                </span>
              </div>
            </div>

            {/* Comparative Matrix: Erectus Plus vs Alternatives */}
            <div className="mt-6 rounded-2xl bg-white border border-zinc-200 overflow-hidden">
              <div className="px-5 py-3.5 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
                <span className="font-display font-bold text-sm text-zinc-900">
                  Comparativo Técnico de Eficácia
                </span>
                <span className="text-xs text-zinc-500">
                  Posologia: 1 Cápsula por Dia
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 text-zinc-500">
                      <th className="py-3 px-4 font-semibold">Critério</th>
                      <th className="py-3 px-4 font-bold text-[#990A11] bg-red-50/40">
                        Erectus Plus
                      </th>
                      <th className="py-3 px-4 font-medium">
                        Comprimido Isolado
                      </th>
                      <th className="py-3 px-4 font-medium">
                        Vitamina Comum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 font-mono-tabular">
                    <tr>
                      <td className="py-2.5 px-4 font-sans font-medium text-zinc-800">
                        Posologia Diária
                      </td>
                      <td className="py-2.5 px-4 font-bold text-emerald-700 bg-red-50/40">
                        1 cápsula ao dia
                      </td>
                      <td className="py-2.5 px-4 text-zinc-500">Sob demanda</td>
                      <td className="py-2.5 px-4 text-zinc-500">2 a 4 cápsulas</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans font-medium text-zinc-800">
                        Sinergia de Ativos
                      </td>
                      <td className="py-2.5 px-4 font-bold text-emerald-700 bg-red-50/40">
                        Tadalafila + Aminoácidos
                      </td>
                      <td className="py-2.5 px-4 text-zinc-500">Sem aminoácidos</td>
                      <td className="py-2.5 px-4 text-zinc-500">Subdosado</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans font-medium text-zinc-800">
                        Opções de Tratamento
                      </td>
                      <td className="py-2.5 px-4 font-bold text-emerald-700 bg-red-50/40">
                        30, 60 ou 90 Cápsulas
                      </td>
                      <td className="py-2.5 px-4 text-zinc-500">
                        Apenas paliativo
                      </td>
                      <td className="py-2.5 px-4 text-zinc-500">Lenta</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-sans font-medium text-zinc-800">
                        Garantia Oficial
                      </td>
                      <td className="py-2.5 px-4 font-bold text-emerald-700 bg-red-50/40">
                        7 Dias de Garantia
                      </td>
                      <td className="py-2.5 px-4 text-zinc-500">Nenhuma</td>
                      <td className="py-2.5 px-4 text-zinc-500">Nenhuma</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Interactive Protocol Calculator */}
          <div className="lg:col-span-5 rounded-2xl bg-[#160609] text-white p-6 sm:p-8 border border-zinc-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#B8E900] mb-1">
              Simulador de Tratamento Personalizado
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
              Descubra Seu Kit Ideal de Cápsulas
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mb-6">
              Ajuste seu perfil abaixo para calcular o kit ideal (30, 60 ou 90 cápsulas — tomando 1 cápsula por dia):
            </p>

            {/* Step 1: Age */}
            <div className="mb-5">
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                1. Qual sua faixa etária?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { value: '30-44', label: '30 a 44 anos' },
                    { value: '45-59', label: '45 a 59 anos' },
                    { value: '60+', label: '60+ anos' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setQuizInput((prev) => ({ ...prev, ageRange: opt.value }))
                    }
                    className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      quizInput.ageRange === opt.value
                        ? 'bg-[#B8E900] text-zinc-950 border-[#B8E900]'
                        : 'bg-white/5 text-zinc-200 border-white/15 hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Goal */}
            <div className="mb-5">
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                2. Qual seu objetivo principal?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { value: 'firmeza', label: 'Firmeza Total' },
                    { value: 'energia-libido', label: 'Mais Libido' },
                    { value: 'completo', label: 'Ambos (Total)' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setQuizInput((prev) => ({
                        ...prev,
                        primaryGoal: opt.value,
                      }))
                    }
                    className={`py-2.5 px-2.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      quizInput.primaryGoal === opt.value
                        ? 'bg-[#B8E900] text-zinc-950 border-[#B8E900]'
                        : 'bg-white/5 text-zinc-200 border-white/15 hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Duration */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                3. Há quanto tempo nota queda de desempenho?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { value: 'recente', label: 'Menos de 3m' },
                    { value: 'moderado', label: '3 a 12 meses' },
                    { value: 'longo', label: 'Mais de 1 ano' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setQuizInput((prev) => ({
                        ...prev,
                        durationMonths: opt.value,
                      }))
                    }
                    className={`py-2.5 px-2.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      quizInput.durationMonths === opt.value
                        ? 'bg-[#B8E900] text-zinc-950 border-[#B8E900]'
                        : 'bg-white/5 text-zinc-200 border-white/15 hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendation Result Box */}
            <div
              data-testid="protocol-recommendation-box"
              className="pt-5 border-t border-white/15"
            >
              <div className="flex items-center justify-between text-xs text-[#B8E900] font-mono-tabular mb-1">
                <span>RECOMENDAÇÃO PARA SEU PERFIL</span>
                <span>CICLO DE {recommendation.cycleDays} DIAS</span>
              </div>
              <h4 className="font-display text-lg font-bold text-white">
                {recommendedKit.title}
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed mt-1.5 mb-3">
                {recommendation.rationale}
              </p>
              <p className="text-xs text-zinc-400 mb-4">
                <strong className="text-zinc-200">Posologia:</strong>{' '}
                {recommendation.dailyDosage} ·{' '}
                <strong className="text-zinc-200">Valor Oficial:</strong>{' '}
                <span className="font-mono-tabular text-[#B8E900]">
                  {formatBRL(recommendedKit.basePrice)}
                </span>
              </p>

              <button
                type="button"
                onClick={() =>
                  onSelectKitAndCheckout(recommendation.recommendedKitSlug)
                }
                className="w-full py-3.5 px-4 text-sm font-bold text-zinc-950 bg-[#B8E900] hover:bg-[#c8f526] rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                Selecionar {recommendedKit.capsulesTotal} Cápsulas ({recommendedKit.bottles}{' '}
                {recommendedKit.bottles === 1 ? 'Frasco' : 'Frascos'})
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
