import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Artwork } from '../types';

interface HeroProps {
  artworks: Artwork[];
  onExploreGallery: () => void;
  onExploreEducation: () => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onPurchaseArtwork: (artwork: Artwork) => void;
}

export const Hero: React.FC<HeroProps> = ({
  artworks,
  onExploreGallery,
  onExploreEducation,
  onSelectArtwork,
  onPurchaseArtwork
}) => {
  const [portraitImgError, setPortraitImgError] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [heroImgErrors, setHeroImgErrors] = useState<{ [key: string]: boolean }>({});
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 90,
    mass: 0.8
  });

  const yBgLight1 = useTransform(smoothProgress, [0, 1], [0, 180]);
  const yBgLight2 = useTransform(smoothProgress, [0, 1], [0, -140]);
  const yBgLight3 = useTransform(smoothProgress, [0, 1], [0, 90]);
  const yTextContent = useTransform(smoothProgress, [0, 1], [0, 35]);
  const yArtCard = useTransform(smoothProgress, [0, 1], [0, -40]);
  const scaleArtCard = useTransform(smoothProgress, [0, 1], [1, 0.98]);

  const featuredList = [
    {
      id: 'portrait',
      title: 'Ольга Подколзина',
      subtitle: 'Академический художник',
      technique: 'Выпускница худграфа ЧГУ, мастер станковой живописи',
      imageSrc: '/assets/olga.jpg',
      badge: 'АВТОР'
    },
    ...artworks.map((art) => ({
      id: art.id,
      title: art.title,
      subtitle: art.priceFormatted,
      technique: `${art.technique}, ${art.size}`,
      imageSrc: art.imageSrc,
      badge: art.inStock ? 'В НАЛИЧИИ' : 'В КОЛЛЕКЦИИ',
      rawArt: art
    }))
  ];

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % featuredList.length);
  }, [featuredList.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + featuredList.length) % featuredList.length);
  }, [featuredList.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const currentItem = featuredList[activeSlide];

  const handleCardClick = () => {
    if ('rawArt' in currentItem && currentItem.rawArt) {
      onSelectArtwork(currentItem.rawArt);
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-16 lg:py-32"
    >
      <motion.div
        style={{ y: yBgLight1 }}
        className="absolute top-1/4 -left-48 w-96 h-96 bg-[#781D42]/25 rounded-full blur-3xl pointer-events-none will-change-transform"
      />
      <motion.div
        style={{ y: yBgLight2 }}
        className="absolute bottom-10 right-0 w-[30rem] h-[30rem] bg-[#D99E41]/15 rounded-full blur-3xl pointer-events-none will-change-transform"
      />
      <motion.div
        style={{ y: yBgLight3 }}
        className="absolute top-12 right-1/4 w-80 h-80 bg-[#341B30]/40 rounded-full blur-2xl pointer-events-none will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            style={{ y: yTextContent }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-left will-change-transform"
          >
            <div>
              <span className="text-xs sm:text-[13px] uppercase tracking-[0.22em] text-[#D99E41] font-semibold block">
                АВТОРСКАЯ ЖИВОПИСЬ<br className="hidden sm:inline" /> И&nbsp;ГРАФИКА ОЛЬГИ ПОДКОЛЗИНОЙ
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif text-[#FBF5ED] leading-[1.12] tracking-tight section-title-subtle">
                «Свет, созданный делиться радостью.<br />
                Я пишу счастье – чтобы оно стало вашим»
              </h1>
              <p className="text-base sm:text-lg text-[#C7B7A7] max-w-xl font-light leading-relaxed">
                Живопись и графика с академической душой для вашего интерьера. Картины, создающие атмосферу тепла, уюта и вечной классической гармонии.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreGallery}
                className="h-12 px-7 bg-[#D99E41] hover:bg-[#E8BD6F] active:scale-[0.98] text-[#160B14] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shimmer-btn interactive-action-btn shadow-lg shadow-[#D99E41]/20"
              >
                <span>ВЫБРАТЬ КАРТИНУ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreEducation}
                className="h-12 px-7 bg-transparent hover:bg-white/5 active:scale-[0.98] text-[#EDE4DC] font-medium text-xs sm:text-sm tracking-wider uppercase rounded-sm border border-white/20 hover:border-[#D99E41]/60 transition-all duration-300 flex items-center justify-center cursor-pointer interactive-action-btn"
              >
                ОБУЧЕНИЕ / МАСТЕР-КЛАССЫ
              </button>
            </div>
          </motion.div>

          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ y: yArtCard, scale: scaleArtCard }}
              className="relative max-w-md mx-auto lg:max-w-none will-change-transform"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#781D42]/30 to-[#D99E41]/20 rounded-sm blur-xl opacity-70" />

              <div
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
                className="relative rounded-sm overflow-hidden border border-white/15 bg-[#251522] shadow-2xl group transition-all duration-300"
              >
                <div
                  onClick={handleCardClick}
                  className="relative aspect-[3/4] w-full bg-[#1C1019] overflow-hidden cursor-pointer"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentItem.id}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full relative"
                    >
                      {currentItem.id === 'portrait' ? (
                        !portraitImgError ? (
                          <img
                            src="/assets/olga.jpg"
                            srcSet="/assets/olga.jpg 600w, /assets/olga.jpg 1200w"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
                            alt="Ольга Подколзина — академический художник"
                            referrerPolicy="no-referrer"
                            onError={() => setPortraitImgError(true)}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-tr from-[#1b0d18] via-[#31162d] to-[#451e3e] flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-20 h-20 rounded-full border-2 border-[#D99E41] flex items-center justify-center mb-4 bg-[#D99E41]/10 text-[#E8BD6F]">
                              <Sparkles className="w-10 h-10" />
                            </div>
                            <div className="font-serif text-2xl text-[#FBF5ED] mb-1">Ольга Подколзина</div>
                            <div className="text-xs uppercase tracking-widest text-[#D99E41]">Академический художник</div>
                            <div className="text-xs text-[#BAA99A] mt-3 max-w-xs">
                              Выпускник худграфа ЧГУ (2000), 25 лет преподавания живописи в Санкт-Петербурге
                            </div>
                          </div>
                        )
                      ) : (
                        !heroImgErrors[currentItem.id] && currentItem.imageSrc ? (
                          <img
                            src={currentItem.imageSrc}
                            srcSet={`${currentItem.imageSrc} 600w, ${currentItem.imageSrc} 1200w`}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
                            alt={currentItem.title}
                            referrerPolicy="no-referrer"
                            onError={() => setHeroImgErrors((prev) => ({ ...prev, [currentItem.id]: true }))}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-tr from-[#1f0f1c] via-[#2f162a] to-[#471f3e] flex flex-col items-center justify-center p-6 text-center">
                            <div className="font-serif text-xl sm:text-2xl text-[#FBF5ED] mb-2">{currentItem.title}</div>
                            <div className="text-xs text-[#D99E41] mb-1">{currentItem.subtitle}</div>
                            <div className="text-xs text-[#BBA99A]">{currentItem.technique}</div>
                          </div>
                        )
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-xs bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-semibold tracking-wider text-[#E8BD6F] uppercase z-10">
                    {currentItem.badge}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 pt-16 pb-5 px-5 sm:px-6 bg-gradient-to-t from-black/95 via-black/85 via-50% to-transparent flex items-end justify-between gap-4 z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentItem.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="text-left space-y-1"
                      >
                        <div className="text-xl sm:text-2xl font-serif text-[#FFF8F0] leading-snug drop-shadow-md">
                          {currentItem.title}
                        </div>
                        <div className="text-xs sm:text-sm text-[#E8BD6F] font-semibold tracking-wide drop-shadow-sm">
                          {currentItem.subtitle}
                        </div>
                        <div className="text-xs sm:text-sm text-[#EDE4DC] font-normal leading-snug drop-shadow-sm">
                          {currentItem.technique}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {'rawArt' in currentItem && currentItem.rawArt && currentItem.rawArt.inStock && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentItem.rawArt) onPurchaseArtwork(currentItem.rawArt);
                        }}
                        className="h-9 px-4 text-xs font-semibold uppercase tracking-wider text-[#160B14] bg-[#D99E41] hover:bg-[#E8BD6F] rounded-xs transition-colors shrink-0 shimmer-btn interactive-action-btn shadow-lg"
                      >
                        КУПИТЬ
                      </button>
                    )}
                  </div>
                </div>

                <div className="px-4 py-2.5 bg-[#190D17] border-t border-white/10 flex items-center justify-between text-xs text-[#A89788]">
                  <div className="flex items-center gap-1.5 flex-wrap max-w-[240px]">
                    {featuredList.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Перейти к слайду ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          idx === activeSlide ? 'w-5 bg-[#D99E41]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#8E7E72] font-mono">
                      {activeSlide + 1}/{featuredList.length}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={prevSlide}
                        aria-label="Предыдущий слайд"
                        className="p-1 rounded-xs hover:bg-white/10 text-[#C7B7A7] hover:text-[#FBF5ED] transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextSlide}
                        aria-label="Следующий слайд"
                        className="p-1 rounded-xs hover:bg-white/10 text-[#C7B7A7] hover:text-[#FBF5ED] transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
