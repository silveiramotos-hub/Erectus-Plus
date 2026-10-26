export type PaymentMethod = 'pix' | 'card' | 'boleto';
export type KitSlug = 'caps-30' | 'caps-60' | 'caps-90';

export const BRAIP_CHECKOUT_URLS: Record<KitSlug, string> = {
  'caps-30': 'https://ev.braip.com/checkout/pla48l1v/chedd8lj',
  'caps-60': 'https://ev.braip.com/checkout/pla0n42m/chedd8lj',
  'caps-90': 'https://ev.braip.com/checkout/plaoqyz6/chedd8lj',
};

export interface ProductKit {
  id: string;
  slug: KitSlug;
  capsulesTotal: 30 | 60 | 90;
  bottles: 1 | 2 | 3;
  title: string;
  subtitle: string;
  durationDays: number;
  originalPrice: number;
  basePrice: number;
  installmentsCount: number;
  freeShipping: boolean;
  featured: boolean;
  bestValue: boolean;
  tagText: string;
  recommendedFor: string;
  checkoutUrl: string;
}

export interface OrderPricingBreakdown {
  kitId: string;
  capsulesTotal: number;
  bottles: number;
  quantity: number;
  totalCapsules: number;
  totalBottles: number;
  originalSubtotal: number;
  baseSubtotal: number;
  couponCode: string | null;
  couponDiscountAmount: number;
  shippingCost: number;
  finalTotal: number;
  perCapsuleFinal: number;
  perBottleFinal: number;
  installmentValue: number;
  installmentsCount: number;
  totalSavings: number;
  savingsPercent: number;
}

export interface CheckoutFormInput {
  fullName: string;
  cpf: string;
  phone: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  paymentMethod: PaymentMethod;
  cardNumber?: string;
  cardHolder?: string;
  cardExpiry?: string;
}

export interface CheckoutValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof CheckoutFormInput, string>>;
}

export interface ProtocolQuizInput {
  ageRange: '30-44' | '45-59' | '60+';
  primaryGoal: 'firmeza' | 'energia-libido' | 'completo';
  durationMonths: 'recente' | 'moderado' | 'longo';
}

export interface ProtocolRecommendation {
  recommendedKitSlug: KitSlug;
  checkoutUrl: string;
  dailyDosage: string;
  cycleDays: number;
  capsulesCount: 30 | 60 | 90;
  bottlesCount: 1 | 2 | 3;
  rationale: string;
  expectedTimeline: string;
}

export interface TestimonialItem {
  id: string;
  authorName: string;
  age: number;
  cityState: string;
  kitPurchased: string;
  category: 'acima-50' | 'firmeza' | 'disposicao';
  rating: number;
  title: string;
  beforeContext: string;
  outcomeText: string;
  verifiedDate: string;
}

const VALID_COUPONS: Record<string, number> = {
  FORTE10: 0.10,
  VITAL10: 0.10,
  ERECTUS15: 0.15,
};

export function formatBRL(value: number): string {
  const safe = Number.isFinite(value) ? value : 0;
  return safe
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/\u00A0/g, ' ');
}

export function normalizeDigits(input: string): string {
  return (input || '').replace(/\D/g, '');
}

export function formatCPF(input: string): string {
  const digits = normalizeDigits(input).slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}

export function formatCEP(input: string): string {
  const digits = normalizeDigits(input).slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
}

