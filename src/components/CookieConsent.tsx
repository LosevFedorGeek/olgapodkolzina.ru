import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem('olga_cookie_accepted');
      if (!accepted) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('olga_cookie_accepted', 'true');
    } catch {
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Уведомление об использовании cookie"
      className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-6 sm:bottom-6 z-40 sm:max-w-md animate-fade-in"
    >
      <div className="flex items-center justify-between gap-3 bg-[#160916]/95 backdrop-blur-xl border border-white/12 hover:border-[#D99E41]/40 rounded-xl sm:rounded-full px-3.5 py-2.5 sm:px-4 sm:py-2 shadow-[0_12px_36px_rgba(0,0,0,0.6)] text-[#EDE4DC] transition-colors">
        <div className="flex items-center gap-2.5 min-w-0">
          <Cookie className="w-4 h-4 text-[#D99E41] shrink-0" />
          <p className="text-[11.5px] leading-snug text-[#C4B4A5] truncate sm:whitespace-normal">
            Используем cookie для работы сайта и корзины.{' '}
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-[#E8BD6F] underline hover:text-[#FFD88D] cursor-pointer inline-block"
            >
              152-ФЗ
            </button>
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleAccept}
            className="h-7 px-3 bg-[#D99E41] hover:bg-[#E8BD6F] active:scale-[0.98] text-[#160B14] font-semibold text-[11px] uppercase tracking-wider rounded-full cursor-pointer transition-all whitespace-nowrap shadow-sm"
          >
            Принять
          </button>
          <button
            type="button"
            onClick={handleAccept}
            aria-label="Закрыть уведомление"
            className="w-7 h-7 inline-flex items-center justify-center text-[#8C7A6D] hover:text-[#EDE4DC] rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
