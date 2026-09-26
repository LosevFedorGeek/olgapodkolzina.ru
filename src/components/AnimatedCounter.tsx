import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  from = 0,
  duration = 2.2,
  suffix = '',
  prefix = '',
  className = ''
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => `${prefix}${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, value, {
      duration,
      ease: [0.16, 1, 0.3, 1]
    });

    return () => controls.stop();
  }, [isInView, count, value, duration]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
    </span>
  );
};
