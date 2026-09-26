import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, ShoppingBag } from 'lucide-react';
import { ARTIST_CONTACTS } from '../data/artworks';
import { SocialIconGroup } from './SocialIconGroup';

interface HeaderProps {
  onOpenContact: (topic?: string) => void;
  onOpenCart: () => void;
  cartCount: number;
  onOpenFitting?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, onOpenCart, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Галерея', href: '#gallery' },
    { label: 'Об авторе', href: '#about' },
    { label: 'Обучение', href: '#education' },
    { label: 'Доставка', href: '#delivery' },
    { label: 'Контакты', href: '#contacts' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#180E17]/95 backdrop-blur-md py-3.5 border-b border-[#D99E41]/20 shadow-xl shadow-black/50'
            : 'bg-transparent py-5 sm:py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a
              href="#"
              onClick={handleLogoClick}
              className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#F3E8DB] tracking-wide hover:text-[#D99E41] transition-colors whitespace-nowrap cursor-pointer shrink-0 select-none"
            >
              {ARTIST_CONTACTS.name}
            </a>

            <nav className="hidden xl:flex items-center gap-7 2xl:gap-9 text-sm text-[#D7C7B9] font-medium tracking-wide">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="relative py-1 hover:text-[#E8BD6F] transition-colors group cursor-pointer whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D99E41] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden lg:flex items-center pr-1">
                <SocialIconGroup size="sm" />
              </div>

              <button
                onClick={onOpenCart}
                aria-label="Корзина"
                className="relative h-10 sm:h-11 px-3 sm:px-4 text-[#EDE4DC] hover:text-[#D99E41] bg-white/5 hover:bg-white/10 rounded-sm border border-white/10 hover:border-[#D99E41]/50 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 interactive-action-btn shrink-0"
              >
                <ShoppingBag className="w-4 h-4 text-[#D99E41]" />
                <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-[#EDE4DC]">
                  Корзина
                </span>
                {cartCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#D99E41] text-[#160B14] font-bold text-[11px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onOpenContact('Индивидуальный заказ и консультация')}
                className="hidden md:inline-flex h-11 px-5 lg:px-6 items-center justify-center text-xs font-semibold uppercase tracking-wider text-[#1A0E18] bg-[#D99E41] hover:bg-[#E8BD6F] active:scale-[0.98] transition-all duration-200 rounded-sm shadow-md hover:shadow-lg hover:shadow-[#D99E41]/25 cursor-pointer whitespace-nowrap shimmer-btn interactive-action-btn shrink-0"
              >
                НАПИСАТЬ
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={isMobileMenuOpen}
                className="xl:hidden h-10 w-10 sm:h-11 sm:w-11 text-[#EDE4DC] hover:text-[#D99E41] bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-colors cursor-pointer flex items-center justify-center shrink-0"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 xl:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />

        <div
          className={`absolute top-0 right-0 w-[85%] max-w-[360px] h-full bg-[#1b0e19] border-l border-[#D99E41]/25 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <span className="font-serif text-xl text-[#F3E8DB]">Навигация</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#C8B8A8] hover:text-[#D99E41] transition-colors cursor-pointer"
                aria-label="Закрыть меню"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="flex items-center justify-between py-2.5 text-base text-[#E8BD6F] font-semibold border-b border-white/5 transition-colors text-left cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Корзина ({cartCount})</span>
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </button>

              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center justify-between py-2.5 text-base text-[#EDE4DC] hover:text-[#D99E41] border-b border-white/5 transition-colors text-left cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-center py-2">
              <SocialIconGroup size="sm" />
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContact('Индивидуальный заказ и консультация');
              }}
              className="h-11 w-full flex items-center justify-center text-xs font-semibold uppercase tracking-wider text-[#1A0E18] bg-[#D99E41] hover:bg-[#E8BD6F] transition-colors rounded-sm shadow-md shimmer-btn cursor-pointer interactive-action-btn"
            >
              НАПИСАТЬ ХУДОЖНИКУ
            </button>

            <div className="flex items-center justify-center text-xs text-[#9B897C] pt-2">
              <a href={`tel:${ARTIST_CONTACTS.phoneRaw}`} className="flex items-center gap-1.5 hover:text-[#EDE4DC] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#D99E41]" />
                <span>{ARTIST_CONTACTS.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