export function formatPhone(input: string): string {
  const digits = normalizeDigits(input).slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export function calculateOrderPricing(
  kit: ProductKit,
  quantity: number,
  _paymentMethod: PaymentMethod,
  rawCoupon?: string
): OrderPricingBreakdown {
  const safeQty = Math.max(1, Math.min(10, Math.floor(quantity || 1)));
  const totalCapsules = kit.capsulesTotal * safeQty;
  const totalBottles = kit.bottles * safeQty;
  const originalSubtotal = Number((kit.originalPrice * safeQty).toFixed(2));
  const baseSubtotal = Number((kit.basePrice * safeQty).toFixed(2));

  const normalizedCoupon = (rawCoupon || '').trim().toUpperCase();
  const couponRate = VALID_COUPONS[normalizedCoupon] ?? 0;
  const couponCode = couponRate > 0 ? normalizedCoupon : null;
  const couponDiscountAmount = Number((baseSubtotal * couponRate).toFixed(2));

  const subtotalAfterCoupon = Number(
    Math.max(0, baseSubtotal - couponDiscountAmount).toFixed(2)
  );

  const shippingCost = 0;
  const finalTotal = Number((subtotalAfterCoupon + shippingCost).toFixed(2));
  const perCapsuleFinal = Number((subtotalAfterCoupon / totalCapsules).toFixed(2));
  const perBottleFinal = Number((subtotalAfterCoupon / totalBottles).toFixed(2));

  const installmentValue = Number((finalTotal / kit.installmentsCount).toFixed(2));

  const totalSavings = Number(
    Math.max(0, originalSubtotal - subtotalAfterCoupon).toFixed(2)
  );
  const savingsPercent =
    originalSubtotal > 0
      ? Math.round((totalSavings / originalSubtotal) * 100)
      : 0;

  return {
    kitId: kit.id,
    capsulesTotal: kit.capsulesTotal,
    bottles: kit.bottles,
    quantity: safeQty,
    totalCapsules,
    totalBottles,
    originalSubtotal,
    baseSubtotal,
    couponCode,
    couponDiscountAmount,
    shippingCost,
    finalTotal,
    perCapsuleFinal,
    perBottleFinal,
    installmentValue,
    installmentsCount: kit.installmentsCount,
    totalSavings,
    savingsPercent,
  };
}

export function recommendProtocol(input: ProtocolQuizInput): ProtocolRecommendation {
  let score = 0;

  if (input.ageRange === '45-59') score += 2;
  if (input.ageRange === '60+') score += 3;
  if (input.ageRange === '30-44') score += 1;

  if (input.primaryGoal === 'completo') score += 3;
  if (input.primaryGoal === 'firmeza') score += 2;
  if (input.primaryGoal === 'energia-libido') score += 1;

  if (input.durationMonths === 'longo') score += 3;
  if (input.durationMonths === 'moderado') score += 2;
  if (input.durationMonths === 'recente') score += 1;

  if (score >= 7) {
    return {
      recommendedKitSlug: 'caps-90',
      checkoutUrl: BRAIP_CHECKOUT_URLS['caps-90'],
      dailyDosage: '1 cápsula por dia com água',
      cycleDays: 90,
      capsulesCount: 90,
      bottlesCount: 3,
      rationale:
        'Para consolidar a vasodilatação endotelial contínua e restaurar os níveis de aminoácidos em homens maduros, o kit de 90 cápsulas (3 frascos) garante 3 meses completos tomando 1 cápsula ao dia.',
      expectedTimeline: 'Primeiros sinais na 1ª semana; estabilidade vascular máxima ao longo dos 90 dias.',
    };
  }

  if (score >= 5) {
    return {
      recommendedKitSlug: 'caps-60',
      checkoutUrl: BRAIP_CHECKOUT_URLS['caps-60'],
      dailyDosage: '1 cápsula por dia com água',
      cycleDays: 60,
      capsulesCount: 60,
      bottlesCount: 2,
      rationale:
        'O kit de 60 cápsulas (2 frascos) oferece 60 dias de tratamento contínuo (1 cápsula por dia), combinando a ação da Tadalafila com a reposição progressiva de aminoácidos.',
      expectedTimeline: 'Resposta inicial nos primeiros dias; firmeza e resistência consolidadas no 2º mês.',
    };
  }

  return {
    recommendedKitSlug: 'caps-30',
    checkoutUrl: BRAIP_CHECKOUT_URLS['caps-30'],
    dailyDosage: '1 cápsula por dia com água',
    cycleDays: 30,
    capsulesCount: 30,
    bottlesCount: 1,
    rationale:
      'Ideal para iniciar o uso da Fórmula Extra Forte (Tadalafila + Aminoácidos) por 30 dias tomando apenas 1 cápsula ao dia.',
    expectedTimeline: 'Ativação perceptível já na primeira semana de uso regular.',
  };
}

export function validateCheckoutForm(input: CheckoutFormInput): CheckoutValidationResult {
  const errors: Partial<Record<keyof CheckoutFormInput, string>> = {};

  const trimmedName = (input.fullName || '').trim();
  if (trimmedName.length < 5 || !trimmedName.includes(' ')) {
    errors.fullName = 'Informe seu nome e sobrenome completos.';
  }

  const cpfDigits = normalizeDigits(input.cpf);
  if (cpfDigits.length !== 11 || /^(\d)\1{10}$/.test(cpfDigits)) {
    errors.cpf = 'Informe um CPF válido com 11 dígitos.';
  }

  const phoneDigits = normalizeDigits(input.phone);
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    errors.phone = 'Informe um WhatsApp/celular válido com DDD.';
  }

  const emailTrimmed = (input.email || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
    errors.email = 'Informe um e-mail válido para receber o rastreio.';
  }

  const cepDigits = normalizeDigits(input.cep);
  if (cepDigits.length !== 8) {
    errors.cep = 'Informe um CEP válido com 8 dígitos.';
  }

  if ((input.street || '').trim().length < 3) {
    errors.street = 'Informe o endereço de entrega.';
  }

  if ((input.number || '').trim().length < 1) {
    errors.number = 'Informe o número da residência.';
  }

  if ((input.city || '').trim().length < 2) {
    errors.city = 'Informe sua cidade.';
  }

  if ((input.state || '').trim().length !== 2) {
    errors.state = 'UF inválida.';
  }

  if (input.paymentMethod === 'card') {
    const cardDigits = normalizeDigits(input.cardNumber || '');
    if (cardDigits.length < 13 || cardDigits.length > 19) {
      errors.cardNumber = 'Informe um número de cartão válido.';
    }
    if ((input.cardHolder || '').trim().length < 4) {
      errors.cardHolder = 'Informe o nome impresso no cartão.';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterTestimonials(
  items: TestimonialItem[],
  category: 'todos' | 'acima-50' | 'firmeza' | 'disposicao'
): TestimonialItem[] {
  if (category === 'todos') return items;
  if (category === 'acima-50') {
    return items.filter((item) => item.age >= 50 || item.category === 'acima-50');
  }
  return items.filter((item) => item.category === category);
}

export function computeReviewStats(items: TestimonialItem[]): {
  averageRating: number;
  totalCount: number;
  fiveStarPercent: number;
} {
  if (items.length === 0) {
    return { averageRating: 0, totalCount: 0, fiveStarPercent: 0 };
  }
  const sum = items.reduce((acc, item) => acc + item.rating, 0);
  const fiveStars = items.filter((item) => item.rating === 5).length;
  return {
    averageRating: Number((sum / items.length).toFixed(1)),
    totalCount: items.length,
    fiveStarPercent: Math.round((fiveStars / items.length) * 100),
  };
}

export interface ShippingEstimate {
  valid: boolean;
  cepFormatted: string;
  regionLabel: string;
  cityStatePreview: string;
  businessDaysMin: number;
  businessDaysMax: number;
  carrier: string;
  discreteAssurance: string;
}

export function calculateShippingEstimate(rawCep: string): ShippingEstimate {
  const digits = normalizeDigits(rawCep);
  if (digits.length !== 8) {
    return {
      valid: false,
      cepFormatted: formatCEP(rawCep),
      regionLabel: '',
      cityStatePreview: '',
      businessDaysMin: 0,
      businessDaysMax: 0,
      carrier: '',
      discreteAssurance: '',
    };
  }

  const firstDigit = parseInt(digits[0], 10);
  let regionLabel = 'Sudeste';
  let cityStatePreview = 'São Paulo / Região Metropolitana';
  let businessDaysMin = 2;
  let businessDaysMax = 4;

  if (firstDigit === 0 || firstDigit === 1) {
    regionLabel = 'Sudeste (SP)';
    cityStatePreview = 'São Paulo, SP';
    businessDaysMin = 1;
    businessDaysMax = 3;
  } else if (firstDigit === 2) {
    regionLabel = 'Sudeste (RJ / ES)';
    cityStatePreview = 'Rio de Janeiro / Vitória';
    businessDaysMin = 2;
    businessDaysMax = 4;
  } else if (firstDigit === 3) {
    regionLabel = 'Sudeste (MG)';
    cityStatePreview = 'Belo Horizonte, MG';
    businessDaysMin = 2;
    businessDaysMax = 4;
  } else if (firstDigit === 8 || firstDigit === 9) {
    regionLabel = 'Sul (PR / SC / RS)';
    cityStatePreview = 'Curitiba / Porto Alegre';
    businessDaysMin = 3;
    businessDaysMax = 5;
  } else if (firstDigit === 7) {
    regionLabel = 'Centro-Oeste';
    cityStatePreview = 'Brasília / Goiânia';
    businessDaysMin = 3;
    businessDaysMax = 6;
  } else {
    regionLabel = 'Nordeste / Norte';
    cityStatePreview = 'Capitais e Interior';
    businessDaysMin = 4;
    businessDaysMax = 8;
  }

  return {
    valid: true,
    cepFormatted: formatCEP(digits),
    regionLabel,
    cityStatePreview,
    businessDaysMin,
    businessDaysMax,
    carrier: 'SEDEX / Transportadora Expressa Sigilosa',
    discreteAssurance: 'Caixa parda lacrada sem logotipo e com seguro total',
  };
}
