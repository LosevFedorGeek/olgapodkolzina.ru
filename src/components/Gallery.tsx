import React, { useState, useMemo, useRef } from 'react';
import { Eye, CheckCircle2, ShieldCheck, Sparkles, Truck, Frame } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Artwork } from '../types';
import { ArtCanvas } from './ArtCanvas';
import { formatTypo } from '../utils/typography';
import { triggerHaptic } from '../utils/haptics';

interface GalleryProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  onPurchaseArtwork: (artwork: Artwork) => void;
  onAddToCart: (artwork: Artwork) => void;
}

interface ArtworkCardProps {
  art: Artwork;
  idx: number;
  onSelect: (art: Artwork) => void;
  onAction: (art: Artwork) => void;
}

const generateArtSrcSet = (src?: string): string => {
  if (!src) return '';
  return `${src} 400w, ${src} 600w, ${src} 800w, ${src} 1200w`;
};

const generateAdaptiveSizes = (srcSetString: string): string => {
  if (!srcSetString) {
    return '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1280px) 33vw, 420px';
  }
  const widths = srcSetString
    .split(',')
    .map((s) => s.trim().split(' ')[1])
    .filter(Boolean)
    .map((w) => parseInt(w.replace('w', ''), 10))
    .sort((a, b) => a - b);

  if (widths.length === 0) {
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
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.0, 1.04]);

  const computedSrcSet = useMemo(() => generateArtSrcSet(art.imageSrc), [art.imageSrc]);
  const computedSizes = useMemo(() => generateAdaptiveSizes(computedSrcSet), [computedSrcSet]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
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

      <div className="px-3.5 sm:px-4 lg:px-5 pb-4 sm:pb-5 pt-3.5 border-t border-white/5 flex items-center justify-between mt-auto gap-2 min-h-[48px]">
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
    </motion.div>
  );
};

export const Gallery: React.FC<GalleryProps> = ({
  artworks,
  onSelectArtwork,
  onPurchaseArtwork
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

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

  const handleActionClick = (art: Artwork) => {
    triggerHaptic(25);
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
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="w-6 h-[1.5px] bg-[#D99E41]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#D99E41] font-semibold">
                КОЛЛЕКЦИЯ
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FBF5ED] text-balance section-title-subtle">
              Оригинальные произведения
            </h2>
          </div>

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
                    className={`h-11 px-2.5 sm:px-5 text-[11px] sm:text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer interactive-action-btn flex items-center justify-center gap-1.5 sm:gap-2.5 shrink-0 ${
                      isActive
                        ? 'bg-[#D99E41] text-[#180D16] font-semibold shadow-md'
                        : 'bg-white/5 text-[#BAA99A] hover:bg-white/10 hover:text-[#EDE4DC] border border-white/5'
                    }`}
                  >
                    <span className="hidden sm:inline whitespace-nowrap">{cat.name}</span>
                    <span className="sm:hidden whitespace-nowrap">{cat.shortName}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 font-sans font-bold ${isActive ? 'bg-black/20 text-[#180D16]' : 'bg-white/10 text-[#8C7B6D]'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-10 sm:mb-12 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 p-3.5 sm:p-5 rounded-sm bg-[#22121F]/60 border border-white/5">
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
            <Sparkles className="w-4 h-4 text-[#D99E41] shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-xs">
              <div className="font-semibold text-[#F3E8DB] text-[11px] sm:text-xs">Единственный экземпляр</div>
              <div className="text-[#8E7E72] text-[10px] sm:text-[11px] leading-tight sm:leading-normal">
                {formatTypo('100% ручная авторская работа')}
              </div>
            </div>
          </div>
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
            <ShieldCheck className="w-4 h-4 text-[#D99E41] shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-xs">
              <div className="font-semibold text-[#F3E8DB] text-[11px] sm:text-xs">Сертификат подлинности</div>
              <div className="text-[#8E7E72] text-[10px] sm:text-[11px] leading-tight sm:leading-normal">
                {formatTypo('Именной документ с подписью')}
              </div>
            </div>
          </div>
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
            <Frame className="w-4 h-4 text-[#D99E41] shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-xs">
              <div className="font-semibold text-[#F3E8DB] text-[11px] sm:text-xs">Примерка по фото</div>
              <div className="text-[#8E7E72] text-[10px] sm:text-[11px] leading-tight sm:leading-normal">
                {formatTypo('Бесплатно под ваш интерьер')}
              </div>
            </div>
          </div>
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
            <Truck className="w-4 h-4 text-[#D99E41] shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-xs">
              <div className="font-semibold text-[#F3E8DB] text-[11px] sm:text-xs">Бережная доставка</div>
              <div className="text-[#8E7E72] text-[10px] sm:text-[11px] leading-tight sm:leading-normal">
                {formatTypo('Жесткий арт-кокон и страховка')}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArtworks.map((art, idx) => (
            <ArtworkCard
              key={art.id}
              art={art}
              idx={idx}
              onSelect={onSelectArtwork}
              onAction={handleActionClick}
            />
          ))}
        </div>

        <div className="mt-12 sm:mt-14 p-6 sm:p-8 rounded-sm bg-gradient-to-r from-[#2A1525]/80 via-[#231220]/90 to-[#190D18]/80 border border-[#D99E41]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-serif text-[#F8EFE4] text-balance">
              {formatTypo('Понравилась картина или нужен индивидуальный сюжет?')}
            </h3>
            <p className="text-xs sm:text-sm text-[#BAA99A] font-light max-w-2xl leading-relaxed text-pretty">
              {formatTypo('Ольга создает авторские повторы произведений из частных коллекций, а также пишет эксклюзивные натюрморты, пейзажи и портреты под колористику вашего интерьера.')}
            </p>
          </div>
          <button
            onClick={() => onPurchaseArtwork(artworks[0])}
            className="h-11 px-6 text-xs font-semibold uppercase tracking-wider text-[#160B14] bg-[#D99E41] hover:bg-[#E8BD6F] rounded-sm transition-colors cursor-pointer shrink-0 shimmer-btn interactive-action-btn shadow-lg w-full sm:w-auto whitespace-nowrap"
          >
            ОБСУДИТЬ ЗАКАЗ КАРТИНЫ
          </button>
        </div>
      </div>
    </section>
  );
};
