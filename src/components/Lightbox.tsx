import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Sparkles, Package, Truck, Info, Maximize2, ZoomIn } from 'lucide-react';
import { Artwork } from '../types';
import { ArtCanvas } from './ArtCanvas';
import { ARTWORKS } from '../data/artworks';
import { DeliveryModal } from './DeliveryModal';
import { triggerHaptic } from '../utils/haptics';

interface LightboxProps {
  artwork: Artwork | null;
  onClose: () => void;
  onPurchase: (artwork: Artwork) => void;
  onNavigate: (artwork: Artwork) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ artwork, onClose, onPurchase, onNavigate }) => {
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    if (artwork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!artwork) return;
      if (e.key === 'Escape') {
        if (isZoomOpen) {
          setIsZoomOpen(false);
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [artwork, isZoomOpen]);

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
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-5xl bg-[#1B0E1A] border border-[#D99E41]/30 rounded-sm shadow-2xl z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-[#BAA999] hover:text-[#EDE4DC] bg-black/40 hover:bg-black/70 rounded-full transition-colors cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 text-[#EDE4DC] bg-black/40 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
            aria-label="Предыдущая картина"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 text-[#EDE4DC] bg-black/40 hover:bg-black/80 rounded-full transition-colors md:right-[41%] cursor-pointer"
            aria-label="Следующая картина"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="md:w-3/5 bg-[#120710] p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden">
            <div
              onClick={() => setIsZoomOpen(true)}
              className="relative w-full max-w-[500px] rounded-xs overflow-hidden border border-[#D99E41]/35 shadow-2xl group cursor-zoom-in transition-all duration-300 hover:border-[#D99E41] hover:shadow-[0_0_30px_rgba(217,158,65,0.25)]"
            >
              <div className="relative aspect-[4/3] w-full bg-[#180A15] overflow-hidden">
                <ArtCanvas
                  id={artwork.id}
                  title={artwork.title}
                  imageSrc={artwork.imageSrc}
                  aspect="landscape"
                />
              </div>

              <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-xs text-[#FFF5EA] text-xs font-medium flex items-center gap-1.5 border border-white/20 shadow-lg pointer-events-none group-hover:bg-[#D99E41] group-hover:text-[#160B14] transition-colors">
                <Maximize2 className="w-3.5 h-3.5 text-[#E8BD6F] group-hover:text-[#160B14]" />
                <span className="font-sans font-medium">Увеличить картину</span>
              </div>
            </div>
            <p className="text-[11px] text-[#A8988B] mt-3 flex items-center gap-1.5">
              <ZoomIn className="w-3.5 h-3.5 text-[#D99E41]" />
              <span>Нажмите на изображение для детального полноэкранного просмотра</span>
            </p>
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

              <div className="space-y-1.5 text-xs text-[#BAA99A] mb-5 pb-5 border-b border-white/10">
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
                      В наличии (оригинал)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 text-[#AFA193] border border-white/10 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A796C]" />
                      В частной коллекции
                    </span>
                  )}
                </div>
              </div>

              {artwork.description && (
                <p className="text-xs sm:text-sm text-[#C4B4A5] leading-relaxed mb-6 font-light">
                  {artwork.description}
                </p>
              )}

              <div className="p-3.5 rounded-sm bg-[#261323] border border-white/5 space-y-2 text-xs text-[#A8988B] mb-6">
                <div className="flex items-center gap-2 text-[#E8BD6F] font-semibold">
                  <Package className="w-3.5 h-3.5" />
                  <span>Условия покупки и доставки</span>
                </div>
                <div className="space-y-1 text-[11px] text-[#BAA99A]">
                  <p>📦 Надежная арт-защита от художника – бесплатно</p>
                  <p>🛡️ 100% объявленная ценность при отправке</p>
                  <p>🚚 Доставка СДЭК и Почтой России по всей РФ</p>
                </div>
                <button
                  onClick={() => setIsDeliveryOpen(true)}
                  className="text-[11px] text-[#D99E41] hover:text-[#E8BD6F] underline transition-colors cursor-pointer flex items-center gap-1 pt-1"
                >
                  <Info className="w-3 h-3" />
                  <span>Подробнее об оплате и доставке</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#8A7B6E] uppercase tracking-wider">Стоимость:</span>
                <span className="text-2xl sm:text-3xl font-sans font-bold text-[#E8BD6F] tracking-tight">
                  {artwork.priceFormatted}
                </span>
              </div>

              <div className="flex gap-2">
                {artwork.inStock && (
                  <button
                    onClick={() => {
                      triggerHaptic(30);
                      onPurchase(artwork);
                    }}
                    className="flex-1 py-3 px-4 bg-[#D99E41] hover:bg-[#E8BD6F] text-[#160B14] font-semibold text-xs tracking-wider uppercase rounded-sm transition-all duration-300 text-center cursor-pointer shadow-lg shadow-[#D99E41]/20 active:scale-[0.98]"
                  >
                    Приобрести оригинал
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl flex items-center justify-between py-2 border-b border-white/10 text-xs text-[#DDD0C4] shrink-0"
          >
            <div className="flex items-center gap-3">
              <span className="font-serif text-base sm:text-xl text-[#F8F1E9]">{artwork.title}</span>
              <span className="text-xs text-[#BAA99A] hidden sm:inline">({artwork.technique}, {artwork.size})</span>
            </div>
            <button
              onClick={() => setIsZoomOpen(false)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF5EA] transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
              aria-label="Закрыть увеличение"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Закрыть просмотр</span>
            </button>
          </div>

          <div
            onClick={() => setIsZoomOpen(false)}
            className="flex-1 w-full flex items-center justify-center p-2 sm:p-4 overflow-hidden"
          >
            <img
              src={artwork.imageSrc}
              alt={artwork.title}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[82vh] object-contain rounded-xs shadow-2xl border border-white/10 select-none"
            />
          </div>

          <div className="text-[11px] text-[#A8988B] py-1 text-center shrink-0">
            Художник Ольга Подколзина • Оригинал произведения в единственном экземпляре
          </div>
        </div>
      )}

      <DeliveryModal
        isOpen={isDeliveryOpen}
        onClose={() => setIsDeliveryOpen(false)}
      />
    </>
  );
};
