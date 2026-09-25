import React, { useState, useMemo, useRef } from 'react';
import { Eye, CheckCircle2, ShieldCheck, Sparkles, Truck, Frame, Package, Info } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Artwork } from '../types';
import { ArtCanvas } from './ArtCanvas';
import { SectionHeader } from './SectionHeader';
import { DeliveryModal } from './DeliveryModal';
import { formatTypo } from '../utils/typography';
import { triggerHaptic } from '../utils/haptics';

interface GalleryProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  onPurchaseArtwork: (artwork: Artwork) => void;
  onAddToCart: (artwork: Artwork) => void;
  onCommissionRequest?: () => void;
}

interface ArtworkCardProps {
  art: Artwork;
  idx: number;
  onSelect: (art: Artwork) => void;
  onAction: (art: Artwork) => void;
}

const generateArtSrcSet = (src?: string): string => {
  if (!src) return '';
  return `${src} 400w, ${src} 800w, ${src} 1200w`;
};

const generateAdaptiveSizes = (srcSetString: string): string => {
  if (!srcSetString) {
    return '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1280px) 33vw, 420px';
  }
  return '(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(50vw - 28px), (max-width: 1280px) calc(33vw - 24px), 380px';
};

const ArtworkCard: React.FC<ArtworkCardProps> = ({ art, idx, onSelect, onAction }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.0, 1.03]);

  const computedSrcSet = useMemo(() => generateArtSrcSet(art.imageSrc), [art.imageSrc]);
  const computedSizes = useMemo(() => generateAdaptiveSizes(computedSrcSet), [computedSrcSet]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="wine-card rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/80 group"
    >
      <div className="p-4 sm:p-6 pb-2">
        <div
          onClick={() => onSelect(art)}
          className="p-3 sm:p-4 bg-[#ECE6DE] rounded-xs passepartout-shadow cursor-pointer relative overflow-hidden group"
        >
          <div className="relative aspect-[4/3] w-full bg-[#1C1019] border border-[#2B1B27]/40 inner-art-shadow overflow-hidden">
            <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
              {art.inStock ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#150914]/90 text-emerald-300 border border-emerald-500/40 text-[11px] font-sans font-semibold tracking-wide shadow-md backdrop-blur-md whitespace-nowrap">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  В наличии
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/85 text-[#BFAFA2] border border-white/15 text-[11px] font-sans font-medium tracking-wide shadow-md backdrop-blur-md whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A796C]" />
                  В коллекции
                </span>
              )}
            </div>

            <motion.div
              style={{ y: imgY, scale: imgScale }}
              className="w-full h-full will-change-transform"
            >
              <ArtCanvas
                id={art.id}
                title={art.title}
                imageSrc={art.imageSrc}
                aspect="landscape"
                srcSet={computedSrcSet}
                sizes={computedSizes}
              />
            </motion.div>

            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-xs text-[#FFF5EA] text-xs font-medium flex items-center gap-1.5 border border-white/20 shadow-lg whitespace-nowrap">
                <Eye className="w-3.5 h-3.5 text-[#E8BD6F]" />
                Рассмотреть детальнее
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-5">
          <h3
            onClick={() => onSelect(art)}
            className="text-lg sm:text-2xl font-serif text-[#F7EFE6] group-hover:text-[#E8BD6F] transition-colors cursor-pointer text-balance"
          >
            {formatTypo(art.title)}
          </h3>
          <p className="text-xs text-[#A89788] mt-1 font-light whitespace-nowrap">
            {formatTypo(`${art.technique}, ${art.size}`)}
          </p>
        </div>
      </div>

      <div className="px-3.5 sm:px-4 lg:px-5 pb-4 sm:pb-5 pt-3.5 border-t border-white/5 flex flex-col gap-3 mt-auto">
        <div className="flex items-center justify-between gap-2">
          {art.inStock ? (
            <div className="min-w-0">
              <span className="font-sans font-bold text-base sm:text-lg lg:text-xl text-[#E8BD6F] tracking-tight whitespace-nowrap">
                {formatTypo(art.priceFormatted)}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#A8988B] italic min-w-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B89B7D] shrink-0" />
              <span className="truncate">В коллекции</span>
            </div>
          )}

          <button
            onClick={() => {
              triggerHaptic(25);
              onAction(art);
            }}
            className={`px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer interactive-action-btn whitespace-nowrap shrink-0 ${
              art.inStock
                ? 'border border-[#D99E41]/70 bg-[#D99E41]/10 text-[#F5EADB] hover:bg-[#D99E41] hover:text-[#180D16] active:scale-[0.98] shimmer-btn'
                : 'border border-white/15 text-[#BAA898] hover:border-[#D99E41]/40 hover:text-[#EDE4DC] hover:bg-white/5'
            }`}
          >
            {art.inStock ? 'Приобрести' : 'Узнать детали'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const Gallery: React.FC<GalleryProps> = ({
  artworks,
  onSelectArtwork,
  onPurchaseArtwork,
  onCommissionRequest
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'Все произведения', shortName: 'Все' },
    { id: 'watercolor', name: 'Акварель и масло', shortName: 'Живопись' },
    { id: 'graphics', name: 'Графика', shortName: 'Графика' }
  ];

  const filteredArtworks = useMemo(() => {
    return artworks.filter((art) => {
      const matchCat =
        activeCategory === 'all' ||
        (activeCategory === 'watercolor' && (art.category === 'watercolor' || art.technique.toLowerCase().includes('масло') || art.technique.toLowerCase().includes('акварель'))) ||
        (activeCategory === 'graphics' && (art.category === 'graphics' || art.technique.toLowerCase().includes('соус') || art.technique.toLowerCase().includes('пастель') || art.technique.toLowerCase().includes('уголь')));
      return matchCat;
    });
  }, [artworks, activeCategory]);

  const handleCardAction = (art: Artwork) => {
    if (art.inStock) {
      onPurchaseArtwork(art);
    } else {
      onSelectArtwork(art);
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 relative bg-[#180E17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-8 gap-5">
          <SectionHeader
            badge="КОЛЛЕКЦИЯ"
            title="Оригинальные произведения"
          />

          <div className="w-full xl:w-auto">
            <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-2.5">
              {categories.map((cat) => {
                const count =
                  cat.id === 'all'
                    ? artworks.length
                    : cat.id === 'watercolor'
                    ? artworks.filter((a) => a.category === 'watercolor' || a.technique.toLowerCase().includes('масло') || a.technique.toLowerCase().includes('акварель')).length
                    : artworks.filter((a) => a.category === 'graphics' || a.technique.toLowerCase().includes('соус') || a.technique.toLowerCase().includes('пастель') || a.technique.toLowerCase().includes('уголь')).length;

                const isActive = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      triggerHaptic(15);
                      setActiveCategory(cat.id);
                    }}
                    className={`h-11 px-3 sm:px-5 text-[11px] sm:text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer interactive-action-btn flex items-center justify-center gap-1.5 sm:gap-2.5 shrink-0 ${
                      isActive
                        ? 'bg-[#D99E41] text-[#180D16] font-semibold shadow-md'
                        : 'bg-white/5 text-[#BAA99A] hover:bg-white/10 hover:text-[#EDE4DC] border border-white/5'
                    }`}
                  >
                    <span className="hidden sm:inline whitespace-nowrap">{cat.name}</span>
                    <span className="sm:hidden whitespace-nowrap">{cat.shortName}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive ? 'bg-[#180D16]/20 text-[#180D16]' : 'bg-white/10 text-[#C9B9AA]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredArtworks.map((art, idx) => (
            <ArtworkCard
              key={art.id}
              art={art}
              idx={idx}
              onSelect={onSelectArtwork}
              onAction={handleCardAction}
            />
          ))}
        </div>

        <div className="mt-16 sm:mt-20 p-6 sm:p-10 rounded-sm bg-[#1E0F1C] border border-[#D99E41]/30 relative overflow-hidden text-center sm:text-left">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#D99E41] font-semibold block">
                ИНДИВИДУАЛЬНЫЙ ЗАКАЗ
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#FBF5ED]">
                Не нашли подходящий сюжет или размер?
              </h3>
              <p className="text-sm text-[#C9B9AA] font-light leading-relaxed">
                Ольга Подколзина принимает индивидуальные заказы на написание авторских полотен: пейзажи памятных вам мест, натюрморты или интерьерные картины по вашему колористическому брифу.
              </p>
            </div>
            <button
              onClick={() => {
                triggerHaptic(20);
                if (onCommissionRequest) {
                  onCommissionRequest();
                } else {
                  onPurchaseArtwork(artworks[0]);
                }
              }}
              className="h-12 px-6 sm:px-8 bg-[#D99E41] hover:bg-[#E8BD6F] text-[#180D16] font-semibold text-xs uppercase tracking-wider rounded-sm transition-all duration-300 shrink-0 cursor-pointer interactive-action-btn whitespace-nowrap shadow-lg shadow-[#D99E41]/20 active:scale-[0.98]"
            >
              Обсудить заказ полотна
            </button>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#2B1728] text-[#E8BD6F] flex items-center justify-center shrink-0 border border-[#D99E41]/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#F7EFE6] mb-1">Сертификат подлинности</h4>
                <p className="text-xs text-[#A8988B] leading-relaxed">
                  К каждому оригинальному произведению прилагается авторский именной сертификат с личной подписью художника.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#2B1728] text-[#E8BD6F] flex items-center justify-center shrink-0 border border-[#D99E41]/20">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#F7EFE6] mb-1">Бережная доставка по РФ</h4>
                <p className="text-xs text-[#A8988B] leading-relaxed">
                  Многослойная защита (крафт, воздушно-пузырьковая пленка, жесткий картон). СДЭК и Почта России со 100% страховкой.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#2B1728] text-[#E8BD6F] flex items-center justify-center shrink-0 border border-[#D99E41]/20">
                <Frame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#F7EFE6] mb-1">Багетное оформление</h4>
                <p className="text-xs text-[#A8988B] leading-relaxed">
                  Работы подготовлены к оформлению. Ольга лично проконсультирует вас по идеальному цвету багета и типу стекла.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-[#2B1728] text-[#E8BD6F] flex items-center justify-center shrink-0 border border-[#D99E41]/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#F7EFE6] mb-1">Примерка в интерьере</h4>
                <p className="text-xs text-[#A8988B] leading-relaxed">
                  Бесплатно визуализируем выбранную картину на фотографии вашей стены перед принятием решения о покупке.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeliveryModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
      />
    </section>
  );
};
