export const triggerHaptic = (duration = 20): void => {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate(duration);
    } catch {}
  }
};

export const getArtworkSrcSet = (imageSrc: string): string => {
  if (!imageSrc) return '';
  return `${imageSrc} 600w, ${imageSrc} 1200w`;
};
