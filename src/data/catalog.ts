import type { ProductKit, TestimonialItem } from '../utils/commerce';

export const PRODUCT_MOCKUP_PATH = '/assets/aistudio/download_133a19c6.png';

export const PRODUCT_KITS: ProductKit[] = [
  {
    id: 'caps-30',
    slug: 'caps-30',
    capsulesTotal: 30,
    bottles: 1,
    title: '30 Cápsulas — 1 Frasco',
    subtitle: 'Tratamento para 30 dias (1 cápsula por dia)',
    durationDays: 30,
    originalPrice: 199.90,
    basePrice: 169.90,
    installmentsCount: 12,
    freeShipping: false,
    featured: false,
    bestValue: false,
    tagText: 'Ciclo 30 Dias · 1 Frasco',
    recommendedFor: 'Ideal para experimentar a Fórmula Extra Forte (1 cápsula ao dia durante 30 dias).',
  },
  {
    id: 'caps-60',
    slug: 'caps-60',
    capsulesTotal: 60,
    bottles: 2,
    title: '60 Cápsulas — 2 Frascos',
    subtitle: 'Tratamento para 60 dias (1 cápsula por dia)',
    durationDays: 60,
    originalPrice: 339.80,
    basePrice: 249.90,
    installmentsCount: 12,
    freeShipping: true,
    featured: true,
    bestValue: false,
    tagText: 'Mais Vendido · 2 Frascos · Frete Grátis',
    recommendedFor: 'Protocolo recomendado de 60 dias para estabilizar a vasodilatação, firmeza e libido.',
  },
  {
    id: 'caps-90',
    slug: 'caps-90',
    capsulesTotal: 90,
    bottles: 3,
    title: '90 Cápsulas — 3 Frascos',
    subtitle: 'Tratamento completo para 90 dias (1 cápsula por dia)',
    durationDays: 90,
    originalPrice: 509.70,
    basePrice: 349.90,
    installmentsCount: 12,
    freeShipping: true,
    featured: false,
    bestValue: true,
    tagText: 'Maior Economia · 3 Frascos · Frete Grátis',
    recommendedFor: 'Protocolo completo de 90 dias com máximo desconto por cápsula e restauração profunda.',
  },
];

export interface FormulaComponent {
  id: string;
  name: string;
  concentration: string;
  role: string;
  mechanism: string;
  clinicalMetric: string;
}

