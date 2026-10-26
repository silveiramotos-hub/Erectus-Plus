/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { INITIAL_TESTIMONIALS } from './data/catalog';
import { BRAIP_CHECKOUT_URLS, type TestimonialItem } from './utils/commerce';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BenefitsAndFormula } from './components/BenefitsAndFormula';
import { VitalityBannerSection } from './components/VitalityBannerSection';
import { KitsSection } from './components/KitsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqAndGuarantee } from './components/FaqAndGuarantee';

export default function App() {
  const [sharedCep, setSharedCep] = useState('');
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem('erectus_plus_reviews_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_TESTIMONIALS;
  });

  const handleAddTestimonial = (newItem: TestimonialItem) => {
    setTestimonials((prev) => {
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem('erectus_plus_reviews_v2', JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-zinc-900">
      {/* Strict 3-Zone Top Bar */}
      <Header />

      {/* Main Content Flow */}
      <main className="flex-1">
        <HeroSection />

        <BenefitsAndFormula />

        {/* Superação & Vitalidade Banner Section */}
        <VitalityBannerSection />

        <KitsSection
          sharedCep={sharedCep}
          onChangeSharedCep={setSharedCep}
        />

        <TestimonialsSection
          testimonials={testimonials}
          onAddTestimonial={handleAddTestimonial}
        />

        <FaqAndGuarantee />
      </main>

      {/* Compact Mobile Sticky Bottom Bar (<= 52px height, respecting 15% mobile sticky cap) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 h-13 bg-[#140608]/95 backdrop-blur-md border-t border-white/15 px-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] text-zinc-300 truncate">
            60 Cápsulas (2 Frascos) · <span className="text-[#B8E900] font-semibold">Frete Grátis</span>
          </p>
          <p className="text-xs font-mono-tabular font-bold text-white">
            R$ 249,90 ou 12x R$ 20,83
          </p>
        </div>
        <a
          href={BRAIP_CHECKOUT_URLS['caps-60']}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-xs font-bold text-zinc-950 bg-[#B8E900] rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
        >
          Comprar Agora
        </a>
      </div>
    </div>
  );
}
