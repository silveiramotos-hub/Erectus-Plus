import React, { useState } from 'react';
import { PRODUCT_MOCKUP_PATH } from '../data/catalog';

interface BottleShowcaseProps {
  bottles: 1 | 2 | 3;
  variant?: 'hero' | 'card' | 'compact';
}

export const BottleShowcase: React.FC<BottleShowcaseProps> = ({
  bottles,
  variant = 'card',
}) => {
  const [imgError, setImgError] = useState(false);

  const renderFallbackBottle = (className: string) => (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-white via-zinc-100 to-zinc-200 border border-zinc-300 shadow-xl p-3 ${className}`}
    >
      <div className="w-3/4 h-5 bg-white border border-zinc-300 rounded-t-md mb-1" />
      <div className="w-full flex-1 rounded-lg bg-gradient-to-b from-[#9E0B12] to-[#5E0408] flex flex-col items-center justify-center px-2 py-3 text-center text-white">
        <span className="text-[10px] font-bold tracking-widest text-[#C4F000]">
          FÓRMULA EXTRA FORTE
        </span>
        <span className="font-display font-bold text-sm leading-tight mt-1">
          ERECTUS PLUS
        </span>
        <span className="text-[9px] text-zinc-200 mt-0.5">
          TADALAFILA + AMINOÁCIDOS
        </span>
      </div>
    </div>
  );

  const renderSingleBottle = (className: string, key?: string | number) => {
    if (imgError) {
      return <React.Fragment key={key}>{renderFallbackBottle(className)}</React.Fragment>;
    }
    return (
      <img
        key={key}
        src={PRODUCT_MOCKUP_PATH}
        alt="Frasco Oficial Erectus Plus — Tadalafila + Aminoácidos Fórmula Extra Forte (30 Cápsulas)"
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`object-contain select-none pointer-events-none drop-shadow-[0_20px_28px_rgba(0,0,0,0.38)] ${className}`}
      />
    );
  };

  if (variant === 'compact') {
    return (
      <div className="relative flex items-center justify-center w-16 h-20">
        {renderSingleBottle('h-18 w-auto')}
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="relative flex items-center justify-center w-full h-full min-h-[340px] sm:min-h-[420px] py-6">
        <div
          aria-hidden="true"
          className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-radial from-[#B91C1C]/35 via-[#991B1B]/10 to-transparent blur-2xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-5 w-56 sm:w-72 h-7 rounded-full bg-black/60 blur-xl"
        />

        {/* 3-bottle hero composition (90 Cápsulas = 3 Frascos) */}
        <div className="relative flex items-end justify-center">
          <div className="-mr-10 sm:-mr-12 mb-3 opacity-90 scale-90 -rotate-6 transition-transform duration-200">
            {renderSingleBottle('h-52 sm:h-64 w-auto', 'hero-left')}
          </div>
          <div className="relative z-10 scale-105">
            {renderSingleBottle('h-64 sm:h-80 w-auto', 'hero-center')}
          </div>
          <div className="-ml-10 sm:-ml-12 mb-3 opacity-90 scale-90 rotate-6 transition-transform duration-200">
            {renderSingleBottle('h-52 sm:h-64 w-auto', 'hero-right')}
          </div>
        </div>
      </div>
    );
  }

  // Card variants for 1 bottle (30 caps), 2 bottles (60 caps), or 3 bottles (90 caps)
  return (
    <div className="relative flex items-center justify-center w-full h-56 sm:h-60 py-4 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute bottom-3 w-44 h-5 rounded-full bg-zinc-900/15 blur-md"
      />

      {bottles === 1 && (
        <div className="relative z-10 flex items-center justify-center">
          {renderSingleBottle('h-48 sm:h-52 w-auto', 'b1')}
        </div>
      )}

      {bottles === 2 && (
        <div className="relative flex items-end justify-center">
          <div className="-mr-4 mb-1.5 scale-95 -rotate-3 opacity-95">
            {renderSingleBottle('h-44 sm:h-48 w-auto', 'b2-1')}
          </div>
          <div className="relative z-10 -ml-4 rotate-2">
            {renderSingleBottle('h-48 sm:h-52 w-auto', 'b2-2')}
          </div>
        </div>
      )}

      {bottles === 3 && (
        <div className="relative flex items-end justify-center">
          <div className="-mr-8 mb-2 scale-90 -rotate-3 opacity-95">
            {renderSingleBottle('h-40 sm:h-44 w-auto', 'b3-1')}
          </div>
          <div className="relative z-10">
            {renderSingleBottle('h-48 sm:h-52 w-auto', 'b3-2')}
          </div>
          <div className="-ml-8 mb-2 scale-90 rotate-3 opacity-95">
            {renderSingleBottle('h-40 sm:h-44 w-auto', 'b3-3')}
          </div>
        </div>
      )}
    </div>
  );
};
