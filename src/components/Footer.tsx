import React from 'react';
import { Phone, Mail, MapPin, Laptop, ArrowRight } from 'lucide-react';
import { ARTIST_CONTACTS } from '../data/artworks';
import { SocialIconGroup } from './SocialIconGroup';

interface FooterProps {
  onOpenContact: (topic?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer id="contacts" className="relative bg-[#0C050B] text-[#DDD0C4] border-t border-white/10 pt-7 sm:pt-9 pb-4 sm:pb-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 sm:pb-5 border-b border-white/10 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif text-[#F8F1E9] tracking-tight">
              {ARTIST_CONTACTS.name}
            </h2>
            <p className="text-[11px] uppercase tracking-widest text-[#D99E41] mt-0.5 font-medium">
              Авторская живопись и графика
            </p>
          </div>

          <button
            onClick={() => onOpenContact('Оставить заявку')}
            className="h-10 px-5 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#160B14] bg-[#D99E41] hover:bg-[#E8BD6F] active:scale-[0.98] transition-all rounded-sm cursor-pointer shadow-md hover:shadow-lg hover:shadow-[#D99E41]/25 shimmer-btn interactive-action-btn whitespace-nowrap w-full sm:w-auto"
          >
            <span>ОСТАВИТЬ ЗАЯВКУ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5 border-b border-white/10">
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#D99E41] font-semibold">
              СВЯЗЬ С ХУДОЖНИКОМ
            </h3>
            <div className="space-y-2.5 text-xs text-[#BAA99A]">
              <div>
                <a
                  href={`tel:${ARTIST_CONTACTS.phoneRaw}`}
                  className="text-sm sm:text-base font-sans font-bold text-[#F8F1E9] hover:text-[#D99E41] transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#D99E41] shrink-0" />
                  <span>{ARTIST_CONTACTS.phone}</span>
                </a>
                <span className="text-[11px] text-[#8C7A6D] block pl-6">
                  Звонки, Telegram, MAX
                </span>
              </div>

              <div>
                <a
                  href={`mailto:${ARTIST_CONTACTS.email}`}
                  className="inline-flex items-center gap-2 hover:text-[#E8BD6F] transition-colors text-xs text-[#EDE4DC] pl-0.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D99E41] shrink-0" />
                  <span>{ARTIST_CONTACTS.email}</span>
                </a>
              </div>

              <div className="pt-1">
                <SocialIconGroup size="sm" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#D99E41] font-semibold">
              МАСТЕРСКАЯ
            </h3>
            <div className="space-y-2.5 text-xs text-[#BAA99A]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D99E41] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#EDE4DC] font-medium text-sm">Вологодская область</div>
                  <div className="text-[#8E7E72] text-xs">Бабаевский район, г. Бабаево</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Laptop className="w-4 h-4 text-[#D99E41] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#EDE4DC] font-medium text-sm">Очно и онлайн по всей России</div>
                  <div className="text-[#8E7E72] text-xs">Индивидуальные занятия и мастер-классы</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 sm:pt-5 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-3.5 text-xs text-[#8E7E72] pb-1">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-center lg:text-left">
            <span className="whitespace-nowrap">© 2026 Ольга Подколзина. Все права защищены.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-[#9B8C80] text-[11px] whitespace-nowrap">
              Бабаево · Вологодская область
            </span>
          </div>

          <div className="shrink-0 flex items-center">
            <a
              href="https://theodorelosev.ru"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Сайт разработчика Theodore Losev"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#220F1F] border border-[#D99E41]/35 hover:border-[#D99E41] hover:bg-[#220F1F]/60 hover:backdrop-blur-md hover:shadow-[0_0_18px_rgba(217,158,65,0.3)] text-[#EDE4DC] shadow-sm transition-all duration-300 group cursor-pointer whitespace-nowrap"
            >
              <span className="text-[#A8988B] group-hover:text-[#EDE4DC] transition-colors whitespace-nowrap text-xs">
                Дизайн и разработка сайта:
              </span>
              <span className="text-[#E8BD6F] group-hover:text-[#FFD88D] font-medium tracking-wide underline sm:no-underline sm:group-hover:underline transition-colors whitespace-nowrap text-xs">
                Theodore Losev
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
