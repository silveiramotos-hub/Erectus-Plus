import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateOrderPricing,
  recommendProtocol,
  validateCheckoutForm,
  filterTestimonials,
  computeReviewStats,
  calculateShippingEstimate,
  formatCPF,
  formatCEP,
  type ProductKit,
  type TestimonialItem,
} from './commerce';

const mockKit30: ProductKit = {
  id: 'caps-30',
  slug: 'caps-30',
  capsulesTotal: 30,
  bottles: 1,
  title: '30 Cápsulas — 1 Frasco',
  subtitle: 'Tratamento para 30 dias (1 cápsula ao dia)',
  durationDays: 30,
  originalPrice: 199.90,
  basePrice: 169.90,
  installmentsCount: 12,
  freeShipping: false,
  featured: false,
  bestValue: false,
  tagText: '30 Cápsulas · 1 Frasco',
  recommendedFor: 'Ciclo inicial de 30 dias',
};

const mockKit60: ProductKit = {
  id: 'caps-60',
  slug: 'caps-60',
  capsulesTotal: 60,
  bottles: 2,
  title: '60 Cápsulas — 2 Frascos',
  subtitle: 'Tratamento para 60 dias (1 cápsula ao dia)',
  durationDays: 60,
  originalPrice: 339.80,
  basePrice: 249.90,
  installmentsCount: 12,
  freeShipping: true,
  featured: true,
  bestValue: false,
  tagText: 'Mais Vendido · 60 Cápsulas · 2 Frascos',
  recommendedFor: 'Ciclo intermediário de 60 dias',
};

const mockKit90: ProductKit = {
  id: 'caps-90',
  slug: 'caps-90',
  capsulesTotal: 90,
  bottles: 3,
  title: '90 Cápsulas — 3 Frascos',
  subtitle: 'Tratamento para 90 dias (1 cápsula ao dia)',
  durationDays: 90,
  originalPrice: 509.70,
  basePrice: 349.90,
  installmentsCount: 12,
  freeShipping: true,
  featured: false,
  bestValue: true,
  tagText: 'Maior Economia · 90 Cápsulas · 3 Frascos',
  recommendedFor: 'Ciclo completo de 90 dias',
};

test('calculateOrderPricing matches exact official prices (169.90, 249.90, 349.90) and coupon math', () => {
  const p30 = calculateOrderPricing(mockKit30, 1, 'pix', '');
  assert.equal(p30.baseSubtotal, 169.90);
  assert.equal(p30.totalCapsules, 30);
  assert.equal(p30.totalBottles, 1);

  const p60 = calculateOrderPricing(mockKit60, 1, 'pix', '');
  assert.equal(p60.baseSubtotal, 249.90);
  assert.equal(p60.finalTotal, 249.90);
  assert.equal(p60.totalCapsules, 60);
  assert.equal(p60.totalBottles, 2);
  assert.equal(p60.totalSavings, 89.90);

  const p90 = calculateOrderPricing(mockKit90, 1, 'pix', '');
  assert.equal(p90.baseSubtotal, 349.90);
  assert.equal(p90.finalTotal, 349.90);
  assert.equal(p90.totalCapsules, 90);
  assert.equal(p90.totalBottles, 3);
  assert.equal(p90.totalSavings, 159.80);

  const couponOrder = calculateOrderPricing(mockKit60, 1, 'pix', 'FORTE10');
  assert.equal(couponOrder.couponCode, 'FORTE10');
  assert.equal(couponOrder.couponDiscountAmount, 24.99);
  assert.equal(couponOrder.finalTotal, 224.91);
});

test('recommendProtocol maps user profile to 30, 60, or 90 capsules at 1 capsule per day', () => {
  const seniorComplete = recommendProtocol({
    ageRange: '60+',
    primaryGoal: 'completo',
    durationMonths: 'longo',
  });
  assert.equal(seniorComplete.recommendedKitSlug, 'caps-90');
  assert.equal(seniorComplete.capsulesCount, 90);
  assert.equal(seniorComplete.bottlesCount, 3);
  assert.equal(seniorComplete.dailyDosage, '1 cápsula por dia com água');

  const midProfile = recommendProtocol({
    ageRange: '45-59',
    primaryGoal: 'firmeza',
    durationMonths: 'moderado',
  });
  assert.equal(midProfile.recommendedKitSlug, 'caps-60');
  assert.equal(midProfile.capsulesCount, 60);
  assert.equal(midProfile.bottlesCount, 2);

  const starterProfile = recommendProtocol({
    ageRange: '30-44',
    primaryGoal: 'energia-libido',
    durationMonths: 'recente',
  });
  assert.equal(starterProfile.recommendedKitSlug, 'caps-30');
  assert.equal(starterProfile.capsulesCount, 30);
  assert.equal(starterProfile.bottlesCount, 1);
});

test('validateCheckoutForm and shipping estimator work deterministically', () => {
  const valid = validateCheckoutForm({
    fullName: 'Roberto Almeida Mendes',
    cpf: '428.519.630-72',
    phone: '(11) 98765-4321',
    email: 'roberto.mendes@exemplo.com.br',
    cep: '01310-100',
    street: 'Avenida Paulista',
    number: '1578',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    paymentMethod: 'pix',
  });
  assert.equal(valid.valid, true);
  assert.equal(formatCPF('42851963072'), '428.519.630-72');
  assert.equal(formatCEP('01310100'), '01310-100');

  const spShipping = calculateShippingEstimate('01310-100');
  assert.equal(spShipping.valid, true);
  assert.equal(spShipping.businessDaysMin, 1);
  assert.equal(spShipping.businessDaysMax, 3);

  const items: TestimonialItem[] = [
    {
      id: '1',
      authorName: 'Marcos V.',
      age: 56,
      cityState: 'Curitiba, PR',
      kitPurchased: '60 Cápsulas (2 Frascos)',
      category: 'firmeza',
      rating: 5,
      title: 'Resultado consistente',
      beforeContext: 'Antes tinha insegurança',
      outcomeText: 'Recuperei a firmeza tomando 1 cápsula por dia',
      verifiedDate: 'Outubro 2026',
    },
  ];
  const stats = computeReviewStats(items);
  assert.equal(stats.totalCount, 1);
  assert.equal(filterTestimonials(items, 'acima-50').length, 1);
});
