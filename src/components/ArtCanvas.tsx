import React, { useState } from 'react';

interface ArtCanvasProps {
  id: string;
  title: string;
  imageSrc?: string;
  className?: string;
  aspect?: 'square' | 'landscape';
  sizes?: string;
  srcSet?: string;
}

export const ArtCanvas: React.FC<ArtCanvasProps> = ({
  id,
  title,
  imageSrc,
  className = '',
  aspect = 'landscape',
  sizes,
  srcSet
}) => {
  const [imgError, setImgError] = useState(false);

  if (imageSrc && !imgError) {
    const computedSrcSet = srcSet || `${imageSrc} 400w, ${imageSrc} 800w, ${imageSrc} 1200w`;
    const computedSizes =
      sizes ||
      '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1280px) 33vw, 420px';

    return (
      <div className={`relative w-full h-full overflow-hidden ${aspect === 'square' ? 'aspect-square' : 'aspect-[4/3]'}`}>
        <img
          src={imageSrc}
          srcSet={computedSrcSet}
          sizes={computedSizes}
          alt={`Картина «${title}» – художник Ольга Подколзина`}
          loading="lazy"
          decoding="async"
          width={600}
          height={450}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${className}`}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#241320] flex items-center justify-center p-6 text-center ${aspect === 'square' ? 'aspect-square' : 'aspect-[4/3]'}`}>
      <div className="space-y-1">
        <span className="font-serif text-lg text-[#E8BD6F] tracking-wide block">{title}</span>
        <span className="text-xs text-[#A8988B] tracking-wider uppercase font-mono">Ольга Подколзина</span>
      </div>
    </div>
  );
};
