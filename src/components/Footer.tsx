import React from 'react';
import { Phone, Mail, MapPin, Laptop, ArrowRight } from 'lucide-react';
import { ARTIST_CONTACTS } from '../data/artworks';
import { SocialIconGroup } from './SocialIconGroup';

interface FooterProps {
  onOpenContact: (topic?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer id="contacts" className="relative bg-[#0C050B] text-[#DDD0C4] border-t border-white/10 pt-12 sm:pt-14 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-10 border-b border-white/10 gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F8F1E9] tracking-tight">
              {ARTIST_CONTACTS.name}
            </h2>
            <p className="text-xs uppercase tracking-widest text-[#D99E41] mt-1 font-medium">
              Авторская живопись и графика
            </p>
          </div>

          <button
            onClick={() => onOpenContact('Оставить заявку')}
            className="h-11 px-6 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#160B14] bg-[#D99E41] hover:bg-[#E8BD6F] active:scale-[0.98] transition-all rounded-sm cursor-pointer shadow-md hover:shadow-lg hover:shadow-[#D99E41]/25 shimmer-btn interactive-action-btn whitespace-nowrap w-full sm:w-auto"
          >
            <span>ОСТАВИТЬ ЗАЯВКУ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 border-b border-white/10">
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#D99E41] font-semibold">
              СВЯЗЬ С ХУДОЖНИКОМ
            </h3>
            <div className="space-y-3 text-xs text-[#BAA99A]">
              <div>
                <a
                  href={`tel:${ARTIST_CONTACTS.phoneRaw}`}
                  className="text-base sm:text-lg font-sans font-bold text-[#F8F1E9] hover:text-[#D99E41] transition-colors inline-flex items-center gap-2"
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

              <div className="pt-2">
                <SocialIconGroup size="sm" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#D99E41] font-semibold">
              МАСТЕРСКАЯ
            </h3>
            <div className="space-y-3 text-xs text-[#BAA99A]">
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

        <div className="pt-6 text-center sm:text-left text-xs text-[#7A6B5F]">
          <span>© 2026 Ольга Подколзина. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
};
