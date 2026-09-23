import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const About: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
  });

  const yGlowRight = useTransform(smoothProgress, [0, 1], [-40, 40]);
  const yGlowLeft = useTransform(smoothProgress, [0, 1], [30, -30]);
  const yImage = useTransform(smoothProgress, [0, 1], [25, -25]);

  const stats = [
    {
      value: '30+ лет',
      label: 'в\u00A0искусстве'
    },
    {
      value: '25 лет',
      label: 'педагогического стажа'
    },
    {
      value: '100+',
      label: 'картин и\u00A0учеников'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 lg:py-28 relative bg-[#180D16] border-t border-white/5 overflow-hidden"
    >
      <motion.div
        style={{ y: yGlowRight }}
        className="absolute top-1/3 -right-32 w-96 h-96 bg-[#781D42]/20 rounded-full blur-3xl pointer-events-none will-change-transform"
      />
      <motion.div
        style={{ y: yGlowLeft }}
        className="absolute -bottom-20 left-10 w-80 h-80 bg-[#D99E41]/10 rounded-full blur-3xl pointer-events-none will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <span className="w-6 h-[1.5px] bg-[#D99E41]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#D99E41] font-semibold">
            ОБ АВТОРЕ
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FBF5ED] leading-tight section-title-subtle">
              «Я пишу счастье&nbsp;— чтобы оно стало вашим»
            </h2>

            <p className="text-base sm:text-lg text-[#C9B9AA] font-light leading-relaxed">
              Ольга Подколзина&nbsp;— художник с&nbsp;академическим образованием (выпускница художественно-графического факультета ЧГУ 2000 года). Ее&nbsp;творческий путь начался в&nbsp;ранней юности, и&nbsp;сегодня работы мастера находятся в&nbsp;частных коллекциях ценителей классического реализма по&nbsp;всей России и&nbsp;за&nbsp;рубежом.
            </p>

            <p className="text-base sm:text-lg text-[#C9B9AA] font-light leading-relaxed">
              Более 25&nbsp;лет Ольга посвятила преподаванию живописи, передавая секреты классической акварели и&nbsp;графики новому поколению художников. Каждая ее&nbsp;работа&nbsp;— это попытка уловить мимолетное мгновение счастья, наполнить интерьер светом и&nbsp;покоем.
            </p>
          </motion.div>

          <div className="lg:col-span-5">
            <motion.div
              style={{ y: yImage }}
              className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl group bg-[#251522] will-change-transform"
            >
              {!imgError ? (
                <img
                  src="/assets/Rectangle.jpg"
                  alt="Творческая палитра и мастерская Ольги Подколзиной"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={320}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-72 sm:h-80 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-72 sm:h-80 bg-gradient-to-tr from-[#1b0d18] via-[#2d1729] to-[#3f1e39] flex items-center justify-center p-6 text-center">
                  <div className="space-y-2">
                    <div className="font-serif text-2xl text-[#E8BD6F]">Академическая мастерская</div>
                    <div className="text-xs text-[#BAA99A]">Студия авторской живописи</div>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-8 rounded-sm bg-[#22121F]/80 border border-white/5 hover:border-[#D99E41]/50 transition-all duration-300 relative group"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E8BD6F] font-normal mb-2 tracking-tight whitespace-nowrap">
                {stat.value}
              </div>
              <div className="w-8 h-[2px] bg-[#D99E41] mb-3 transition-all duration-300 group-hover:w-16" />
              <div className="text-sm text-[#BBA99A] font-light whitespace-nowrap">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
