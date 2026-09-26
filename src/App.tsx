import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { GeminiArtAdvisor } from './components/GeminiArtAdvisor';
import { ArtCursor } from './components/ArtCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { Artwork, InquiryData, CartItem, ServiceItem } from './types';
import { ARTWORKS, INITIAL_SERVICES } from './data/artworks';

const Gallery = lazy(() => import('./components/Gallery').then((m) => ({ default: m.Gallery })));
const Education = lazy(() => import('./components/Education').then((m) => ({ default: m.Education })));
const Delivery = lazy(() => import('./components/Delivery').then((m) => ({ default: m.Delivery })));
const FAQ = lazy(() => import('./components/FAQ').then((m) => ({ default: m.FAQ })));
const Modal = lazy(() => import('./components/Modal').then((m) => ({ default: m.Modal })));
const Lightbox = lazy(() => import('./components/Lightbox').then((m) => ({ default: m.Lightbox })));
const CartModal = lazy(() => import('./components/CartModal').then((m) => ({ default: m.CartModal })));
const InteriorFittingModal = lazy(() => import('./components/InteriorFittingModal').then((m) => ({ default: m.InteriorFittingModal })));

export function App() {
  const [artworks] = useState<Artwork[]>(ARTWORKS);
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('podkolzina_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFittingOpen, setIsFittingOpen] = useState(false);
  const [fittingArtwork, setFittingArtwork] = useState<Artwork | null>(null);
  const [inquiryData, setInquiryData] = useState<InquiryData | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('podkolzina_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const handleOpenFitting = (art?: Artwork) => {
    setFittingArtwork(art || artworks[0]);
    setIsFittingOpen(true);
  };

  const handleOpenContact = (topic?: string) => {
    setInquiryData({
      type: 'general',
      itemTitle: topic || 'Общий запрос / Консультация'
    });
    setIsModalOpen(true);
  };

  const handleCommissionRequest = () => {
    setInquiryData({
      type: 'commission',
      itemTitle: 'Индивидуальный заказ картины'
    });
    setIsModalOpen(true);
  };

  const handleSelectArtwork = (art: Artwork) => {
    setSelectedArtwork(art);
  };

  const handleAddToCart = (art: Artwork) => {
    const existing = cartItems.find((i) => i.id === art.id);
    if (!existing) {
      const newItem: CartItem = {
        id: art.id,
        title: art.title,
        price: art.price || 0,
        priceFormatted: art.priceFormatted,
        technique: art.technique,
        size: art.size,
        imageSrc: art.imageSrc,
        type: 'artwork'
      };
      setCartItems((prev) => [...prev, newItem]);
    }
    setIsCartOpen(true);
  };

  const handleAddServiceToCart = (service: ServiceItem) => {
    const numPrice = parseInt(service.price.replace(/\D/g, ''), 10) || 0;
    const newItem: CartItem = {
      id: service.id,
      title: service.title,
      price: numPrice,
      priceFormatted: service.price,
      type: 'masterclass'
    };
    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handlePurchaseArtwork = (art: Artwork) => {
    handleAddToCart(art);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleRegisterEducation = (courseTitle: string, price: string) => {
    setInquiryData({
      type: 'masterclass',
      itemTitle: `Запись: «${courseTitle}»`,
      price: price
    });
    setIsModalOpen(true);
  };

  const handleHeroExploreGallery = () => {
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const handleHeroOpenEducation = () => {
    const el = document.getElementById('education');
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#180E17] text-[#EDE4DC] flex flex-col selection:bg-[#D99E41]/30 selection:text-[#FFF5EA] overflow-x-hidden">
      <ScrollProgressBar />
      <ArtCursor />

      <Header
        onOpenContact={handleOpenContact}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        onOpenFitting={() => handleOpenFitting()}
      />

      <main className="flex-grow">
        <Hero
          artworks={artworks}
          onExploreGallery={handleHeroExploreGallery}
          onExploreEducation={handleHeroOpenEducation}
          onSelectArtwork={handleSelectArtwork}
          onPurchaseArtwork={handlePurchaseArtwork}
        />
        <About />

        <Suspense
          fallback={
            <div className="py-24 text-center text-[#D99E41] font-serif text-lg animate-pulse">
              Загрузка коллекции живописи...
            </div>
          }
        >
          <Gallery
            artworks={artworks}
            onSelectArtwork={handleSelectArtwork}
            onPurchaseArtwork={handlePurchaseArtwork}
            onAddToCart={handleAddToCart}
            onCommissionRequest={handleCommissionRequest}
            onOpenFitting={handleOpenFitting}
          />
          <Education
            services={services}
            onRegister={handleRegisterEducation}
            onAddToCart={handleAddServiceToCart}
          />
          <Delivery />
          <FAQ />
        </Suspense>
      </main>

      <Footer onOpenContact={handleOpenContact} />

      <GeminiArtAdvisor />

      <Suspense fallback={null}>
        {selectedArtwork && (
          <Lightbox
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
            onPurchase={handlePurchaseArtwork}
            onNavigate={setSelectedArtwork}
            onOpenFitting={handleOpenFitting}
          />
        )}

        {isCartOpen && (
          <CartModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
          />
        )}

        {isFittingOpen && (
          <InteriorFittingModal
            isOpen={isFittingOpen}
            onClose={() => setIsFittingOpen(false)}
            initialArtwork={fittingArtwork}
            onPurchaseArtwork={handlePurchaseArtwork}
            onOpenContact={handleOpenContact}
          />
        )}

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            inquiry={inquiryData}
          />
        )}
      </Suspense>

      <ScrollToTopButton />
    </div>
  );
}

export default App;
