import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { AnimatedCounter } from './AnimatedCounter';

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
      num: 30,
      suffix: '+ лет',
      label: 'в\u00A0искусстве'
    },
    {
      num: 25,
      suffix: ' лет',
      label: 'педагогического стажа'
    },
    {
      num: 100,
      suffix: '+',
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <SectionHeader
              badge="ОБ АВТОРЕ"
              title="«Я пишу счастье – чтобы оно стало вашим»"
            />

            <p className="text-base sm:text-lg text-[#C9B9AA] font-light leading-relaxed">
              Творческий путь Ольги Подколзиной – это органичный синтез строгой академической школы и тонкого эмоционального восприятия мира. Поступив в 1995 году на художественно-графический факультет ЧГУ и успешно окончив его в 2000-м, она заложила прочный фундамент своего мастерства, который непрерывно воплощает в активной выставочной деятельности.
            </p>

            <p className="text-base sm:text-lg text-[#C9B9AA] font-light leading-relaxed">
              Более 25 лет Ольга посвятила преподаванию живописи, передавая секреты классической акварели и графики новому поколению художников. Каждая ее работа – это попытка уловить мимолетное мгновение счастья, наполнить интерьер светом и покоем.
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
                  alt="Натюрморт с цветами – живопись Ольги Подколзиной"
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
              className="p-6 sm:p-8 rounded-sm bg-[#22121F] border border-white/5 hover:border-[#D99E41]/50 hover:bg-[#22121F]/60 hover:backdrop-blur-md hover:shadow-[0_0_24px_rgba(217,158,65,0.25)] transition-all duration-300 relative group"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#E8BD6F] font-normal mb-2 tracking-tight whitespace-nowrap">
                <AnimatedCounter value={stat.num} suffix={stat.suffix} />
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
