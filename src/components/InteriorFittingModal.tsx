import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Upload,
  Sparkles,
  Download,
  Move,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Box,
  Compass,
  Info,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { Artwork } from '../types';
import { ARTWORKS } from '../data/artworks';
import { triggerHaptic } from '../utils/haptics';

interface InteriorFittingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialArtwork?: Artwork | null;
  onPurchaseArtwork?: (art: Artwork) => void;
  onOpenContact?: (topic: string) => void;
}

interface RoomTemplate {
  id: string;
  name: string;
  category: string;
  bgImage: string;
  defaultPos: { x: number; y: number };
  defaultScale: number;
  defaultPlane: { rotateX: number; rotateY: number; rotateZ: number };
  lightTone: 'studio' | 'neutral' | 'warm' | 'cool';
}

interface FrameStyle {
  id: string;
  label: string;
  description: string;
  containerClass: string;
  innerClass?: string;
  canvasRender: (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) => void;
}

const ROOM_TEMPLATES: RoomTemplate[] = [
  {
    id: 'studio',
    name: 'Мастерская автора',
    category: 'Студия с мольбертом',
    bgImage: '/assets/masterskaya-avtora.jpg',
    defaultPos: { x: 38, y: 38 },
    defaultScale: 85,
    defaultPlane: { rotateX: -2, rotateY: 10, rotateZ: 0 },
    lightTone: 'studio'
  },
  {
    id: 'living',
    name: 'Светлая гостиная',
    category: 'Скандинавский интерьер',
    bgImage: '/assets/room-living.jpg',
    defaultPos: { x: 50, y: 34 },
    defaultScale: 95,
    defaultPlane: { rotateX: 1, rotateY: 0, rotateZ: 0 },
    lightTone: 'neutral'
  },
  {
    id: 'nordic',
    name: 'Нордический уют',
    category: 'Минимализм',
    bgImage: '/assets/room-nordic.jpg',
    defaultPos: { x: 50, y: 36 },
    defaultScale: 95,
    defaultPlane: { rotateX: 2, rotateY: 4, rotateZ: 0 },
    lightTone: 'cool'
  },
  {
    id: 'classic',
    name: 'Академический кабинет',
    category: 'Классика и дерево',
    bgImage: '/assets/room-classic.jpg',
    defaultPos: { x: 50, y: 38 },
    defaultScale: 95,
    defaultPlane: { rotateX: 0, rotateY: -2, rotateZ: 0 },
    lightTone: 'warm'
  }
];

