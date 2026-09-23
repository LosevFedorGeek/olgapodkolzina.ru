import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Artwork } from '../types';
import { ArtCanvas } from './ArtCanvas';
import { ARTWORKS } from '../data/artworks';
import { triggerHaptic } from '../utils/haptics';

interface LightboxProps {
  artwork: Artwork | null;
  onClose: () => void;
  onPurchase: (artwork: Artwork) => void;
  onNavigate: (artwork: Artwork) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ artwork, onClose, onPurchase, onNavigate }) => {
  useEffect(() => {
    if (artwork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [artwork]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!artwork) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [artwork, onClose]);

  if (!artwork) return null;

  const currentIndex = ARTWORKS.findIndex((a) => a.id === artwork.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % ARTWORKS.length;
    onNavigate(ARTWORKS[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + ARTWORKS.length) % ARTWORKS.length;
    onNavigate(ARTWORKS[prevIdx]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl bg-[#1B0E1A] border border-[#D99E41]/30 rounded-sm shadow-2xl z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#BAA999] hover:text-[#EDE4DC] bg-black/40 hover:bg-black/70 rounded-full transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 text-[#EDE4DC] bg-black/40 hover:bg-black/80 rounded-full transition-colors"
          aria-label="Предыдущая картина"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 text-[#EDE4DC] bg-black/40 hover:bg-black/80 rounded-full transition-colors md:right-[41%]"
          aria-label="Следующая картина"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="md:w-3/5 bg-[#120710] p-6 sm:p-10 flex items-center justify-center relative overflow-hidden">
          <div className="w-full max-w-[480px] p-3 sm:p-4 bg-[#F2EDE4] rounded-xs shadow-2xl passepartout-shadow">
            <div className="relative aspect-[4/3] w-full bg-[#1C1019] border border-[#2B1B27]/40 inner-art-shadow overflow-hidden">
              <ArtCanvas
                id={artwork.id}
                title={artwork.title}
                imageSrc={artwork.imageSrc}
                aspect="landscape"
              />
            </div>
          </div>
        </div>

        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#1E0F1D]">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-[#D99E41] font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{artwork.category === 'watercolor' ? 'Живопись и акварель' : 'Художественная графика'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-[#FBF5ED] mb-3 leading-snug">
              {artwork.title}
            </h2>

            <div className="space-y-1.5 text-xs text-[#BAA99A] mb-6 pb-6 border-b border-white/10">
              <div className="flex justify-between">
                <span className="text-[#8C7B6D]">Техника:</span>
                <span className="text-[#EDE4DC] font-medium">{artwork.technique}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7B6D]">Размер:</span>
                <span className="text-[#EDE4DC] font-medium">{artwork.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7B6D]">Год создания:</span>
                <span className="text-[#EDE4DC] font-medium">{artwork.year}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8C7B6D]">Доступность:</span>
                {artwork.inStock ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    В наличии (1 экземпляр)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 text-[#AFA193] border border-white/10 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A796C]" />
                    В частной коллекции
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-[#C8B8A8] font-light leading-relaxed mb-6">
              {artwork.description}
            </p>

            <div className="p-3 bg-[#150A14] border border-white/5 rounded-xs space-y-1 text-xs text-[#9B8B7D] mb-6">
              <div className="flex items-center gap-2 text-[#D99E41]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span className="font-medium">Гарантия подлинности</span>
              </div>
              <p className="text-[11px] leading-normal pl-6">
                Полотно сопровождается сертификатом авторства и готово к оформлению в раму.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-[#8C7B6D]">Стоимость</span>
              <span className="text-2xl font-sans font-bold text-[#E8BD6F] tracking-tight">
                {artwork.priceFormatted}
              </span>
            </div>

            <button
              onClick={() => {
                triggerHaptic(25);
                onClose();
                onPurchase(artwork);
              }}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#160B14] bg-[#D99E41] hover:bg-[#E8BD6F] active:scale-[0.99] transition-all rounded-xs shadow-lg shadow-[#D99E41]/25 cursor-pointer shimmer-btn interactive-action-btn"
            >
              {artwork.inStock ? 'ПРИОБРЕСТИ ПРОИЗВЕДЕНИЕ' : 'ЗАКАЗАТЬ АВТОРСКИЙ ПОВТОР'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