export const FORMULA_COMPONENTS: FormulaComponent[] = [
  {
    id: 'tadalafila-bio',
    name: 'Tadalafila de Liberação Sinérgica',
    concentration: 'Dose Concentrada em 1 Cápsula/Dia',
    role: 'Fluxo Sanguíneo & Rigidez Peniana',
    mechanism:
      'Atua na inibição seletiva da enzima PDE-5, promovendo o relaxamento da musculatura lisa dos corpos cavernosos e ampliando a janela de resposta erétil por até 36 horas sob estímulo com apenas 1 cápsula ao dia.',
    clinicalMetric: 'Janela de resposta ativa de até 36h com apenas 1 cápsula diária',
  },
  {
    id: 'l-arginina-citrulina',
    name: 'Complexo L-Arginina + L-Citrulina',
    concentration: 'Aminoácidos Precursores (1 Cápsula/Dia)',
    role: 'Precursor Direto de Óxido Nítrico (NO)',
    mechanism:
      'Aminoácidos essenciais que elevam a síntese endógena de Óxido Nítrico no endotélio vascular, potencializando a ação da Tadalafila e reduzindo a fadiga muscular durante a relação.',
    clinicalMetric: '+42% na biodisponibilidade plasmática de Óxido Nítrico em uso contínuo',
  },
  {
    id: 'taurina-coq10',
    name: 'Taurina + Coenzima Q10 Bioativa',
    concentration: 'Energia Celular Concentrada',
    role: 'Vigor Cardíaco & Energia Mitocondrial',
    mechanism:
      'Fornece suporte energético direto às células musculares e endoteliais, combatendo o cansaço físico e mental acumulado após os 45 anos.',
    clinicalMetric: 'Redução perceptível da exaustão pós-esforço já nas primeiras semanas',
  },
  {
    id: 'zinco-selenio-boro',
    name: 'Zinco Quelato + Selênio + Crisina',
    concentration: '100% IDR em 1 Cápsula',
    role: 'Equilíbrio Hormonal & Libido Masculina',
    mechanism:
      'Cofatores minerais indispensáveis para a manutenção saudável da testosterona livre, preservação do desejo sexual e proteção antioxidante celular.',
    clinicalMetric: 'Suporte diário à síntese natural de testosterona biodisponível',
  },
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-1',
    authorName: 'Carlos Eduardo M.',
    age: 57,
    cityState: 'Campinas, SP',
    kitPurchased: '60 Cápsulas (2 Frascos)',
    category: 'acima-50',
    rating: 5,
    title: 'Apenas 1 cápsula por dia e recuperei toda a segurança',
    beforeContext:
      'Depois dos 52 anos comecei a perder a firmeza no meio da relação. Isso gerava ansiedade e eu acabava evitando momentos com minha esposa.',
    outcomeText:
      'Tomando 1 cápsula por dia do Erectus Plus já notei uma diferença absurda na resposta e na rigidez na primeira semana. A combinação da tadalafila com aminoácidos devolveu minha confiança total.',
    verifiedDate: '18 de Outubro de 2026',
  },
  {
    id: 'rev-2',
    authorName: 'Henrique Fontes',
    age: 48,
    cityState: 'Belo Horizonte, MG',
    kitPurchased: '60 Cápsulas (2 Frascos)',
    category: 'firmeza',
    rating: 5,
    title: 'Ereção firme do início ao fim e entrega 100% discreta',
    beforeContext:
      'Minha rotina de trabalho é muito pesada e chegava em casa esgotado, sem apetite sexual e com resposta lenta.',
    outcomeText:
      'Escolhi o kit de 60 cápsulas (2 frascos) por R$ 249,90. A caixa chegou totalmente discreta em 3 dias úteis e o resultado na firmeza superou qualquer produto que já testei.',
    verifiedDate: '12 de Outubro de 2026',
  },
  {
    id: 'rev-3',
    authorName: 'Roberto S. Cavalcanti',
    age: 63,
    cityState: 'Porto Alegre, RS',
    kitPurchased: '90 Cápsulas (3 Frascos)',
    category: 'acima-50',
    rating: 5,
    title: 'Aos 63 anos voltei a ter a vitalidade dos meus 40',
    beforeContext:
      'Já havia tentado suplementos comuns de farmácia que exigiam várias cápsulas ao dia e não resolviam a circulação de verdade.',
    outcomeText:
      'A Fórmula Extra Forte do Erectus Plus é muito prática: é só 1 cápsula ao dia. Peguei o kit de 90 cápsulas (3 frascos) por R$ 349,90 e a disposição e firmeza estão impecáveis.',
    verifiedDate: '05 de Outubro de 2026',
  },
  {
    id: 'rev-4',
    authorName: 'Marcelo Tavares',
    age: 44,
    cityState: 'Goiânia, GO',
    kitPurchased: '30 Cápsulas (1 Frasco)',
    category: 'disposicao',
    rating: 5,
    title: 'Mais energia física e praticidade de 1 cápsula diária',
    beforeContext:
      'Comprei o kit de 30 cápsulas (1 frasco por R$ 169,90) para testar porque queria algo que melhorasse tanto a disposição quanto o desempenho à noite.',
    outcomeText:
      'Senti o efeito logo nos primeiros dias. Hoje mesmo voltei na página para garantir o kit de 90 cápsulas (3 frascos).',
    verifiedDate: '29 de Setembro de 2026',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Como devo tomar o Erectus Plus? Quantas cápsulas por dia?',
    answer:
      'A posologia oficial da Fórmula Extra Forte é de apenas 1 cápsula por dia, ingerida com água. Por isso, 1 frasco (30 cápsulas) dura exatos 30 dias, 2 frascos (60 cápsulas) duram 60 dias, e 3 frascos (90 cápsulas) duram 90 dias de tratamento completo.',
  },
  {
    question: 'Quais são as opções de kits e preços oficiais?',
    answer:
      'Nossos kits são medidos pela quantidade de cápsulas para o seu ciclo: 30 Cápsulas (1 Frasco) por R$ 169,90; 60 Cápsulas (2 Frascos) por R$ 249,90 com Frete Grátis; e 90 Cápsulas (3 Frascos) por R$ 349,90 com Frete Grátis e o menor custo por cápsula.',
  },
  {
    question: 'Como funciona a Garantia de 7 Dias?',
    answer:
      'Você conta com a Garantia Oficial de 7 Dias a partir do recebimento do seu pedido, em total conformidade com o Código de Defesa do Consumidor. Sua compra é 100% segura, rastreada e protegida.',
  },
  {
    question: 'A embalagem é discreta? Alguém saberá o que comprei?',
    answer:
      'Sua privacidade é absoluta. Todos os pedidos são enviados em caixas pardas lacradas, sem logotipo, sem nome do produto e sem menção a suplemento sexual na etiqueta de transporte. Na fatura do cartão ou comprovante bancário, aparece apenas a razão social discreta.',
  },
  {
    question: 'Existem contraindicações ou cuidados especiais?',
    answer:
      'Por conter ativos vasodilatadores potentes (Tadalafila + Aminoácidos), homens que utilizam medicamentos à base de nitratos (para angina ou problemas cardíacos graves) ou com hipertensão descontrolada devem consultar um médico cardiologista ou urologista antes de iniciar o uso.',
  },
];
