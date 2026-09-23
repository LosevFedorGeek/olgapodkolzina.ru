import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { AdminFloatingBadge } from './components/AdminFloatingBadge';
import { GeminiArtAdvisor } from './components/GeminiArtAdvisor';
import { ArtCursor } from './components/ArtCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { Artwork, InquiryData, CartItem, ServiceItem } from './types';
import { getStoredArtworks, saveStoredArtworks, getStoredServices, saveStoredServices } from './data/artworks';

const Gallery = lazy(() => import('./components/Gallery').then((m) => ({ default: m.Gallery })));
const Education = lazy(() => import('./components/Education').then((m) => ({ default: m.Education })));
const Delivery = lazy(() => import('./components/Delivery').then((m) => ({ default: m.Delivery })));
const FAQ = lazy(() => import('./components/FAQ').then((m) => ({ default: m.FAQ })));
const Modal = lazy(() => import('./components/Modal').then((m) => ({ default: m.Modal })));
const Lightbox = lazy(() => import('./components/Lightbox').then((m) => ({ default: m.Lightbox })));
const CartModal = lazy(() => import('./components/CartModal').then((m) => ({ default: m.CartModal })));
const AdminModal = lazy(() => import('./components/AdminModal').then((m) => ({ default: m.AdminModal })));

export function App() {
  const [artworks, setArtworks] = useState<Artwork[]>(() => getStoredArtworks());
  const [services, setServices] = useState<ServiceItem[]>(() => getStoredServices());

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
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthorized, setIsAdminAuthorized] = useState<boolean>(() => {
    try {
      return (
        localStorage.getItem('olga_admin_authorized') === 'true' ||
        sessionStorage.getItem('podkolzina_admin_session') === 'true'
      );
    } catch {
      return false;
    }
  });

  const [inquiryData, setInquiryData] = useState<InquiryData | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('podkolzina_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.altKey && (e.key === 'a' || e.key === 'A' || e.key === 'ф' || e.key === 'Ф')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A' || e.key === 'ф' || e.key === 'Ф'))
      ) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    const checkUrlTriggers = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin')) {
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', checkUrlTriggers);
    checkUrlTriggers();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkUrlTriggers);
    };
  }, []);

  const handleUpdateArtworks = (newArtworks: Artwork[]) => {
    setArtworks(newArtworks);
    saveStoredArtworks(newArtworks);
  };

  const handleUpdateServices = (newServices: ServiceItem[]) => {
    setServices(newServices);
    saveStoredServices(newServices);
  };

  const handleOpenContact = (topic?: string) => {
    setInquiryData({
      type: 'general',
      itemTitle: topic || 'Общий запрос / Консультация'
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
        onOpenAdmin={() => setIsAdminOpen(true)}
        cartCount={cartItems.length}
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

      <AdminFloatingBadge
        isAuthorized={isAdminAuthorized}
        onOpen={() => setIsAdminOpen(true)}
      />

      <Suspense fallback={null}>
        {selectedArtwork && (
          <Lightbox
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
            onPurchase={handlePurchaseArtwork}
            onNavigate={setSelectedArtwork}
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

        {isAdminOpen && (
          <AdminModal
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            artworks={artworks}
            onUpdateArtworks={handleUpdateArtworks}
            services={services}
            onUpdateServices={handleUpdateServices}
            onAuthChange={(isAuth) => setIsAdminAuthorized(isAuth)}
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
