import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 350);
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      setIsNearBottom(scrollPosition >= documentHeight - 140);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
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
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: isNearBottom ? -65 : 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 10 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          whileHover={{ scale: 1.1, y: isNearBottom ? -67 : -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Наверх страницы"
          className="fixed bottom-16 right-4 sm:bottom-20 sm:right-6 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#220F1F] text-[#E8BD6F] hover:text-[#FFF5EA] border border-[#D99E41]/50 hover:border-[#D99E41] shadow-xl hover:shadow-[0_0_22px_rgba(217,158,65,0.4)] hover:bg-[#220F1F]/55 hover:backdrop-blur-md transition-colors duration-300 flex items-center justify-center cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8BD6F]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
