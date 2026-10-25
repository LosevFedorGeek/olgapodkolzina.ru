import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={scrollToTop}
          aria-label="Наверх страницы"
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#220F1F] text-[#E8BD6F] hover:text-[#FFF5EA] border border-[#D99E41]/50 hover:border-[#D99E41] shadow-2xl hover:shadow-[0_0_20px_rgba(217,158,65,0.45)] hover:bg-[#2A1326] transition-colors duration-200 flex items-center justify-center cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 text-[#E8BD6F]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
