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
    const computedSrcSet = srcSet || `${imageSrc} 400w, ${imageSrc} 600w, ${imageSrc} 800w, ${imageSrc} 1200w`;
    const computedSizes =
      sizes ||
      '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1280px) 33vw, 420px';

    return (
      <img
        src={imageSrc}
        srcSet={computedSrcSet}
        sizes={computedSizes}
        alt={`Картина «${title}» — авторская работа художника Ольги Подколзиной`}
        loading="lazy"
        decoding="async"
        width={600}
        height={450}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${className}`}
      />
    );
  }

  const renderPaintingArtwork = () => {
    switch (id) {
      case 'still-life-grapes':
        return (
          <svg viewBox="0 0 600 450" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="wallBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d1be9b" />
                <stop offset="40%" stopColor="#ba9c75" />
                <stop offset="100%" stopColor="#4a3b2c" />
              </linearGradient>
              <linearGradient id="silverJug" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8c8d92" />
                <stop offset="25%" stopColor="#f4f5f8" />
                <stop offset="60%" stopColor="#484a51" />
                <stop offset="90%" stopColor="#1a1c22" />
              </linearGradient>
              <radialGradient id="grapeGlow" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#a33250" />
                <stop offset="60%" stopColor="#58162e" />
                <stop offset="100%" stopColor="#220713" />
              </radialGradient>
              <linearGradient id="tableCloth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5efe6" />
                <stop offset="70%" stopColor="#dfd1bd" />
                <stop offset="100%" stopColor="#b49f82" />
              </linearGradient>
            </defs>
            <rect width="600" height="450" fill="url(#wallBg)" />
            <rect x="0" y="320" width="600" height="130" fill="#3b2314" />
            <polygon points="50,450 180,310 550,310 580,450" fill="url(#tableCloth)" opacity="0.95" />
            <path d="M 60,440 L 570,440" stroke="#8b7355" strokeWidth="4" strokeDasharray="3,3" opacity="0.6" />
            <ellipse cx="230" cy="350" rx="90" ry="24" fill="#dfd6c5" stroke="#a68e74" strokeWidth="3" />
            <g>
              <circle cx="170" cy="335" r="14" fill="url(#grapeGlow)" />
              <circle cx="190" cy="330" r="15" fill="url(#grapeGlow)" />
              <circle cx="210" cy="325" r="14" fill="url(#grapeGlow)" />
              <circle cx="230" cy="330" r="16" fill="url(#grapeGlow)" />
              <circle cx="180" cy="350" r="15" fill="url(#grapeGlow)" />
              <circle cx="202" cy="348" r="17" fill="url(#grapeGlow)" />
              <circle cx="225" cy="346" r="15" fill="url(#grapeGlow)" />
              <circle cx="248" cy="344" r="14" fill="url(#grapeGlow)" />
              <circle cx="195" cy="365" r="15" fill="url(#grapeGlow)" />
              <circle cx="218" cy="364" r="16" fill="url(#grapeGlow)" />
              <circle cx="238" cy="362" r="14" fill="url(#grapeGlow)" />
              <circle cx="160" cy="360" r="13" fill="url(#grapeGlow)" />
              <circle cx="148" cy="380" r="12" fill="url(#grapeGlow)" />
              <circle cx="168" cy="378" r="13" fill="url(#grapeGlow)" />
              <path d="M 210,310 Q 230,260 270,270" stroke="#5d662c" strokeWidth="3" fill="none" />
              <path d="M 270,270 Q 300,250 310,280 Q 290,300 270,270 Z" fill="#808a38" opacity="0.85" />
            </g>
            <g>
              <path d="M 400,380 C 400,240 375,210 395,160 C 390,140 405,120 415,115 C 425,120 440,140 435,160 C 455,210 430,240 430,380 Z" fill="url(#silverJug)" />
              <ellipse cx="415" cy="380" rx="45" ry="14" fill="url(#silverJug)" />
              <ellipse cx="415" cy="285" rx="55" ry="38" fill="url(#silverJug)" />
              <path d="M 450,210 C 500,220 500,330 440,340" stroke="url(#silverJug)" strokeWidth="16" fill="none" strokeLinecap="round" />
              <path d="M 410,130 Q 370,140 365,160" stroke="url(#silverJug)" strokeWidth="12" fill="none" strokeLinecap="round" />
            </g>
            <g opacity="0.88">
              <ellipse cx="310" cy="390" rx="14" ry="4" fill="#a4283c" />
              <path d="M 300,350 L 320,350 L 316,375 L 304,375 Z" fill="#b82035" opacity="0.8" />
              <path d="M 296,330 C 296,360 324,360 324,330 Z" fill="#e2edf8" opacity="0.5" stroke="#c0d4e8" strokeWidth="1.5" />
              <path d="M 300,336 C 300,356 320,356 320,336 Z" fill="#99152b" opacity="0.85" />
              <line x1="310" y1="360" x2="310" y2="390" stroke="#c0d4e8" strokeWidth="2.5" />
            </g>
          </svg>
        );

      case 'workshop-light':
        return (
          <svg viewBox="0 0 600 450" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="atelierSun" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff3db" />
                <stop offset="35%" stopColor="#e8cf9b" />
                <stop offset="85%" stopColor="#483327" />
              </linearGradient>
              <linearGradient id="windowGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#ffd899" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#e29e5b" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <rect width="600" height="450" fill="url(#atelierSun)" />
            <rect x="30" y="40" width="180" height="260" fill="none" stroke="#684b39" strokeWidth="10" />
            <line x1="120" y1="40" x2="120" y2="300" stroke="#684b39" strokeWidth="6" />
            <line x1="30" y1="120" x2="210" y2="120" stroke="#684b39" strokeWidth="6" />
            <line x1="30" y1="200" x2="210" y2="200" stroke="#684b39" strokeWidth="6" />
            <polygon points="30,40 210,40 450,450 180,450" fill="url(#windowGlow)" />
            <line x1="280" y1="430" x2="350" y2="110" stroke="#875836" strokeWidth="12" />
            <line x1="420" y1="430" x2="350" y2="110" stroke="#875836" strokeWidth="12" />
            <line x1="350" y1="440" x2="350" y2="90" stroke="#684126" strokeWidth="10" />
            <rect x="270" y="160" width="160" height="150" fill="#f8f4ee" stroke="#b49c7b" strokeWidth="8" rx="2" />
            <line x1="250" y1="310" x2="450" y2="310" stroke="#5d3b23" strokeWidth="14" strokeLinecap="round" />
            <ellipse cx="490" cy="330" rx="30" ry="40" fill="#a8cde5" opacity="0.6" />
            <circle cx="490" cy="270" r="45" fill="#f8f9fa" opacity="0.9" />
            <circle cx="465" cy="250" r="30" fill="#f0edf5" opacity="0.85" />
            <circle cx="515" cy="260" r="32" fill="#faf5ef" opacity="0.9" />
            <ellipse cx="480" cy="400" rx="60" ry="24" fill="#875128" stroke="#48270e" strokeWidth="3" transform="rotate(-10 480 400)" />
            <circle cx="450" cy="395" r="6" fill="#bd2a2a" />
            <circle cx="465" cy="390" r="6" fill="#e8a825" />
            <circle cx="485" cy="390" r="6" fill="#2d6199" />
            <circle cx="505" cy="395" r="6" fill="#357835" />
            <circle cx="520" cy="405" r="6" fill="#ffffff" />
          </svg>
        );

      case 'neva-morning':
        return (
          <svg viewBox="0 0 600 450" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skyNeva" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d3b5cd" />
                <stop offset="40%" stopColor="#f5d6c6" />
                <stop offset="70%" stopColor="#fae7cc" />
                <stop offset="100%" stopColor="#eed1b3" />
              </linearGradient>
              <linearGradient id="waterNeva" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e8c7b8" />
                <stop offset="30%" stopColor="#baa9b8" />
                <stop offset="70%" stopColor="#8795a8" />
                <stop offset="100%" stopColor="#55667c" />
              </linearGradient>
            </defs>
            <rect width="600" height="240" fill="url(#skyNeva)" />
            <rect y="240" width="600" height="210" fill="url(#waterNeva)" />
            <circle cx="360" cy="180" r="36" fill="#fff5e4" opacity="0.85" filter="drop-shadow(0 0 25px #ffd699)" />
            <rect x="0" y="165" width="220" height="75" fill="#c4aa9c" opacity="0.85" />
            <rect x="15" y="150" width="190" height="15" fill="#ad9385" opacity="0.9" />
            <polygon points="20,150 35,120 185,120 200,150" fill="#9e8578" opacity="0.8" />
            <line x1="220" y1="230" x2="600" y2="230" stroke="#7e7a85" strokeWidth="8" />
            <path d="M 230,230 Q 300,215 370,230 Q 440,215 510,230 Q 580,215 600,230" stroke="#686370" strokeWidth="5" fill="none" />
            <line x1="500" y1="230" x2="500" y2="100" stroke="#bfa67e" strokeWidth="4" />
            <polygon points="496,100 504,100 500,50" fill="#e5c880" />
            <path d="M 0,270 Q 200,320 280,450 L 0,450 Z" fill="#695f5c" />
            <line x1="0" y1="270" x2="280" y2="450" stroke="#4a423f" strokeWidth="12" />
            <path d="M 0,250 Q 200,300 280,430" stroke="#2a2522" strokeWidth="6" fill="none" strokeDasharray="14,8" />
            <g transform="translate(420, 310)">
              <ellipse cx="25" cy="15" rx="35" ry="8" fill="#42362f" />
              <circle cx="20" cy="5" r="6" fill="#302620" />
              <circle cx="32" cy="7" r="5" fill="#302620" />
              <line x1="15" y1="12" x2="0" y2="24" stroke="#42362f" strokeWidth="2.5" />
              <line x1="30" y1="12" x2="45" y2="24" stroke="#42362f" strokeWidth="2.5" />
            </g>
          </svg>
        );

      case 'old-estate-noon':
        return (
          <svg viewBox="0 0 600 450" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="estateSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8bb6d8" />
                <stop offset="60%" stopColor="#c5e0ee" />
                <stop offset="100%" stopColor="#eaf3f8" />
              </linearGradient>
              <linearGradient id="lawn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#759336" />
                <stop offset="40%" stopColor="#547526" />
                <stop offset="100%" stopColor="#2c4511" />
              </linearGradient>
            </defs>
            <rect width="600" height="230" fill="url(#estateSky)" />
            <rect y="210" width="600" height="240" fill="url(#lawn)" />
            <ellipse cx="140" cy="200" rx="90" ry="50" fill="#466224" />
            <ellipse cx="240" cy="190" rx="70" ry="45" fill="#3c551e" />
            <ellipse cx="480" cy="210" rx="130" ry="60" fill="#3c551e" />
            <g transform="translate(180, 130)">
              <rect x="30" y="40" width="180" height="70" fill="#e8cf90" stroke="#bf9e58" strokeWidth="2" />
              <polygon points="10,40 120,5 230,40" fill="#9e4732" />
              <polygon points="75,40 120,15 165,40" fill="#f5efe1" stroke="#c9b793" strokeWidth="2" />
              <line x1="85" y1="40" x2="85" y2="110" stroke="#ffffff" strokeWidth="6" />
              <line x1="108" y1="40" x2="108" y2="110" stroke="#ffffff" strokeWidth="6" />
              <line x1="132" y1="40" x2="132" y2="110" stroke="#ffffff" strokeWidth="6" />
              <line x1="155" y1="40" x2="155" y2="110" stroke="#ffffff" strokeWidth="6" />
            </g>
            <path d="M 270,240 Q 320,310 390,450 L 480,450 Q 380,310 300,240 Z" fill="#cfb68c" opacity="0.9" />
            <g>
              <line x1="100" y1="450" x2="115" y2="30" stroke="#f2ede4" strokeWidth="12" />
              <line x1="100" y1="450" x2="115" y2="30" stroke="#221e1b" strokeWidth="12" strokeDasharray="4,28" />
              <line x1="140" y1="450" x2="150" y2="60" stroke="#f2ede4" strokeWidth="9" />
              <line x1="140" y1="450" x2="150" y2="60" stroke="#221e1b" strokeWidth="9" strokeDasharray="3,20" />
              <circle cx="110" cy="80" r="45" fill="#6d8a30" opacity="0.85" />
              <circle cx="140" cy="110" r="35" fill="#8ba744" opacity="0.85" />
              <circle cx="170" cy="90" r="40" fill="#587722" opacity="0.85" />
            </g>
          </svg>
        );

      case 'peonies-terrace':
        return (
          <svg viewBox="0 0 600 450" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="flowerBg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff6eb" />
                <stop offset="60%" stopColor="#dec6b2" />
                <stop offset="100%" stopColor="#5d4435" />
              </radialGradient>
              <radialGradient id="pinkPeony" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffc7d5" />
                <stop offset="50%" stopColor="#e86b8b" />
                <stop offset="100%" stopColor="#871b36" />
              </radialGradient>
              <radialGradient id="whitePeony" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#fae7eb" />
                <stop offset="100%" stopColor="#c79ba8" />
              </radialGradient>
            </defs>
            <rect width="600" height="450" fill="url(#flowerBg)" />
            <rect y="330" width="600" height="120" fill="#755038" />
            <line x1="0" y1="370" x2="600" y2="370" stroke="#543724" strokeWidth="3" />
            <line x1="0" y1="410" x2="600" y2="410" stroke="#543724" strokeWidth="3" />
            <ellipse cx="300" cy="300" rx="45" ry="60" fill="#b9d6e8" opacity="0.6" stroke="#90b8d1" strokeWidth="2" />
            <ellipse cx="300" cy="340" rx="38" ry="12" fill="#7ba3bc" opacity="0.7" />
            <circle cx="250" cy="180" r="45" fill="url(#pinkPeony)" />
            <circle cx="340" cy="170" r="48" fill="url(#pinkPeony)" />
            <circle cx="300" cy="130" r="50" fill="url(#whitePeony)" />
            <circle cx="210" cy="220" r="38" fill="url(#whitePeony)" />
            <circle cx="380" cy="230" r="40" fill="url(#pinkPeony)" />
            <circle cx="295" cy="210" r="42" fill="url(#pinkPeony)" />
            <path d="M 180,180 Q 150,160 170,130 Q 200,150 180,180 Z" fill="#3d5c28" />
            <path d="M 390,160 Q 430,140 430,170 Q 400,190 390,160 Z" fill="#365422" />
            <path d="M 230,280 Q 200,310 180,280 Q 210,260 230,280 Z" fill="#4d6f34" />
            <path d="M 370,270 Q 410,290 400,320 Q 360,300 370,270 Z" fill="#45652f" />
          </svg>
        );

      case 'winter-temple':
        return (
          <svg viewBox="0 0 600 450" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="winterSepia" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dfd7cf" />
                <stop offset="50%" stopColor="#c8bcaf" />
                <stop offset="100%" stopColor="#968779" />
              </linearGradient>
            </defs>
            <rect width="600" height="450" fill="url(#winterSepia)" />
            <rect y="290" width="600" height="160" fill="#f4efe9" opacity="0.9" />
            <g transform="translate(230, 140)">
              <rect x="20" y="60" width="100" height="90" fill="#eae4db" stroke="#5d4c3e" strokeWidth="3" />
              <path d="M 20,60 Q 70,30 120,60" fill="#d9d1c5" stroke="#5d4c3e" strokeWidth="3" />
              <path d="M 50,60 L 50,20 L 90,20 L 90,60" fill="#eae4db" stroke="#5d4c3e" strokeWidth="2.5" />
              <path d="M 70,0 C 55,10 50,20 70,22 C 90,20 85,10 70,0 Z" fill="#45382e" stroke="#221b15" strokeWidth="1.5" />
              <line x1="70" y1="-8" x2="70" y2="3" stroke="#2b221a" strokeWidth="2.5" />
              <line x1="65" y1="-4" x2="75" y2="-4" stroke="#2b221a" strokeWidth="2" />
              <path d="M 20,28 C 10,36 6,44 20,45 C 34,44 30,36 20,28 Z" fill="#58483b" />
              <path d="M 120,28 C 110,36 106,44 120,45 C 134,44 130,36 120,28 Z" fill="#58483b" />
              <line x1="20" y1="20" x2="20" y2="30" stroke="#332921" strokeWidth="2" />
              <line x1="120" y1="20" x2="120" y2="30" stroke="#332921" strokeWidth="2" />
              <path d="M 55,150 L 55,115 Q 70,105 85,115 L 85,150 Z" fill="#3a2f26" />
            </g>
            <path d="M 0,0 Q 150,120 220,180" stroke="#382c22" strokeWidth="7" fill="none" />
            <path d="M 60,40 Q 140,80 180,60" stroke="#4a3c30" strokeWidth="4" fill="none" />
            <path d="M 140,110 Q 200,160 210,210" stroke="#4a3c30" strokeWidth="3" fill="none" />
            <path d="M 600,0 Q 420,130 380,210" stroke="#382c22" strokeWidth="7" fill="none" />
            <path d="M 520,30 Q 440,70 410,40" stroke="#4a3c30" strokeWidth="4" fill="none" />
            <path d="M 450,110 Q 380,150 350,180" stroke="#4a3c30" strokeWidth="3" fill="none" />
            <path d="M 0,450 Q 180,360 250,330" stroke="#3a2e24" strokeWidth="6" fill="none" />
            <path d="M 600,450 Q 440,370 360,330" stroke="#3a2e24" strokeWidth="6" fill="none" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full bg-[#20101D] flex items-center justify-center p-6 text-center">
            <span className="font-serif text-lg text-[#E8BD6F] tracking-wide">{title}</span>
          </div>
        );
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${aspect === 'square' ? 'aspect-square' : 'aspect-[4/3]'}`}>
      {renderPaintingArtwork()}
    </div>
  );
};