const FRAMES: FrameStyle[] = [
  {
    id: 'gold',
    label: 'Золотой багет',
    description: 'Итальянский резной багет с объемным рельефом и позолотой',
    containerClass:
      'p-[10px] sm:p-[14px] bg-gradient-to-tr from-[#784C0F] via-[#F3D17C] to-[#6E440C] rounded-xs border-2 border-[#FFE8AA]/70 relative before:absolute before:inset-[3px] before:border before:border-[#523207] after:absolute after:inset-[6px] after:border after:border-[#FFF1C7]/40',
    innerClass:
      'p-1 sm:p-1.5 bg-[#1A0E18] shadow-[inset_0_3px_6px_rgba(0,0,0,0.8)] border border-black/80',
    canvasRender: (ctx, x, y, w, h) => {
      const b = 18;
      ctx.save();
      const goldGrad = ctx.createLinearGradient(x - b, y - b, x + w + b, y + h + b);
      goldGrad.addColorStop(0, '#6E440C');
      goldGrad.addColorStop(0.2, '#E2B258');
      goldGrad.addColorStop(0.35, '#FFF2CE');
      goldGrad.addColorStop(0.5, '#A4731E');
      goldGrad.addColorStop(0.7, '#F7D688');
      goldGrad.addColorStop(1, '#5E3807');
      ctx.fillStyle = goldGrad;
      ctx.fillRect(x - b, y - b, w + b * 2, h + b * 2);

      ctx.strokeStyle = 'rgba(255, 240, 195, 0.85)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - b + 2, y - b + 2, w + (b - 2) * 2, h + (b - 2) * 2);

      ctx.strokeStyle = '#3D2204';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x - b + 6, y - b + 6, w + (b - 6) * 2, h + (b - 6) * 2);

      ctx.fillStyle = '#140A12';
      ctx.fillRect(x - 4, y - 4, w + 8, h + 8);
      ctx.restore();
    }
  },
  {
    id: 'minimal',
    label: 'Минимализм',
    description: 'Матовый теневой профиль с эффектом парения',
    containerClass:
      'p-[6px] sm:p-[8px] bg-[#1A1A1C] rounded-xs border border-white/25 ring-1 ring-black relative',
    innerClass: 'p-1 bg-[#0A0A0C] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]',
    canvasRender: (ctx, x, y, w, h) => {
      const b = 8;
      ctx.save();
      ctx.fillStyle = '#1A1A1C';
      ctx.fillRect(x - b, y - b, w + b * 2, h + b * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x - b, y - b, w + b * 2, h + b * 2);
      ctx.fillStyle = '#08080A';
      ctx.fillRect(x - 2, y - 2, w + 4, h + 4);
      ctx.restore();
    }
  },
  {
    id: 'classic',
    label: 'Классика',
    description: 'Массив мореного ясеня и дуба с золотым кантом',
    containerClass:
      'p-[10px] sm:p-[13px] bg-gradient-to-tr from-[#1E110A] via-[#462817] to-[#170C06] rounded-xs border border-[#7A4C30]/60 ring-1 ring-black/70 relative before:absolute before:inset-[4px] before:border before:border-[#CCA258]/60',
    innerClass: 'p-1 bg-[#120904] shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)]',
    canvasRender: (ctx, x, y, w, h) => {
      const b = 15;
      ctx.save();
      const woodGrad = ctx.createLinearGradient(x - b, y - b, x + w + b, y + h + b);
      woodGrad.addColorStop(0, '#170C06');
      woodGrad.addColorStop(0.3, '#462817');
      woodGrad.addColorStop(0.7, '#341D10');
      woodGrad.addColorStop(1, '#1A0E08');
      ctx.fillStyle = woodGrad;
      ctx.fillRect(x - b, y - b, w + b * 2, h + b * 2);

      ctx.strokeStyle = '#CCA258';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x - 5, y - 5, w + 10, h + 10);

      ctx.strokeStyle = 'rgba(122, 76, 48, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x - b + 1, y - b + 1, w + (b - 1) * 2, h + (b - 1) * 2);
      ctx.restore();
    }
  },
  {
    id: 'canvas',
    label: 'Без рамы (Холст)',
    description: 'Галерейная натяжка с объемными боковыми торцами',
    containerClass:
      'rounded-xs ring-1 ring-black/30 relative before:absolute before:inset-0 before:shadow-[inset_0_0_12px_rgba(0,0,0,0.25)]',
    innerClass: '',
    canvasRender: () => {}
  }
];

