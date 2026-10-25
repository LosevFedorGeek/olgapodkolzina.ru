import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Education } from './components/Education';
import { Delivery } from './components/Delivery';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { Lightbox } from './components/Lightbox';
import { CartModal } from './components/CartModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { ArtCursor } from './components/ArtCursor';
import { PrivacyPolicyModal, TermsModal } from './components/LegalModals';
import { CookieConsent } from './components/CookieConsent';
import { INITIAL_ARTWORKS, INITIAL_SERVICES } from './data/artworks';
import { Artwork, InquiryData, CartItem, ServiceItem } from './types';

export function App() {
  const [artworks] = useState<Artwork[]>(INITIAL_ARTWORKS);
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('olga_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [currentInquiry, setCurrentInquiry] = useState<InquiryData | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('olga_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const handleOpenContact = (topic?: string) => {
    setCurrentInquiry({
      type: 'general',
      itemTitle: topic || 'Индивидуальный заказ или консультация'
    });
    setIsModalOpen(true);
  };

  const handleAddToCartArtwork = (artwork: Artwork) => {
    setCart((prev) => {
      if (prev.some((i) => i.id === artwork.id)) return prev;
      return [
        ...prev,
        {
          id: artwork.id,
          type: 'artwork',
          title: `Картина «${artwork.title}»`,
          technique: artwork.technique,
          size: artwork.size,
          price: artwork.price ?? 0,
          priceFormatted: artwork.priceFormatted,
          imageSrc: artwork.imageSrc
        }
      ];
    });
    setIsCartOpen(true);
  };

  const handleAddToCartService = (service: ServiceItem) => {
    const numericPrice = parseInt(service.price.replace(/\D/g, ''), 10) || 0;
    setCart((prev) => {
      if (prev.some((i) => i.id === service.id)) return prev;
      return [
        ...prev,
        {
          id: service.id,
          type: 'masterclass',
          title: service.title,
          technique: service.period,
          price: numericPrice,
          priceFormatted: service.price
        }
      ];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handlePurchaseArtwork = (artwork: Artwork) => {
    setSelectedArtwork(null);
    handleAddToCartArtwork(artwork);
  };

  const handleRegisterCourse = (courseTitle: string, price: string) => {
    setCurrentInquiry({
      type: 'masterclass',
      itemTitle: courseTitle,
      price: price
    });
    setIsModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#180E17] text-[#EDE4DC] flex flex-col selection:bg-[#D99E41]/30 selection:text-[#FFF5EA]">
      <ArtCursor />
      <ScrollProgressBar />

      <Header
        onOpenContact={handleOpenContact}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cart.length}
      />

      <main className="flex-grow">
        <Hero
          artworks={artworks}
          onExploreGallery={() => scrollToSection('#gallery')}
          onExploreEducation={() => scrollToSection('#education')}
          onSelectArtwork={(art) => setSelectedArtwork(art)}
          onPurchaseArtwork={handlePurchaseArtwork}
        />

        <Gallery
          artworks={artworks}
          onSelectArtwork={(art) => setSelectedArtwork(art)}
          onPurchaseArtwork={handlePurchaseArtwork}
          onAddToCart={handleAddToCartArtwork}
          onCommissionRequest={() => handleOpenContact('Индивидуальный заказ авторского полотна')}
        />

        <About />

        <Education
          services={services}
          onRegister={handleRegisterCourse}
          onAddToCart={handleAddToCartService}
        />

        <Delivery />

        <FAQ />
      </main>

      <Footer
        onOpenContact={handleOpenContact}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

      <Lightbox
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onPurchase={handlePurchaseArtwork}
        onNavigate={(art) => setSelectedArtwork(art)}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiry={currentInquiry}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        onSwitchToOther={() => {
          setIsPrivacyOpen(false);
          setIsTermsOpen(true);
        }}
      />

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onSwitchToOther={() => {
          setIsTermsOpen(false);
          setIsPrivacyOpen(true);
        }}
      />

      <CookieConsent onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      <ScrollToTopButton />
    </div>
  );
}

export default App;
