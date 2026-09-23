import React from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { ARTIST_CONTACTS } from '../data/artworks';

interface SocialIconGroupProps {
  size?: 'sm' | 'md';
}

export const SocialIconGroup: React.FC<SocialIconGroupProps> = ({ size = 'md' }) => {
  const boxClasses =
    size === 'sm'
      ? 'w-10 h-10'
      : 'w-11 h-11';

  return (
    <div className="flex items-center gap-2.5">
      <a
        href={ARTIST_CONTACTS.telegramUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Telegram Ольги Подколзиной"
        className={`group relative ${boxClasses} rounded-sm bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer glimmer-social shrink-0`}
      >
        <Send className="w-5 h-5 text-[#D99E41] group-hover:text-[#FFF5EA] group-hover:scale-110 transition-all duration-300 ease-out" />
      </a>

      <a
        href={ARTIST_CONTACTS.maxUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="MAX мессенджер Ольги Подколзиной"
        className={`group relative ${boxClasses} rounded-sm bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer glimmer-social shrink-0`}
      >
        <MessageCircle className="w-5 h-5 text-[#D99E41] group-hover:text-[#FFF5EA] group-hover:scale-110 transition-all duration-300 ease-out" />
      </a>

      <a
        href={ARTIST_CONTACTS.vkUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="ВКонтакте Ольги Подколзиной"
        className={`group relative ${boxClasses} rounded-sm bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer glimmer-social shrink-0`}
      >
        <svg
          viewBox="3 6.5 18.5 13"
          className="w-5 h-5 fill-[#D99E41] group-hover:fill-[#FFF5EA] group-hover:scale-110 transition-all duration-300 ease-out"
        >
          <path d="M12.78 18.5c-5.4 0-8.5-3.7-8.63-9.87h2.7c.1 4.53 2.1 6.44 3.67 6.84V8.63h2.56v3.9c1.53-.17 3.13-1.95 3.67-3.9h2.55a7.38 7.38 0 0 1-3.4 4.93c2.22.26 4.18 2.15 4.56 4.94h-2.8c-.45-2.15-2.1-3.8-4.08-3.87v3.87h-.8z" />
        </svg>
      </a>
    </div>
  );
};
