import React, { useState } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Copy,
  Check,
  QrCode,
  CreditCard,
  FileText,
} from 'lucide-react';
import { PRODUCT_KITS } from '../data/catalog';
import {
  calculateOrderPricing,
  validateCheckoutForm,
  formatBRL,
  formatCPF,
  formatCEP,
  formatPhone,
  normalizeDigits,
  type PaymentMethod,
  type CheckoutFormInput,
  type KitSlug,
} from '../utils/commerce';
import { BottleShowcase } from './BottleShowcase';

interface CheckoutModalProps {
  isOpen: boolean;
  selectedKitSlug: KitSlug;
  initialPaymentMethod?: PaymentMethod;
  initialCep?: string;
  onClose: () => void;
  onChangeKit: (slug: KitSlug) => void;
}

const CEP_DEMO_DIRECTORY: Record<
  string,
  { street: string; neighborhood: string; city: string; state: string }
> = {
  '01310100': {
    street: 'Avenida Paulista',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
  },
  '22041001': {
    street: 'Avenida Atlântica',
    neighborhood: 'Copacabana',
    city: 'Rio de Janeiro',
    state: 'RJ',
  },
  '30140071': {
    street: 'Avenida Brasil',
    neighborhood: 'Santa Efigênia',
    city: 'Belo Horizonte',
    state: 'MG',
  },
  '80010000': {
    street: 'Rua XV de Novembro',
    neighborhood: 'Centro',
    city: 'Curitiba',
    state: 'PR',
  },
};

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  selectedKitSlug,
  initialPaymentMethod = 'pix',
  initialCep = '',
  onClose,
  onChangeKit,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>(initialPaymentMethod);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  const [form, setForm] = useState<CheckoutFormInput>({
    fullName: '',
    cpf: '',
    phone: '',
    email: '',
    cep: initialCep,
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: 'SP',
    paymentMethod: initialPaymentMethod,
    cardNumber: '',
    cardHolder: '',
    cardExpiry: '',
  });

  const handleCepChange = (raw: string) => {
    const formatted = formatCEP(raw);
    const digits = normalizeDigits(raw);
    setForm((prev) => ({ ...prev, cep: formatted }));

    if (digits.length === 8) {
      const preset = CEP_DEMO_DIRECTORY[digits] || {
        street: 'Rua das Palmeiras',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
      };
      setForm((prev) => ({
        ...prev,
        cep: formatted,
        street: prev.street || preset.street,
        neighborhood: prev.neighborhood || preset.neighborhood,
        city: prev.city || preset.city,
        state: prev.state || preset.state,
      }));
    }
  };

  React.useEffect(() => {
    if (initialCep && normalizeDigits(initialCep).length === 8) {
      handleCepChange(initialCep);
    }
  }, [initialCep]);

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormInput, string>>
  >({});
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    pixCode: string;
    customerName: string;
    total: number;
    kitTitle: string;
    paymentMethod: PaymentMethod;
  } | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  if (!isOpen) return null;

  const activeKit =
    PRODUCT_KITS.find((k) => k.slug === selectedKitSlug) || PRODUCT_KITS[1];
  const pricing = calculateOrderPricing(
    activeKit,
    quantity,
    paymentMethod,
    appliedCoupon
  );

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (code === 'FORTE10' || code === 'VITAL10' || code === 'ERECTUS15') {
      setAppliedCoupon(code);
      setCouponFeedback(`Cupom ${code} aplicado com sucesso!`);
    } else {
      setCouponFeedback('Cupom inválido. Dica: use FORTE10 para 10% OFF extra.');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCheckoutForm({
      ...form,
      paymentMethod,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const orderNum = `EP-${Math.floor(100000 + Math.random() * 900000)}`;
    const pixPayload = `00020126580014BR.GOV.BCB.PIX0136erectusplus-oficial-${orderNum.toLowerCase()}5204000053039865406${pricing.finalTotal.toFixed(
      2
    )}5802BR5919ERECTUS PLUS OFICIAL6009SAO PAULO62070503***6304A1B2`;

    setConfirmedOrder({
      orderNumber: orderNum,
      pixCode: pixPayload,
      customerName: form.fullName.trim(),
      total: pricing.finalTotal,
      kitTitle: `${activeKit.title} (x${quantity})`,
      paymentMethod,
    });
  };

  const handleCopyPix = () => {
    if (!confirmedOrder) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(confirmedOrder.pixCode).catch(() => {});
    }
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl rounded-2xl bg-white text-zinc-900 shadow-2xl border border-zinc-200 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 bg-[#140608] text-white border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-[#B8E900]" aria-hidden="true" />
            <h2
              id="checkout-dialog-title"
              className="font-display text-base sm:text-lg font-bold tracking-tight"
            >
              Checkout Simplificado — Erectus Plus Oficial
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar Checkout"
            className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-7 overflow-y-auto">
          {confirmedOrder ? (
            /* Post-Order Confirmation State */
            <div
              data-testid="order-confirmation-view"
              className="py-4 max-w-2xl mx-auto text-center"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="text-xs font-mono-tabular font-semibold uppercase tracking-wider text-emerald-700">
                PEDIDO CONFIRMADO · PROTOCOLO #{confirmedOrder.orderNumber}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 mt-1 mb-2">
                Parabéns, {confirmedOrder.customerName.split(' ')[0]}! Seu pedido foi reservado.
              </h3>
              <p className="text-sm text-zinc-600 mb-6">
                Sua embalagem parda 100% discreta já entrou na fila de expedição prioritária.
              </p>

              <div className="rounded-xl bg-[#FAF8F5] border border-zinc-200 p-5 text-left mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-200 text-xs sm:text-sm">
                  <span className="text-zinc-500">Kit Selecionado:</span>
                  <strong className="text-zinc-900">
                    {confirmedOrder.kitTitle}
                  </strong>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-200 text-xs sm:text-sm">
                  <span className="text-zinc-500">Valor Total Final:</span>
                  <strong className="font-mono-tabular text-lg text-emerald-700">
                    {formatBRL(confirmedOrder.total)}
                  </strong>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
                  <span>Privacidade e Garantia:</span>
                  <span className="font-medium text-zinc-800">
                    Caixa parda discreta · Garantia Oficial de 7 Dias
                  </span>
                </div>
              </div>

              {confirmedOrder.paymentMethod === 'pix' && (
                <div className="rounded-xl bg-emerald-50/80 border border-emerald-200 p-5 text-left mb-6">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-2">
                    <QrCode className="w-4 h-4" />
                    <span>Código PIX Copia e Cola (Liberação Imediata)</span>
                  </div>
                  <p className="text-xs text-emerald-800 mb-3">
                    Copie a chave abaixo e cole no aplicativo do seu banco na opção{' '}
                    <strong>PIX Copia e Cola</strong>:
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      aria-label="Código PIX Copia e Cola"
                      value={confirmedOrder.pixCode}
                      className="w-full px-3 py-2 text-xs font-mono-tabular bg-white border border-emerald-300 rounded-lg text-zinc-700"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedPix ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copiar PIX
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setConfirmedOrder(null);
                  onClose();
                }}
                className="px-6 py-3 text-sm font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl cursor-pointer"
              >
                Voltar para a Página Inicial
              </button>
            </div>
          ) : (
            /* Checkout Form + Order Summary Split */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
              {/* Left 7 Cols: Customer & Payment Form */}
              <form
                id="express-checkout-form"
                onSubmit={handleSubmitOrder}
                className="lg:col-span-7 space-y-5"
                noValidate
              >
                {/* 1. Quick Kit Selector Inside Checkout (by Capsules) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    1. Confirme seu Kit de Cápsulas (1 Cápsula ao Dia)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRODUCT_KITS.map((k) => {
                      const active = k.slug === selectedKitSlug;
                      return (
                        <button
                          key={k.id}
                          type="button"
                          onClick={() => onChangeKit(k.slug)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'bg-[#140608] text-white border-[#990A11]'
                              : 'bg-[#FAF8F5] text-zinc-800 border-zinc-200 hover:border-zinc-300'
                          }`}
                        >
                          <p className="font-display font-bold text-xs sm:text-sm">
                            {k.capsulesTotal} Cápsulas
                          </p>
                          <p
                            className={`text-[11px] font-mono-tabular ${
                              active ? 'text-[#B8E900]' : 'text-zinc-500'
                            }`}
                          >
                            {k.bottles} {k.bottles === 1 ? 'Frasco' : 'Frascos'} · {formatBRL(k.basePrice)}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Personal Identification */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    2. Dados Pessoais e Rastreio
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="chk-name"
                        className="block text-xs font-semibold text-zinc-700 mb-1"
                      >
                        Nome Completo *
                      </label>
                      <input
                        id="chk-name"
                        type="text"
                        value={form.fullName}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        placeholder="Ex: Roberto Almeida Mendes"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 focus:border-zinc-900 focus:outline-none"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="chk-cpf"
                        className="block text-xs font-semibold text-zinc-700 mb-1"
                      >
                        CPF (para Nota Fiscal Sigilosa) *
                      </label>
                      <input
                        id="chk-cpf"
                        type="text"
                        value={form.cpf}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            cpf: formatCPF(e.target.value),
                          }))
                        }
                        placeholder="000.000.000-00"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 font-mono-tabular focus:border-zinc-900 focus:outline-none"
                      />
                      {errors.cpf && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.cpf}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="chk-phone"
                        className="block text-xs font-semibold text-zinc-700 mb-1"
                      >
                        WhatsApp com DDD *
                      </label>
                      <input
                        id="chk-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            phone: formatPhone(e.target.value),
                          }))
                        }
                        placeholder="(11) 98765-4321"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 font-mono-tabular focus:border-zinc-900 focus:outline-none"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="chk-email"
                        className="block text-xs font-semibold text-zinc-700 mb-1"
                      >
                        E-mail Principal *
                      </label>
                      <input
                        id="chk-email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="seuemail@dominio.com.br"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-300 focus:border-zinc-900 focus:outline-none"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Discrete Delivery Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    3. Endereço de Entrega Discreta
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="chk-cep"
                        className="block text-xs font-semibold text-zinc-700 mb-1"
                      >
                        CEP *
                      </label>
                      <input
                        id="chk-cep"
                        type="text"
                        value={form.cep}
                        onChange={(e) => handleCepChange(e.target.value)}
                        placeholder="01310-100"
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-zinc-300 font-mono-tabular focus:border-zinc-900 focus:outline-none"
                      />
                      {errors.cep && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.cep}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="chk-street"
                        className="block text-xs font-semibold text-zinc-700 mb-1"
                      >
                        Rua / Avenida *
                      </label>
                      <input
                        id="chk-street"
                        type="text"
                        value={form.street}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            street: e.target.value,
                          }))
                        }
                        placeholder="Avenida Paulista"
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-zinc-300 focus:border-zinc-900 focus:outline-none"
                      />
                      {errors.street && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.street}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-1">
                      <label
                        htmlFor="chk-number"
                        className="block text-xs font-semibold text-zinc-700 mb-1"
                      >
                        Nº *
                      </label>
                      <input
                        id="chk-number"
                        type="text"
                        value={form.number}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            number: e.target.value,
                          }))
                        }
                        placeholder="1500"
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-zinc-300 font-mono-tabular focus:border-zinc-900 focus:outline-none"
                      />
                      {errors.number && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.number}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="chk-city"
                        className="block text-xs font-semibold text-zinc-700 mb-1"
                      >
                        Cidade *
                      </label>
                      <input
                        id="chk-city"
                        type="text"
                        value={form.city}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, city: e.target.value }))
                        }
                        placeholder="São Paulo"
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-zinc-300 focus:border-zinc-900 focus:outline-none"
                      />
                      {errors.city && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="chk-state"
                        className="block text-xs font-semibold text-zinc-700 mb-1"
                      >
                        Estado (UF) *
                      </label>
                      <input
                        id="chk-state"
                        type="text"
                        maxLength={2}
                        value={form.state}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            state: e.target.value.toUpperCase(),
                          }))
                        }
                        placeholder="SP"
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-zinc-300 font-mono-tabular focus:border-zinc-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Payment Method Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    4. Forma de Pagamento
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between cursor-pointer ${
                        paymentMethod === 'pix'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                          : 'bg-white border-zinc-200 text-zinc-700'
                      }`}
                    >
                      <QrCode className="w-4 h-4 text-emerald-700 mb-1" />
                      <span className="text-xs font-bold block">
                        PIX à Vista
                      </span>
                      <span className="text-[11px] text-zinc-500">
                        Aprovação imediata
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-zinc-900 border-zinc-900 text-white'
                          : 'bg-white border-zinc-200 text-zinc-700'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mb-1" />
                      <span className="text-xs font-bold block">
                        Cartão até 12x
                      </span>
                      <span
                        className={`text-[11px] ${
                          paymentMethod === 'card'
                            ? 'text-zinc-300'
                            : 'text-zinc-500'
                        }`}
                      >
                        Fatura discreta
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('boleto')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between cursor-pointer ${
                        paymentMethod === 'boleto'
                          ? 'bg-zinc-900 border-zinc-900 text-white'
                          : 'bg-white border-zinc-200 text-zinc-700'
                      }`}
                    >
                      <FileText className="w-4 h-4 mb-1" />
                      <span className="text-xs font-bold block">Boleto</span>
                      <span
                        className={`text-[11px] ${
                          paymentMethod === 'boleto'
                            ? 'text-zinc-300'
                            : 'text-zinc-500'
                        }`}
                      >
                        À vista
                      </span>
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="chk-card-num"
                          className="block text-xs font-semibold text-zinc-700 mb-1"
                        >
                          Número do Cartão *
                        </label>
                        <input
                          id="chk-card-num"
                          type="text"
                          value={form.cardNumber}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              cardNumber: e.target.value,
                            }))
                          }
                          placeholder="0000 0000 0000 0000"
                          className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 bg-white font-mono-tabular"
                        />
                        {errors.cardNumber && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="chk-card-holder"
                          className="block text-xs font-semibold text-zinc-700 mb-1"
                        >
                          Nome Impresso no Cartão *
                        </label>
                        <input
                          id="chk-card-holder"
                          type="text"
                          value={form.cardHolder}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              cardHolder: e.target.value,
                            }))
                          }
                          placeholder="ROBERTO A MENDES"
                          className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 bg-white"
                        />
                        {errors.cardHolder && (
                          <p className="text-xs text-red-600 mt-1">
                            {errors.cardHolder}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-[#059669] hover:bg-[#047857] shadow-lg transition-colors cursor-pointer"
                >
                  Finalizar Pedido Seguro · {formatBRL(pricing.finalTotal)}
                </button>
              </form>

              {/* Right 5 Cols: Order Summary & Coupon */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#FAF8F5] border border-zinc-200 p-5 sm:p-6">
                <div>
                  <div className="flex items-center gap-3 pb-4 border-b border-zinc-200">
                    <BottleShowcase bottles={1} variant="compact" />
                    <div>
                      <span className="text-[11px] font-semibold text-[#990A11]">
                        FÓRMULA EXTRA FORTE · 1 CÁPSULA/DIA
                      </span>
                      <h3 className="font-display font-bold text-base text-zinc-900">
                        {activeKit.title}
                      </h3>
                      <p className="text-xs text-zinc-500">
                        {pricing.totalCapsules} cápsulas ({pricing.totalBottles}{' '}
                        {pricing.totalBottles === 1 ? 'frasco' : 'frascos'})
                      </p>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between py-3.5 border-b border-zinc-200 text-xs sm:text-sm">
                    <span className="font-medium text-zinc-700">
                      Quantidade de Kits:
                    </span>
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Diminuir quantidade"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-7 h-7 rounded-md bg-white border border-zinc-300 font-bold text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span
                        data-testid="checkout-quantity-value"
                        className="font-mono-tabular font-bold w-6 text-center"
                      >
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Aumentar quantidade"
                        onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                        className="w-7 h-7 rounded-md bg-white border border-zinc-300 font-bold text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Coupon Box */}
                  <div className="py-3.5 border-b border-zinc-200">
                    <label
                      htmlFor="chk-coupon"
                      className="block text-xs font-semibold text-zinc-700 mb-1.5"
                    >
                      Cupom de Desconto (Opcional)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="chk-coupon"
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="FORTE10"
                        className="w-full px-3 py-2 text-xs font-mono-tabular uppercase rounded-lg border border-zinc-300 bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-3.5 py-2 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponFeedback && (
                      <p className="text-[11px] font-medium text-emerald-700 mt-1.5">
                        {couponFeedback}
                      </p>
                    )}
                  </div>

                  {/* Itemized Financial Breakdown */}
                  <div className="py-4 space-y-2 text-xs sm:text-sm border-b border-zinc-200">
                    <div className="flex justify-between text-zinc-500">
                      <span>Preço Avulso Equivalente:</span>
                      <span className="font-mono-tabular line-through">
                        {formatBRL(pricing.originalSubtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-700">
                      <span>Valor do Kit ({pricing.totalCapsules} cápsulas):</span>
                      <span className="font-mono-tabular font-medium">
                        {formatBRL(pricing.baseSubtotal)}
                      </span>
                    </div>
                    {pricing.couponDiscountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>Cupom ({pricing.couponCode}):</span>
                        <span className="font-mono-tabular">
                          - {formatBRL(pricing.couponDiscountAmount)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-zinc-700">
                      <span>Frete Discreto com Seguro:</span>
                      <span className="font-mono-tabular font-semibold text-emerald-700">
                        {pricing.shippingCost === 0
                          ? 'GRÁTIS'
                          : formatBRL(pricing.shippingCost)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-baseline justify-between">
                    <span className="font-display font-bold text-base text-zinc-900">
                      Total a Pagar:
                    </span>
                    <div className="text-right">
                      <span
                        data-testid="checkout-final-total"
                        className="font-mono-tabular text-2xl font-bold text-zinc-900 block"
                      >
                        {formatBRL(pricing.finalTotal)}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        Economia total de {formatBRL(pricing.totalSavings)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Discrete Packaging & 7-Day Guarantee Footer */}
                <div className="mt-6 pt-4 border-t border-zinc-200 space-y-2 text-[11px] text-zinc-600">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#990A11] shrink-0" />
                    <span>
                      <strong>Envio 100% Sigiloso:</strong> Embalagem parda sem menção ao Erectus Plus.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#990A11] shrink-0" />
                    <span>
                      <strong>Garantia Oficial de 7 Dias:</strong> Compra 100% protegida por lei.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
