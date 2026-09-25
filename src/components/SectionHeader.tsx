import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = 'left',
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`${align === 'center' ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}
    >
      {badge && (
        <div className={`mb-4 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="w-6 h-[1.5px] bg-[#D99E41]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#D99E41] font-semibold">
            {badge}
          </span>
        </div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FBF5ED] leading-tight text-balance section-title-subtle"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 text-sm sm:text-base text-[#C9B9AA] font-light max-w-2xl leading-relaxed text-pretty"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