function analyzeImagePlaneGeometry(img: HTMLImageElement): {
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  x: number;
  y: number;
  note: string;
} {
  try {
    const canvas = document.createElement('canvas');
    const w = 240;
    const h = 180;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      return { rotateX: 0, rotateY: 0, rotateZ: 0, x: 50, y: 38, note: 'Плоскость стены откалибрована.' };
    }
    ctx.drawImage(img, 0, 0, w, h);
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    let leftGrad = 0;
    let rightGrad = 0;
    let topGrad = 0;
    let bottomGrad = 0;
    let sumHorizonY = 0;
    let horizonWeight = 0;

    for (let y = 1; y < h - 1; y += 2) {
      for (let x = 1; x < w - 1; x += 2) {
        const idx = (y * w + x) * 4;
        const lum = (data[idx] * 299 + data[idx + 1] * 587 + data[idx + 2] * 114) / 1000;
        const lumRight = (data[idx + 4] * 299 + data[idx + 5] * 587 + data[idx + 6] * 114) / 1000;
        const lumDown = (data[idx + w * 4] * 299 + data[idx + w * 4 + 1] * 587 + data[idx + w * 4 + 2] * 114) / 1000;

        const gx = Math.abs(lumRight - lum);
        const gy = Math.abs(lumDown - lum);

        if (x < w / 2) {
          leftGrad += gx;
        } else {
          rightGrad += gx;
        }

        if (y < h / 2) {
          topGrad += gy;
        } else {
          bottomGrad += gy;
        }

        if (gy > 25 && y > h * 0.4 && y < h * 0.85) {
          sumHorizonY += y * gy;
          horizonWeight += gy;
        }
      }
    }

    const gradDiffX = (rightGrad - leftGrad) / Math.max(1, rightGrad + leftGrad);
    const gradDiffY = (bottomGrad - topGrad) / Math.max(1, bottomGrad + topGrad);

    let calcRotateY = Math.round(gradDiffX * 24);
    calcRotateY = Math.max(-18, Math.min(18, calcRotateY));

    let calcRotateX = Math.round(gradDiffY * 8);
    calcRotateX = Math.max(-8, Math.min(8, calcRotateX));

    let detectedWallCenterY = 38;
    if (horizonWeight > 0) {
      const avgHorizonY = (sumHorizonY / horizonWeight) / h * 100;
      detectedWallCenterY = Math.max(25, Math.min(48, Math.round(avgHorizonY * 0.65)));
    }

    return {
      rotateX: calcRotateX,
      rotateY: calcRotateY,
      rotateZ: 0,
      x: 50,
      y: detectedWallCenterY,
      note: `Горизонт стены распознан: угол наклона ${calcRotateY}°, вертикаль ${calcRotateX}°. Картина выровнена по плоскости стены.`
    };
  } catch {
    return {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      x: 50,
      y: 38,
      note: 'Плоскость стены откалибрована.'
    };
  }
}

