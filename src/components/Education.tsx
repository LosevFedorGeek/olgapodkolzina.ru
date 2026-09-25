import React from 'react';
import { Palette, GraduationCap, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../types';
import { SectionHeader } from './SectionHeader';
import { formatTypo } from '../utils/typography';
import { triggerHaptic } from '../utils/haptics';

interface EducationProps {
  services: ServiceItem[];
  onRegister: (courseTitle: string, price: string) => void;
  onAddToCart: (service: ServiceItem) => void;
}

export const Education: React.FC<EducationProps> = ({ services, onRegister }) => {
  const getIcon = (idx: number) => {
    if (idx === 0) return GraduationCap;
    if (idx === 1) return Palette;
    return Compass;
  };

  const handleRegister = (title: string, price: string) => {
    triggerHaptic(25);
    onRegister(title, price);
  };

  return (
    <section id="education" className="py-20 lg:py-28 relative bg-[#180E17] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={formatTypo('ОБУЧЕНИЕ И МАСТЕР-КЛАССЫ')}
          title={formatTypo('Развивайте художественное видение')}
          subtitle={formatTypo('Индивидуальные занятия и авторские курсы академической живописи. Обучение проводится очно и в интерактивном онлайн-формате с подробным разбором ваших работ.')}
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-3.5 lg:gap-6 xl:gap-8 items-stretch">
          {services.map((item, idx) => {
            const IconComponent = getIcon(idx % 3);
            const safeTitle = formatTypo(item.title).replace(/Арт[-–—]/g, 'Арт‑');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 sm:p-6 md:p-3.5 lg:p-6 xl:p-8 rounded-sm bg-[#22121F]/90 border border-white/5 hover:border-[#D99E41]/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:-translate-y-1 will-change-transform"
              >
                <div className="flex-1 flex flex-col">
                  <div className="h-9 md:h-8 lg:h-10 flex items-center mb-4 md:mb-3 lg:mb-5">
                    <div className="inline-flex items-center gap-1.5 md:gap-1.5 lg:gap-2.5 px-2.5 md:px-2 lg:px-3 py-1 lg:py-1.5 rounded-xs bg-[#2F172B] border border-[#D99E41]/35 shadow-sm max-w-full">
                      <IconComponent className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-[#D99E41] shrink-0" />
                      <span className="text-[10px] md:text-[9.5px] lg:text-[11px] font-semibold uppercase tracking-tight md:tracking-normal lg:tracking-wider text-[#E8BD6F] whitespace-nowrap">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-lg lg:text-2xl font-serif text-[#FBF5ED] mb-3 group-hover:text-[#E8BD6F] transition-colors text-balance min-h-[3rem] md:min-h-[2.85rem] lg:min-h-[3.75rem] flex items-center hyphens-none">
                    {safeTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#BBA99A] font-light leading-relaxed mb-6 text-pretty flex-1">
                    {formatTypo(item.desc)}
                  </p>
                </div>

                <div className="pt-5 md:pt-4 lg:pt-6 border-t border-white/10 flex flex-col sm:flex-row md:flex-col xl:flex-row items-start sm:items-center md:items-start xl:items-center justify-between gap-3 mt-auto">
                  <div className="min-w-0">
                    <div className="font-sans font-bold text-lg sm:text-xl lg:text-2xl text-[#E8BD6F] tracking-tight whitespace-nowrap">
                      {formatTypo(item.price)}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#8C7B6D] font-sans whitespace-nowrap mt-0.5">
                      {formatTypo(item.period)}
                    </div>
                  </div>

                  <div className="w-full sm:w-auto md:w-full xl:w-auto shrink-0">
                    <button
                      onClick={() => handleRegister(item.title, item.price)}
                      className="w-full sm:w-auto md:w-full xl:w-auto px-4 md:px-3 lg:px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#160A13] bg-[#D99E41] hover:bg-[#E8BD6F] active:scale-[0.98] transition-all duration-200 rounded-sm cursor-pointer whitespace-nowrap shimmer-btn interactive-action-btn shadow-md text-center block"
                    >
                      ЗАПИСАТЬСЯ
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
