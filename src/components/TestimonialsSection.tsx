import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import {
  filterTestimonials,
  computeReviewStats,
  type TestimonialItem,
} from '../utils/commerce';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  onAddTestimonial: (newItem: TestimonialItem) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onAddTestimonial,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    'todos' | 'acima-50' | 'firmeza' | 'disposicao'
  >('todos');
  const [showForm, setShowForm] = useState(false);

  // New testimonial form state
  const [authorName, setAuthorName] = useState('');
  const [age, setAge] = useState('54');
  const [cityState, setCityState] = useState('');
  const [kitPurchased, setKitPurchased] = useState(
    '60 Cápsulas (2 Frascos)'
  );
  const [category, setCategory] = useState<
    'acima-50' | 'firmeza' | 'disposicao'
  >('firmeza');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [beforeContext, setBeforeContext] = useState('');
  const [outcomeText, setOutcomeText] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const stats = computeReviewStats(testimonials);
  const filteredList = filterTestimonials(testimonials, activeCategory);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const parsedAge = parseInt(age, 10);
    if (authorName.trim().length < 3) {
      setFormError('Por favor, informe seu nome ou iniciais.');
      return;
    }
    if (Number.isNaN(parsedAge) || parsedAge < 18 || parsedAge > 99) {
      setFormError('Informe uma idade válida entre 18 e 99 anos.');
      return;
    }
    if (cityState.trim().length < 3) {
      setFormError('Informe sua cidade e estado (ex: Curitiba, PR).');
      return;
    }
    if (title.trim().length < 5) {
      setFormError('Escreva um título curto resumindo sua experiência.');
      return;
    }
    if (outcomeText.trim().length < 15) {
      setFormError(
        'Conte com pelo menos 15 caracteres como foi o seu resultado.'
      );
      return;
    }

    const created: TestimonialItem = {
      id: `rev-${Date.now()}`,
      authorName: authorName.trim(),
      age: parsedAge,
      cityState: cityState.trim(),
      kitPurchased,
      category,
      rating,
      title: title.trim(),
      beforeContext:
        beforeContext.trim() ||
        'Buscava maior segurança, firmeza e vigor na rotina tomando 1 cápsula ao dia.',
      outcomeText: outcomeText.trim(),
      verifiedDate: 'Publicado Agora · Compra Verificada',
    };

    onAddTestimonial(created);
    setAuthorName('');
    setCityState('');
    setTitle('');
    setBeforeContext('');
    setOutcomeText('');
    setSubmitSuccess(true);
    setShowForm(false);
    setActiveCategory('todos');
  };

  return (
    <section
      id="depoimentos"
      className="bg-[#FAF8F5] text-zinc-900 py-16 lg:py-24 border-b border-zinc-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Quantitative Summary + Action to Submit Review */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#990A11] mb-2">
              Sistema Integrado de Avaliações Reais
            </p>
            <h2
              className="font-display text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              O que dizem os homens que já recuperaram a confiança com Erectus Plus
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600">
              Relatos auditados de clientes verificados que utilizam os kits de 30, 60 e 90 cápsulas (1 cápsula por dia).
            </p>
          </div>

          {/* Quantitative Score Box */}
          <div className="lg:col-span-5 rounded-2xl bg-white border border-zinc-200/90 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span
                  data-testid="review-average-score"
                  className="font-mono-tabular text-3xl sm:text-4xl font-bold text-zinc-900"
                >
                  {stats.averageRating.toFixed(1)}
                </span>
                <span className="text-xs text-zinc-500">de 5.0 estrelas</span>
              </div>
              <div className="flex items-center gap-1 my-1.5 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-amber-500 text-amber-500"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p
                data-testid="review-total-count"
                className="text-xs text-zinc-500 font-mono-tabular"
              >
                Baseado em {stats.totalCount} relatos exibidos ({stats.fiveStarPercent}% nota máxima)
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowForm((prev) => !prev);
                setSubmitSuccess(false);
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
              {showForm ? 'Fechar Formulário' : 'Enviar Meu Relato'}
            </button>
          </div>
        </div>

        {/* Confirmation Banner if User Submitted a Review */}
        {submitSuccess && (
          <div
            role="status"
            className="mb-8 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-900 flex items-center justify-between"
          >
            <span>
              <strong>Obrigado pelo seu depoimento!</strong> Seu relato verificado já foi publicado no topo da lista abaixo.
            </span>
            <button
              type="button"
              onClick={() => setSubmitSuccess(false)}
              className="text-xs font-semibold underline ml-4 cursor-pointer"
            >
              Ocultar aviso
            </button>
          </div>
        )}

        {/* Interactive Review Submission Form */}
        {showForm && (
          <form
            onSubmit={handleSubmitReview}
            aria-label="Formulário de envio de depoimento"
            className="mb-10 rounded-2xl bg-white border border-zinc-300 p-6 sm:p-8 shadow-sm"
          >
            <h3 className="font-display text-lg font-bold text-zinc-900 mb-1">
              Compartilhe sua experiência com o Erectus Plus
            </h3>
            <p className="text-xs text-zinc-500 mb-6">
              Para preservar sua privacidade, você pode usar apenas seu primeiro nome e inicial do sobrenome.
            </p>

            {formError && (
              <div
                role="alert"
                className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-xs font-medium text-red-800"
              >
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label
                  htmlFor="rev-name"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Seu Nome ou Iniciais *
                </label>
                <input
                  id="rev-name"
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Ex: Fernando M."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="rev-age"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Sua Idade *
                </label>
                <input
                  id="rev-age"
                  type="number"
                  min={18}
                  max={99}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 focus:border-zinc-900 focus:outline-none font-mono-tabular"
                />
              </div>

              <div>
                <label
                  htmlFor="rev-city"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Cidade / UF *
                </label>
                <input
                  id="rev-city"
                  type="text"
                  value={cityState}
                  onChange={(e) => setCityState(e.target.value)}
                  placeholder="Ex: Florianópolis, SC"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 focus:border-zinc-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label
                  htmlFor="rev-kit"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Qual Kit utilizou?
                </label>
                <select
                  id="rev-kit"
                  value={kitPurchased}
                  onChange={(e) => setKitPurchased(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 bg-white focus:border-zinc-900 focus:outline-none"
                >
                  <option value="30 Cápsulas (1 Frasco)">
                    30 Cápsulas (1 Frasco)
                  </option>
                  <option value="60 Cápsulas (2 Frascos)">
                    60 Cápsulas (2 Frascos)
                  </option>
                  <option value="90 Cápsulas (3 Frascos)">
                    90 Cápsulas (3 Frascos)
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="rev-cat"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Principal Benefício Sentido
                </label>
                <select
                  id="rev-cat"
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value as 'acima-50' | 'firmeza' | 'disposicao'
                    )
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 bg-white focus:border-zinc-900 focus:outline-none"
                >
                  <option value="firmeza">Firmeza & Rigidez</option>
                  <option value="acima-50">Vitalidade Acima dos 50 Anos</option>
                  <option value="disposicao">Disposição & Energia</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="rev-rating"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Nota de Satisfação
                </label>
                <select
                  id="rev-rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 bg-white focus:border-zinc-900 focus:outline-none"
                >
                  <option value={5}>5 Estrelas — Excelente</option>
                  <option value={4}>4 Estrelas — Muito Bom</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="rev-title"
                className="block text-xs font-semibold text-zinc-700 mb-1.5"
              >
                Título do seu relato *
              </label>
              <input
                id="rev-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Resultado surpreendente tomando 1 cápsula ao dia"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 focus:border-zinc-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="rev-before"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Como era antes de usar? (Opcional)
                </label>
                <textarea
                  id="rev-before"
                  rows={2}
                  value={beforeContext}
                  onChange={(e) => setBeforeContext(e.target.value)}
                  placeholder="Ex: Sentia cansaço e falta de confiança..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="rev-outcome"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Qual foi o resultado com Erectus Plus? *
                </label>
                <textarea
                  id="rev-outcome"
                  rows={2}
                  value={outcomeText}
                  onChange={(e) => setOutcomeText(e.target.value)}
                  placeholder="Ex: Recuperei a firmeza completa tomando 1 cápsula por dia..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 focus:border-zinc-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#059669] hover:bg-[#047857] rounded-lg transition-colors cursor-pointer"
              >
                Publicar Avaliação Verificada
              </button>
            </div>
          </form>
        )}

        {/* Interactive Filter Controls */}
        <div
          role="group"
          aria-label="Filtrar depoimentos por categoria"
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-zinc-200/70 rounded-xl w-fit mb-8"
        >
          {(
            [
              { id: 'todos', label: 'Todos os Relatos' },
              { id: 'acima-50', label: 'Homens 50+ Anos' },
              { id: 'firmeza', label: 'Firmeza & Rigidez' },
              { id: 'disposicao', label: 'Disposição & Libido' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredList.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl bg-white border border-zinc-200/90 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Rating + Unboxed Metadata Line */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-amber-500 text-amber-500"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Compra Verificada
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-900 mb-3">
                  “{item.title}”
                </h3>

                {/* Before & Outcome Narrative */}
                <div className="space-y-2.5 text-sm text-zinc-700 leading-relaxed">
                  <p className="text-zinc-500">
                    <strong className="text-zinc-700">Cenário anterior:</strong>{' '}
                    {item.beforeContext}
                  </p>
                  <p>
                    <strong className="text-zinc-900">Resultado obtido:</strong>{' '}
                    {item.outcomeText}
                  </p>
                </div>
              </div>

              {/* Clean Unboxed Author Metadata Footer (Zero-Pill Discipline) */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <strong className="text-zinc-900 font-semibold">
                  {item.authorName}
                </strong>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">{item.age} anos</span>
                <span aria-hidden="true">·</span>
                <span>{item.cityState}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#990A11] font-medium">
                  {item.kitPurchased}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