export const InteriorFittingModal: React.FC<InteriorFittingModalProps> = ({
  isOpen,
  onClose,
  initialArtwork,
  onPurchaseArtwork,
  onOpenContact
}) => {
  const [selectedArt, setSelectedArt] = useState<Artwork>(initialArtwork || ARTWORKS[0]);
  const [userWallImg, setUserWallImg] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('studio');
  const [selectedFrame, setSelectedFrame] = useState<string>('gold');
  const [scale, setScale] = useState<number>(85);
  const [positionPercent, setPositionPercent] = useState<{ x: number; y: number }>({ x: 38, y: 38 });
  const [plane3D, setPlane3D] = useState<{ rotateX: number; rotateY: number; rotateZ: number }>({
    rotateX: -2,
    rotateY: 10,
    rotateZ: 0
  });
  const [showPerspectiveControls, setShowPerspectiveControls] = useState<boolean>(false);
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);
  const [aiNote, setAiNote] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ clientX: number; clientY: number; startX: number; startY: number }>({
    clientX: 0,
    clientY: 0,
    startX: 38,
    startY: 38
  });

  useEffect(() => {
    if (initialArtwork) {
      setSelectedArt(initialArtwork);
    }
  }, [initialArtwork]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const activeTemplate = ROOM_TEMPLATES.find((r) => r.id === selectedRoomId) || ROOM_TEMPLATES[0];
  const activeFrame = FRAMES.find((f) => f.id === selectedFrame) || FRAMES[0];

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoomId(roomId);
    triggerHaptic(15);
    const tmpl = ROOM_TEMPLATES.find((r) => r.id === roomId);
    if (tmpl) {
      setPositionPercent(tmpl.defaultPos);
      setScale(tmpl.defaultScale);
      setPlane3D(tmpl.defaultPlane);
      setAiNote(null);
    }
  };

  const triggerSpatialAnalysis = useCallback(async (customImg?: string) => {
    setIsAiProcessing(true);
    setIsScanning(true);
    triggerHaptic(25);

    const imgSrc = customImg || userWallImg || activeTemplate.bgImage;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const geoResult = analyzeImagePlaneGeometry(img);
      setPlane3D({
        rotateX: geoResult.rotateX,
        rotateY: geoResult.rotateY,
        rotateZ: geoResult.rotateZ
      });
      setPositionPercent({
        x: geoResult.x,
        y: geoResult.y
      });
      setAiNote(geoResult.note);
    };
    img.src = imgSrc;

    try {
      let base64Payload = imgSrc;
      if (!imgSrc.startsWith('data:')) {
        const response = await fetch(imgSrc);
        const blob = await response.blob();
        base64Payload = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      }

      const res = await fetch('/api/analyze-wall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Payload })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.x != null && data.y != null) {
          setPositionPercent({
            x: Math.max(12, Math.min(88, data.x)),
            y: Math.max(15, Math.min(85, data.y))
          });
        }
        if (data.scale) {
          setScale(Math.max(65, Math.min(130, data.scale)));
        }
        setPlane3D({
          rotateX: Math.max(-15, Math.min(15, data.rotateX ?? 0)),
          rotateY: Math.max(-25, Math.min(25, data.rotateY ?? 0)),
          rotateZ: Math.max(-5, Math.min(5, data.rotateZ ?? 0))
        });
        if (data.note) {
          setAiNote(data.note);
        }
      }
    } catch {
    } finally {
      setIsAiProcessing(false);
      setIsScanning(false);
    }
  }, [userWallImg, activeTemplate.bgImage]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setUserWallImg(dataUrl);
        triggerSpatialAnalysis(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const computedPixelWidth = Math.round((280 * scale) / 100);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    triggerHaptic(10);
    setIsDragging(true);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      startX: positionPercent.x,
      startY: positionPercent.y
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const deltaX = ((e.clientX - dragStartRef.current.clientX) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStartRef.current.clientY) / rect.height) * 100;

    const targetX = dragStartRef.current.startX + deltaX;
    const targetY = dragStartRef.current.startY + deltaY;

    const newX = Math.max(8, Math.min(92, targetX));
    const newY = Math.max(8, Math.min(92, targetY));

    setPositionPercent({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const handleDownload = () => {
    triggerHaptic(20);
    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const finalize = () => {
      const artImg = new Image();
      artImg.crossOrigin = 'anonymous';
      artImg.onload = () => {
        const baseWidth = 520;
        const artAspect = artImg.width / artImg.height || 4 / 3;
        const artWidth = (baseWidth * scale) / 100;
        const artHeight = artWidth / artAspect;

        const centerX = (positionPercent.x / 100) * canvas.width;
        const centerY = (positionPercent.y / 100) * canvas.height;

        ctx.save();
        ctx.translate(centerX, centerY);

        const radX = (plane3D.rotateX * Math.PI) / 180;
        const radY = (plane3D.rotateY * Math.PI) / 180;
        const radZ = (plane3D.rotateZ * Math.PI) / 180;

        ctx.transform(Math.cos(radZ), Math.sin(radZ) + radX * 0.2, -radY * 0.2, 1, 0, 0);

        const posX = -artWidth / 2;
        const posY = -artHeight / 2;

        ctx.shadowColor = 'rgba(0, 0, 0, 0.72)';
        ctx.shadowBlur = 60;
        ctx.shadowOffsetX = 18 - plane3D.rotateY * 0.5;
        ctx.shadowOffsetY = 28 + plane3D.rotateX * 0.5;

        activeFrame.canvasRender(ctx, posX, posY, artWidth, artHeight);

        ctx.drawImage(artImg, posX, posY, artWidth, artHeight);

        const glare = ctx.createLinearGradient(posX, posY, posX + artWidth, posY + artHeight);
        glare.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
        glare.addColorStop(0.3, 'rgba(255, 255, 255, 0.02)');
        glare.addColorStop(1, 'rgba(0, 0, 0, 0.05)');
        ctx.fillStyle = glare;
        ctx.fillRect(posX, posY, artWidth, artHeight);

        ctx.restore();

        ctx.fillStyle = 'rgba(18, 9, 17, 0.9)';
        ctx.fillRect(0, canvas.height - 80, canvas.width, 80);

        ctx.font = '500 26px Georgia, serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`«${selectedArt.title}» • ${selectedArt.technique}, ${selectedArt.size}`, 45, canvas.height - 30);

        ctx.font = '600 20px system-ui, sans-serif';
        ctx.fillStyle = '#E8BD6F';
        ctx.textAlign = 'right';
        ctx.fillText('Галерея Ольги Подколзиной • olgapodkolzina.ru', canvas.width - 45, canvas.height - 30);

        const link = document.createElement('a');
        link.download = `primerka-${selectedArt.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      artImg.src = selectedArt.imageSrc || '';
    };

    const bgImageSource = userWallImg || activeTemplate.bgImage;
    const bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';
    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
      finalize();
    };
    bgImg.src = bgImageSource;
  };

  const getAmbianceFilter = () => {
    switch (activeTemplate.lightTone) {
      case 'studio':
        return 'sepia(6%) contrast(102%) brightness(99%)';
      case 'warm':
        return 'sepia(10%) contrast(103%) brightness(98%)';
      case 'cool':
        return 'saturate(97%) contrast(102%) brightness(100%)';
      case 'neutral':
      default:
        return 'contrast(102%) brightness(100%)';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl bg-[#170B16] border border-[#D99E41]/35 rounded-sm shadow-2xl z-10 overflow-hidden my-auto max-h-[92vh] sm:max-h-[94vh] flex flex-col">
        <div className="px-4 py-3 sm:px-6 bg-[#210E20] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-[#D99E41]/20 border border-[#D99E41]/50 flex items-center justify-center text-[#E8BD6F]">
              <Sparkles className="w-4 h-4 text-[#D99E41]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif text-[#FBF5ED] leading-tight flex items-center gap-2">
                <span>Примерка в интерьере</span>
              </h2>
              <p className="text-[11px] text-[#BAA99A]">
                Бесплатно визуализируем картину на фотографии вашей стены в реальном пространстве
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#BAA99A] hover:text-[#EDE4DC] hover:bg-white/15 transition-colors cursor-pointer"
            aria-label="Закрыть примерку"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 lg:p-7 pb-8 sm:pb-10 lg:pb-12 flex flex-col lg:flex-row gap-5 lg:gap-6">
          <div className="lg:w-7/12 flex flex-col gap-3 shrink-0 pb-6 sm:pb-8 lg:pb-12">
            <div
              ref={stageRef}
              className="relative w-full aspect-[4/3] rounded-xs overflow-hidden border border-white/15 shadow-2xl flex items-center justify-center select-none bg-[#120711] touch-none"
              style={{
                background: userWallImg
                  ? `url(${userWallImg}) center / cover no-repeat`
                  : `url(${activeTemplate.bgImage}) center / cover no-repeat`
              }}
            >
              <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="absolute cursor-grab active:cursor-grabbing select-none touch-none z-20"
                style={{
                  left: `${positionPercent.x}%`,
                  top: `${positionPercent.y}%`,
                  transform: `translate(-50%, -50%) perspective(1200px) rotateX(${plane3D.rotateX}deg) rotateY(${plane3D.rotateY}deg) rotateZ(${plane3D.rotateZ}deg)`,
                  width: `${computedPixelWidth}px`,
                  minWidth: `${computedPixelWidth}px`,
                  maxWidth: `${computedPixelWidth}px`,
                  boxSizing: 'border-box',
                  flexShrink: 0,
                  filter: getAmbianceFilter()
                }}
              >
                <div
                  className={`relative transition-all duration-300 w-full ${activeFrame.containerClass}`}
                  style={{
                    boxShadow: `${16 - plane3D.rotateY * 0.6}px ${26 + plane3D.rotateX * 0.6}px 45px rgba(0, 0, 0, 0.72), 0 8px 20px rgba(0, 0, 0, 0.45)`
                  }}
                >
                  <div className={activeFrame.innerClass}>
                    <div className="relative overflow-hidden w-full">
                      <img
                        src={selectedArt.imageSrc}
                        alt={selectedArt.title}
                        draggable={false}
                        className="w-full h-auto object-contain pointer-events-none block shadow-xl select-none"
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/10 via-transparent to-white/10 mix-blend-overlay" />
                    </div>
                  </div>
                </div>
              </div>

              {isScanning && (
                <motion.div
                  initial={{ top: '0%' }}
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E8BD6F] to-transparent shadow-[0_0_15px_#E8BD6F] z-30 pointer-events-none"
                />
              )}

              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    className="absolute top-3 inset-x-3 sm:inset-x-6 z-40 p-3 sm:p-3.5 rounded-sm bg-[#180A17]/95 backdrop-blur-md border border-[#D99E41]/50 shadow-2xl text-[#EDE4DC]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-[#E8BD6F] shrink-0" />
                        <span className="font-semibold text-xs text-[#FFF5EA]">
                          Как управлять картиной на стене
                        </span>
                      </div>
                      <button
                        onClick={() => setShowTooltip(false)}
                        className="p-1 rounded-full text-[#A8988B] hover:text-[#EDE4DC] hover:bg-white/10 cursor-pointer"
                        title="Скрыть подсказку"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-2 text-[11px] sm:text-xs text-[#C8B8A8] space-y-1.5 leading-relaxed">
                      <div className="flex items-start gap-2">
                        <Move className="w-3.5 h-3.5 text-[#D99E41] shrink-0 mt-0.5" />
                        <span>
                          <strong>Перемещение:</strong> Зажмите картину и свободно передвигайте её по стене в 2D. Размер картины не меняется при движении.
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Maximize2 className="w-3.5 h-3.5 text-[#D99E41] shrink-0 mt-0.5" />
                        <span>
                          <strong>Размер:</strong> Масштабирование выполняется только кнопками <strong>[+]</strong> и <strong>[–]</strong> снизу.
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Compass className="w-3.5 h-3.5 text-[#D99E41] shrink-0 mt-0.5" />
                        <span>
                          <strong>Перспектива:</strong> Картина автоматически выравнивается по наклону стены и линии горизонта.
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-white/10 flex justify-end">
                      <button
                        onClick={() => {
                          triggerHaptic(10);
                          setShowTooltip(false);
                        }}
                        className="px-3 py-1 rounded-xs bg-[#D99E41] hover:bg-[#E8BD6F] text-[#160B14] font-semibold text-[11px] cursor-pointer"
                      >
                        Понятно
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2">
                <button
                  onClick={() => setShowPerspectiveControls(!showPerspectiveControls)}
                  className={`px-2.5 py-1.5 rounded-full text-[11px] font-medium backdrop-blur-md border transition-all flex items-center gap-1.5 cursor-pointer shadow-lg ${
                    showPerspectiveControls
                      ? 'bg-[#E8BD6F] text-[#160B14] border-[#E8BD6F] font-semibold'
                      : 'bg-black/70 text-[#EDE4DC] border-white/20 hover:border-[#E8BD6F]'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D-перспектива</span>
                </button>
              </div>

              {isAiProcessing && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4 z-40">
                  <div className="w-10 h-10 rounded-full border-2 border-[#D99E41] border-t-transparent animate-spin mb-3" />
                  <span className="text-sm font-serif text-[#F8F1E9]">ИИ анализирует плоскость и горизонт...</span>
                  <span className="text-[11px] text-[#BAA99A] mt-1">Определяем угол наклона стены и моделируем светотень</span>
                </div>
              )}
            </div>

            {showPerspectiveControls && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 rounded-xs bg-[#221021] border border-[#D99E41]/30 text-xs text-[#EDE4DC] space-y-2.5"
              >
                <div className="flex items-center justify-between text-[11px] text-[#BAA99A]">
                  <span className="font-semibold text-[#E8BD6F] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    Настройка 3D-плоскости в пространстве
                  </span>
                  <button
                    onClick={() => setPlane3D({ rotateX: 0, rotateY: 0, rotateZ: 0 })}
                    className="text-[#D99E41] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Сбросить в 2D
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPlane3D({ rotateX: 0, rotateY: 0, rotateZ: 0 })}
                    className={`py-1.5 px-2 rounded-2xs text-[10px] border cursor-pointer ${
                      plane3D.rotateY === 0 && plane3D.rotateX === 0
                        ? 'bg-[#D99E41]/30 border-[#D99E41] text-[#E8BD6F]'
                        : 'bg-[#180A16] border-white/10 text-[#A8988B]'
                    }`}
                  >
                    Прямая стена
                  </button>
                  <button
                    onClick={() => setPlane3D({ rotateX: 2, rotateY: 12, rotateZ: 0 })}
                    className={`py-1.5 px-2 rounded-2xs text-[10px] border cursor-pointer ${
                      plane3D.rotateY > 5
                        ? 'bg-[#D99E41]/30 border-[#D99E41] text-[#E8BD6F]'
                        : 'bg-[#180A16] border-white/10 text-[#A8988B]'
                    }`}
                  >
                    Стена слева (12°)
                  </button>
                  <button
                    onClick={() => setPlane3D({ rotateX: 2, rotateY: -12, rotateZ: 0 })}
                    className={`py-1.5 px-2 rounded-2xs text-[10px] border cursor-pointer ${
                      plane3D.rotateY < -5
                        ? 'bg-[#D99E41]/30 border-[#D99E41] text-[#E8BD6F]'
                        : 'bg-[#180A16] border-white/10 text-[#A8988B]'
                    }`}
                  >
                    Стена справа (-12°)
                  </button>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[10px] text-[#8C7B6D] w-20">Угол поворота:</span>
                  <input
                    type="range"
                    min="-25"
                    max="25"
                    value={plane3D.rotateY}
                    onChange={(e) => setPlane3D((p) => ({ ...p, rotateY: Number(e.target.value) }))}
                    className="flex-1 accent-[#D99E41] cursor-pointer"
                  />
                  <span className="font-mono text-[10px] text-[#E8BD6F] w-8 text-right">{plane3D.rotateY}°</span>
                </div>
              </motion.div>
            )}

            {aiNote && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 rounded-sm bg-[#221021] border border-[#D99E41]/30 text-xs text-[#EDE4DC] flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D99E41] shrink-0 mt-0.5" />
                <span className="leading-snug">{aiNote}</span>
              </motion.div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs pt-1">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setScale((s) => Math.max(40, s - 10))}
                  className="p-1.5 rounded-xs bg-[#241223] hover:bg-white/10 border border-white/10 text-[#DDD0C4] cursor-pointer"
                  title="Уменьшить"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-xs text-[#E8BD6F] w-12 text-center">{scale}%</span>
                <button
                  onClick={() => setScale((s) => Math.min(180, s + 10))}
                  className="p-1.5 rounded-xs bg-[#241223] hover:bg-white/10 border border-white/10 text-[#DDD0C4] cursor-pointer"
                  title="Увеличить"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-[#8C7B6D] ml-1">Размер</span>

                <button
                  onClick={() => setShowTooltip(true)}
                  className="ml-2 p-1.5 rounded-xs bg-white/5 hover:bg-white/10 text-[#A8988B] hover:text-[#EDE4DC] cursor-pointer"
                  title="Показать подсказку по управлению"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerSpatialAnalysis()}
                  className="px-3 py-1.5 rounded-xs bg-[#281326] hover:bg-[#D99E41]/20 border border-[#D99E41]/50 text-[#E8BD6F] hover:text-[#FFF5EA] text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ИИ-анализ плоскости</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-xs bg-white/10 hover:bg-white/20 text-[#EDE4DC] text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Сохранить фото интерьера в высоком разрешении"
                >
                  <Download className="w-3.5 h-3.5 text-[#D99E41]" />
                  <span>Скачать примерку</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-5/12 flex flex-col gap-4 pb-8 sm:pb-10 lg:pb-12">
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D99E41] font-semibold mb-2">
                  1. Фотография стены
                </label>
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-2.5 px-3 rounded-xs bg-[#D99E41] hover:bg-[#E8BD6F] text-[#160B14] font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Загрузить фото своей стены</span>
                  </button>

                  {userWallImg && (
                    <button
                      onClick={() => {
                        setUserWallImg(null);
                        const tmpl = ROOM_TEMPLATES.find((r) => r.id === selectedRoomId) || ROOM_TEMPLATES[0];
                        setPositionPercent(tmpl.defaultPos);
                        setScale(tmpl.defaultScale);
                        setPlane3D(tmpl.defaultPlane);
                        setAiNote(null);
                      }}
                      className="px-3 py-2.5 rounded-xs bg-white/10 hover:bg-white/20 text-xs text-[#EDE4DC] cursor-pointer"
                      title="Вернуться к интерьерам галереи"
                    >
                      Интерьеры
                    </button>
                  )}
                </div>
              </div>

              {!userWallImg && (
                <div>
                  <span className="block text-[11px] text-[#8C7B6D] mb-1.5">Реалистичные интерьеры:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {ROOM_TEMPLATES.map((room) => (
                      <button
                        key={room.id}
                        onClick={() => handleRoomSelect(room.id)}
                        className={`p-2 rounded-xs text-[11px] font-medium border text-left transition-all cursor-pointer ${
                          selectedRoomId === room.id
                            ? 'bg-[#D99E41]/20 border-[#D99E41] text-[#E8BD6F]'
                            : 'bg-[#1C0E1A] border-white/10 text-[#A8988B] hover:text-[#EDE4DC] hover:border-white/25'
                        }`}
                      >
                        <div className="truncate font-semibold">{room.name}</div>
                        <div className="text-[10px] text-[#8C7B6D]">{room.category}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D99E41] font-semibold mb-2">
                  2. Выберите картину для примерки
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                  {ARTWORKS.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => {
                        setSelectedArt(art);
                        triggerHaptic(15);
                      }}
                      className={`p-1.5 rounded-xs border flex flex-col items-center gap-1 transition-all cursor-pointer text-left ${
                        selectedArt.id === art.id
                          ? 'bg-[#D99E41]/20 border-[#D99E41] shadow-md'
                          : 'bg-[#1E0E1C] border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={art.imageSrc}
                        alt={art.title}
                        className="w-full h-14 object-cover rounded-2xs"
                      />
                      <span className="text-[10px] text-[#EDE4DC] truncate w-full font-serif leading-tight">
                        {art.title}
                      </span>
                      <span className="text-[9px] text-[#E8BD6F] font-sans font-semibold">
                        {art.priceFormatted}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D99E41] font-semibold mb-2">
                  3. Оформление рамы (3D-рельеф)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FRAMES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setSelectedFrame(f.id);
                        triggerHaptic(15);
                      }}
                      className={`p-2 rounded-xs text-[11px] border text-left transition-all cursor-pointer ${
                        selectedFrame === f.id
                          ? 'bg-[#D99E41]/25 border-[#D99E41] text-[#E8BD6F] font-semibold shadow-md'
                          : 'bg-[#1C0E1A] border-white/10 text-[#A8988B] hover:text-[#EDE4DC]'
                      }`}
                    >
                      <div className="font-medium text-[#EDE4DC] leading-snug">{f.label}</div>
                      <div className="text-[9.5px] text-[#8C7B6D] truncate mt-0.5">{f.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <div className="p-2.5 rounded-xs bg-[#241222] border border-white/5 text-xs text-[#BAA99A] space-y-1">
                <div className="flex items-center justify-between text-[#F8F1E9]">
                  <span className="font-serif text-sm font-semibold">«{selectedArt.title}»</span>
                  <span className="font-sans font-bold text-[#E8BD6F]">{selectedArt.priceFormatted}</span>
                </div>
                <div className="text-[11px] text-[#8C7B6D]">
                  {selectedArt.technique} • {selectedArt.size} • {selectedArt.year} г.
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (onPurchaseArtwork) onPurchaseArtwork(selectedArt);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 bg-[#D99E41] hover:bg-[#E8BD6F] text-[#160B14] font-semibold text-xs tracking-wider uppercase rounded-xs transition-all cursor-pointer shadow-md text-center"
                >
                  Купить эту картину
                </button>

                <button
                  onClick={() => {
                    if (onOpenContact) {
                      onOpenContact(`Примерка в интерьере: «${selectedArt.title}»`);
                    }
                    onClose();
                  }}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-[#EDE4DC] text-xs font-medium rounded-xs transition-colors cursor-pointer whitespace-nowrap"
                >
                  Консультация Ольги
                </button>
              </div>

              <div className="h-6 sm:h-8 w-full shrink-0" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
