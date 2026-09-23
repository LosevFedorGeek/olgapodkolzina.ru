import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#B37B2E] via-[#F3E8DB] to-[#D99E41] z-50 shadow-[0_0_12px_rgba(217,158,65,0.75)] pointer-events-none"
    />
  );
};
