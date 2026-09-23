import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, Copy, RotateCcw, Upload, Lock, LogOut, KeyRound, ShieldAlert } from 'lucide-react';
import { Artwork, ServiceItem } from '../types';
import { ARTWORKS, INITIAL_SERVICES } from '../data/artworks';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  artworks: Artwork[];
  onUpdateArtworks: (artworks: Artwork[]) => void;
  services: ServiceItem[];
  onUpdateServices: (services: ServiceItem[]) => void;
  onAuthChange?: (isAuth: boolean) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  artworks,
  onUpdateArtworks,
  services,
  onUpdateServices,
  onAuthChange
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return (
        localStorage.getItem('olga_admin_authorized') === 'true' ||
        sessionStorage.getItem('podkolzina_admin_session') === 'true'
      );
    } catch {
      return false;
    }
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  const [newPassword, setNewPassword] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState(false);

  const [activeTab, setActiveTab] = useState<'artworks' | 'services' | 'export' | 'security'>('artworks');
  const [copySuccess, setCopySuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [newArt, setNewArt] = useState({
    title: '',
    technique: 'Холст, масло',
    size: '50х60 см',
    price: '45000',
    inStock: true,
    category: 'watercolor' as 'watercolor' | 'graphics',
    year: '2024',
    description: '',
    imageSrc: ''
  });

  const [newService, setNewService] = useState({
    title: '',
    price: '4 000 ₽',
    period: '/ занятие (2 часа)',
    desc: '',
    badge: 'Новая программа'
  });

  useEffect(() => {
    try {
      const lockUntil = parseInt(localStorage.getItem('podkolzina_lock_until') || '0', 10);
      const remaining = Math.max(0, Math.ceil((lockUntil - Date.now()) / 1000));
      setLockoutSeconds(remaining);
    } catch {}
  }, [isOpen]);

  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          try {
            localStorage.removeItem('podkolzina_lock_until');
            localStorage.removeItem('podkolzina_failed_attempts');
          } catch {}
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  if (!isOpen) return null;

  const getSavedPassword = () => {
    try {
      return localStorage.getItem('podkolzina_admin_pin') || '2026';
    } catch {
      return '2026';
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    const correctPass = getSavedPassword();
    if (passwordInput.trim() === correctPass) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('podkolzina_admin_session', 'true');
        if (rememberDevice) {
          localStorage.setItem('olga_admin_authorized', 'true');
        }
        localStorage.removeItem('podkolzina_failed_attempts');
        localStorage.removeItem('podkolzina_lock_until');
      } catch {}
      setAuthError('');
      setPasswordInput('');
      if (onAuthChange) onAuthChange(true);
    } else {
      try {
        const attempts = parseInt(localStorage.getItem('podkolzina_failed_attempts') || '0', 10) + 1;
        localStorage.setItem('podkolzina_failed_attempts', attempts.toString());
        if (attempts >= 3) {
          const lockTime = Date.now() + 5 * 60 * 1000;
          localStorage.setItem('podkolzina_lock_until', lockTime.toString());
          setLockoutSeconds(300);
          setAuthError('Превышено число попыток. Вход заблокирован на 5 минут.');
        } else {
          setAuthError(`Неверный мастер-пароль. Осталось попыток: ${3 - attempts}`);
        }
      } catch {
        setAuthError('Неверный мастер-пароль.');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('podkolzina_admin_session');
      localStorage.removeItem('olga_admin_authorized');
    } catch {}
    if (onAuthChange) onAuthChange(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    try {
      localStorage.setItem('podkolzina_admin_pin', newPassword.trim());
      setPassChangeSuccess(true);
      setNewPassword('');
      setTimeout(() => setPassChangeSuccess(false), 3000);
    } catch {}
  };

  const handleAddArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArt.title.trim()) return;

    const numPrice = newArt.price ? parseInt(newArt.price.replace(/\D/g, ''), 10) : null;
    const priceFormatted = newArt.inStock
      ? numPrice
        ? `${numPrice.toLocaleString('ru-RU')} ₽`
        : 'По запросу'
      : 'В частной коллекции';

    const item: Artwork = {
      id: `art-${Date.now()}`,
      title: newArt.title.trim(),
      technique: newArt.technique,
      size: newArt.size,
      price: newArt.inStock ? numPrice : null,
      priceFormatted,
      inStock: newArt.inStock,
      category: newArt.category,
      year: newArt.year || new Date().getFullYear().toString(),
      description: newArt.description.trim() || 'Оригинальное авторское произведение Ольги Подколзиной.',
      imageSrc: newArt.imageSrc.trim() || undefined
    };

    const updated = [item, ...artworks];
    onUpdateArtworks(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);

    setNewArt({
      title: '',
      technique: 'Холст, масло',
      size: '50х60 см',
      price: '45000',
      inStock: true,
      category: 'watercolor',
      year: '2024',
      description: '',
      imageSrc: ''
    });
  };

  const handleDeleteArtwork = (id: string) => {
    if (confirm('Удалить эту картину из каталога?')) {
      const updated = artworks.filter((a) => a.id !== id);
      onUpdateArtworks(updated);
    }
  };

  const handleToggleStock = (id: string) => {
    const updated = artworks.map((art) => {
      if (art.id === id) {
        const nextInStock = !art.inStock;
        return {
          ...art,
          inStock: nextInStock,
          priceFormatted: nextInStock
            ? art.price
              ? `${art.price.toLocaleString('ru-RU')} ₽`
              : 'По запросу'
            : 'В частной коллекции'
        };
      }
      return art;
    });
    onUpdateArtworks(updated);
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title.trim()) return;

    const item: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: newService.title.trim(),
      price: newService.price,
      period: newService.period,
      desc: newService.desc.trim() || 'Индивидуальная программа занятий с Ольгой Подколзиной.',
      badge: newService.badge
    };

    const updated = [...services, item];
    onUpdateServices(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);

    setNewService({
      title: '',
      price: '4 000 ₽',
      period: '/ занятие (2 часа)',
      desc: '',
      badge: 'Новая программа'
    });
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Удалить эту программу обучения?')) {
      const updated = services.filter((s) => s.id !== id);
      onUpdateServices(updated);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Сбросить весь каталог к изначальным авторским произведениям из макета?')) {
      onUpdateArtworks(ARTWORKS);
      onUpdateServices(INITIAL_SERVICES);
      try {
        localStorage.removeItem('podkolzina_artworks');
        localStorage.removeItem('podkolzina_services');
      } catch {}
      alert('Каталог успешно восстановлен до эталонного состояния.');
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setNewArt((prev) => ({ ...prev, imageSrc: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyCode = () => {
    const code = `export const ARTWORKS = ${JSON.stringify(artworks, null, 2)};`;
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#1B0E19] border border-[#D99E41]/30 rounded-sm shadow-2xl overflow-hidden my-auto">
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#241322]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#D99E41]" />
            <h3 className="font-serif text-xl sm:text-2xl text-[#F8F1E9] tracking-wide">
              {isAuthenticated ? 'Панель управления каталогом' : 'Безопасный доступ автора'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                title="Выйти из режима автора"
                className="p-2 text-[#BAA99A] hover:text-[#E8BD6F] transition-colors rounded-sm hover:bg-white/5 cursor-pointer flex items-center gap-1.5 text-xs"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Выйти</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-[#BAA99A] hover:text-[#EDE4DC] transition-colors rounded-sm hover:bg-white/5 cursor-pointer"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-[#D99E41]/15 text-[#E8BD6F] flex items-center justify-center mx-auto mb-6 border border-[#D99E41]/30">
              <Lock className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-serif text-[#FBF5ED] mb-2">
              Вход для автора и администратора
            </h4>
            <p className="text-xs text-[#BBA99A] mb-6 leading-relaxed">
              Вход защищен от перебора. Введите мастер-пароль для управления картинами, ценами и выставками.
            </p>

            {lockoutSeconds > 0 ? (
              <div className="p-4 rounded-sm bg-red-950/60 border border-red-500/40 text-red-200 text-sm flex items-center gap-3 text-left mb-6">
                <ShieldAlert className="w-6 h-6 shrink-0 text-red-400" />
                <div>
                  <div className="font-semibold">Доступ временно заблокирован</div>
                  <div className="text-xs text-red-300 mt-0.5">
                    Повторите через {Math.floor(lockoutSeconds / 60)} мин {lockoutSeconds % 60} сек.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D99E41] mb-2">
                    Мастер-пароль
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Введите пароль доступа"
                    className="w-full px-4 py-3 bg-[#120810] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] rounded-sm outline-none text-sm transition-colors"
                    autoFocus
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#BAA99A]">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="accent-[#D99E41] rounded-xs"
                  />
                  <span>Запомнить на этом устройстве (не спрашивать пароль снова)</span>
                </label>

                {authError && (
                  <div className="text-xs text-red-400 font-medium">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#160B14] bg-[#D99E41] hover:bg-[#E8BD6F] transition-colors rounded-sm shimmer-btn cursor-pointer shadow-md"
                >
                  ВОЙТИ В ПАНЕЛЬ
                </button>
              </form>
            )}
          </div>
        ) : (
          <div>
            <div className="px-6 border-b border-white/10 flex items-center gap-3 sm:gap-6 bg-[#160B14] overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('artworks')}
                className={`py-3.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'artworks'
                    ? 'border-[#D99E41] text-[#E8BD6F]'
                    : 'border-transparent text-[#9C8B7D] hover:text-[#EDE4DC]'
                }`}
              >
                Картины ({artworks.length})
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`py-3.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'services'
                    ? 'border-[#D99E41] text-[#E8BD6F]'
                    : 'border-transparent text-[#9C8B7D] hover:text-[#EDE4DC]'
                }`}
              >
                Услуги и МК ({services.length})
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className={`py-3.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'export'
                    ? 'border-[#D99E41] text-[#E8BD6F]'
                    : 'border-transparent text-[#9C8B7D] hover:text-[#EDE4DC]'
                }`}
              >
                Резервная копия
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-3.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'border-[#D99E41] text-[#E8BD6F]'
                    : 'border-transparent text-[#9C8B7D] hover:text-[#EDE4DC]'
                }`}
              >
                Безопасность
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto">
              {saveSuccess && (
                <div className="mb-6 p-3 rounded-sm bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Изменения сохранены и сразу отображаются на сайте!</span>
                </div>
              )}

              {activeTab === 'artworks' && (
                <div className="space-y-8">
                  <form onSubmit={handleAddArtwork} className="p-5 rounded-sm bg-[#22121F] border border-white/10 space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#E8BD6F] flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Добавить новую картину в галерею
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                          Название полотна *
                        </label>
                        <input
                          type="text"
                          required
                          value={newArt.title}
                          onChange={(e) => setNewArt({ ...newArt, title: e.target.value })}
                          placeholder="Например: Цветущий яблоневый сад"
                          className="w-full px-3 py-2 bg-[#140912] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] text-xs rounded-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                          Техника исполнения
                        </label>
                        <input
                          type="text"
                          value={newArt.technique}
                          onChange={(e) => setNewArt({ ...newArt, technique: e.target.value })}
                          placeholder="Бумага, акварель / Холст, масло"
                          className="w-full px-3 py-2 bg-[#140912] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] text-xs rounded-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                          Размер полотна
                        </label>
                        <input
                          type="text"
                          value={newArt.size}
                          onChange={(e) => setNewArt({ ...newArt, size: e.target.value })}
                          placeholder="Например: 40х50 см"
                          className="w-full px-3 py-2 bg-[#140912] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] text-xs rounded-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                          Цена (в рублях)
                        </label>
                        <input
                          type="text"
                          value={newArt.price}
                          onChange={(e) => setNewArt({ ...newArt, price: e.target.value })}
                          placeholder="45000"
                          className="w-full px-3 py-2 bg-[#140912] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] text-xs rounded-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                          Категория
                        </label>
                        <select
                          value={newArt.category}
                          onChange={(e) => setNewArt({ ...newArt, category: e.target.value as any })}
                          className="w-full px-3 py-2 bg-[#140912] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] text-xs rounded-sm outline-none"
                        >
                          <option value="watercolor">Акварель и живопись</option>
                          <option value="graphics">Графика</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                          Статус наличия
                        </label>
                        <div className="flex items-center gap-3 pt-2">
                          <label className="flex items-center gap-1.5 text-xs text-[#EDE4DC] cursor-pointer">
                            <input
                              type="radio"
                              name="inStock"
                              checked={newArt.inStock}
                              onChange={() => setNewArt({ ...newArt, inStock: true })}
                              className="accent-[#D99E41]"
                            />
                            <span>В наличии</span>
                          </label>
                          <label className="flex items-center gap-1.5 text-xs text-[#BAA99A] cursor-pointer">
                            <input
                              type="radio"
                              name="inStock"
                              checked={!newArt.inStock}
                              onChange={() => setNewArt({ ...newArt, inStock: false })}
                              className="accent-[#D99E41]"
                            />
                            <span>В частной коллекции</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                          Фотография картины (Загрузка с устройства)
                        </label>
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-2 bg-[#140912] hover:bg-[#2b1728] border border-white/20 text-[#EDE4DC] text-xs rounded-sm cursor-pointer flex items-center gap-1.5 transition-colors shrink-0">
                            <Upload className="w-3.5 h-3.5 text-[#D99E41]" />
                            <span>Выбрать фото</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageFileChange}
                              className="hidden"
                            />
                          </label>
                          <input
                            type="text"
                            value={newArt.imageSrc}
                            onChange={(e) => setNewArt({ ...newArt, imageSrc: e.target.value })}
                            placeholder="или URL /assets/inner-bevel.jpg"
                            className="w-full px-3 py-2 bg-[#140912] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] text-xs rounded-sm outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                          Описание картины
                        </label>
                        <input
                          type="text"
                          value={newArt.description}
                          onChange={(e) => setNewArt({ ...newArt, description: e.target.value })}
                          placeholder="Сюжет, настроение, рама и особенности..."
                          className="w-full px-3 py-2 bg-[#140912] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] text-xs rounded-sm outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#D99E41] hover:bg-[#E8BD6F] text-[#160B14] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                      >
                        ДОБАВИТЬ В КАТАЛОГ
                      </button>
                    </div>
                  </form>

                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider text-[#BAA99A]">
                      Текущие картины на сайте ({artworks.length}):
                    </h4>

                    <div className="space-y-2">
                      {artworks.map((art) => (
                        <div
                          key={art.id}
                          className="p-3.5 rounded-sm bg-[#160A13] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/15 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xs bg-[#241320] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                              {art.imageSrc ? (
                                <img
                                  src={art.imageSrc}
                                  alt={art.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-[10px] text-[#D99E41]">АРТ</span>
                              )}
                            </div>
                            <div>
                              <div className="font-serif text-sm text-[#FBF5ED]">{art.title}</div>
                              <div className="text-[11px] text-[#A89788]">
                                {art.technique}, {art.size} • {art.priceFormatted}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              type="button"
                              onClick={() => handleToggleStock(art.id)}
                              className={`px-3 py-1.5 rounded-xs text-[11px] font-medium border cursor-pointer transition-colors ${
                                art.inStock
                                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/50'
                                  : 'bg-amber-950/40 text-amber-300 border-amber-500/40 hover:bg-amber-900/50'
                              }`}
                            >
                              {art.inStock ? 'В наличии' : 'В коллекции'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteArtwork(art.id)}
                              className="p-1.5 text-[#98877B] hover:text-red-400 transition-colors cursor-pointer"
                              title="Удалить"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-8">
                  <form onSubmit={handleAddService} className="p-5 rounded-sm bg-[#22121F] border border-white/10 space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#E8BD6F] flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Добавить новую программу обучения или услугу
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                          Название курса / услуги *
                        </label>
                        <input
                          type="text"
                          required
                          value={newService.title}
                          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                          placeholder="Например: Пленэрная живопись в Павловске"
                          className="w-full px-3 py-2 bg-[#140912] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] text-xs rounded-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                          Бейдж / метка
                        </label>
                        <input
                          type="text"
                          value={newService.badge}
                          onChange={(e) => setNewService({ ...newService, badge: e.target.value })}
                          placeholder="Интенсив / Камерная группа"
                          className="w-full px-3 py-2 bg-[#140912] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] text-xs rounded-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                          Стоимость
                        </label>
                        <input
                          type="text"
                          value={newService.price}
                          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                          placeholder="5 000 ₽"
                          className="w-full px-3 py-2 bg-[#140912] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] text-xs rounded-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                          Период / длительность
                        </label>
                        <input
                          type="text"
                          value={newService.period}
                          onChange={(e) => setNewService({ ...newService, period: e.target.value })}
                          placeholder="/ сессия (3 часа)"
                          className="w-full px-3 py-2 bg-[#140912] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] text-xs rounded-sm outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                        Описание программы
                      </label>
                      <textarea
                        rows={2}
                        value={newService.desc}
                        onChange={(e) => setNewService({ ...newService, desc: e.target.value })}
                        placeholder="Кому подходит курс, какие материалы предоставляются..."
                        className="w-full px-3 py-2 bg-[#140912] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] text-xs rounded-sm outline-none"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#D99E41] hover:bg-[#E8BD6F] text-[#160B14] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                      >
                        ДОБАВИТЬ УСЛУГУ
                      </button>
                    </div>
                  </form>

                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-wider text-[#BAA99A]">
                      Текущие программы ({services.length}):
                    </h4>

                    <div className="space-y-2">
                      {services.map((srv) => (
                        <div
                          key={srv.id}
                          className="p-3.5 rounded-sm bg-[#160A13] border border-white/5 flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="font-serif text-sm text-[#FBF5ED]">{srv.title}</div>
                            <div className="text-[11px] text-[#A89788]">
                              {srv.price} {srv.period} • {srv.badge}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteService(srv.id)}
                            className="p-1.5 text-[#98877B] hover:text-red-400 transition-colors cursor-pointer"
                            title="Удалить"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'export' && (
                <div className="space-y-6 text-[#C7B7A7] text-xs leading-relaxed">
                  <div className="p-4 rounded-sm bg-[#22121F] border border-white/10 space-y-3">
                    <h4 className="text-sm font-serif text-[#FBF5ED]">Синхронизация данных сайта</h4>
                    <p>
                      Все добавленные вами картины и курсы сохраняются прямо в браузере. Если вы хотите передать обновленный каталог программисту для вставки в репозиторий GitHub, нажмите кнопку ниже:
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="px-4 py-2 bg-[#D99E41] text-[#160B14] font-semibold rounded-sm hover:bg-[#E8BD6F] transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copySuccess ? 'Скопировано в буфер!' : 'Скопировать код для Git'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetToDefaults}
                        className="px-4 py-2 border border-white/20 text-[#C7B7A7] hover:text-[#EDE4DC] rounded-sm hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Сброс к картинам по умолчанию</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="max-w-md space-y-6">
                  <form onSubmit={handleChangePassword} className="p-5 rounded-sm bg-[#22121F] border border-white/10 space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#E8BD6F] flex items-center gap-2">
                      <KeyRound className="w-4 h-4" />
                      Смена мастер-пароля
                    </h4>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#BAA99A] mb-1">
                        Новый пароль
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Введите новый надежный пароль"
                        className="w-full px-3 py-2 bg-[#140912] border border-white/15 focus:border-[#D99E41] text-[#EDE4DC] text-xs rounded-sm outline-none"
                      />
                    </div>

                    {passChangeSuccess && (
                      <div className="text-xs text-emerald-400 font-medium">
                        Пароль успешно изменен!
                      </div>
                    )}

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#D99E41] hover:bg-[#E8BD6F] text-[#160B14] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                    >
                      СОХРАНИТЬ ПАРОЛЬ
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
