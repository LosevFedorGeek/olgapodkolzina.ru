import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 10 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Наверх страницы"
          className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#2A1525]/90 text-[#E8BD6F] border border-[#D99E41]/50 shadow-2xl backdrop-blur-md flex items-center justify-center hover:bg-[#391C33] hover:border-[#D99E41] hover:shadow-[0_0_18px_rgba(217,158,65,0.4)] transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8BD6F]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
