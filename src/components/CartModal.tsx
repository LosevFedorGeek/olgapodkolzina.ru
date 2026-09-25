import React, { useState, useEffect } from 'react';
import { X, Trash2, ShieldCheck, Check, Clock, Send, CreditCard, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';
import { ArtCanvas } from './ArtCanvas';
import { triggerHaptic } from '../utils/haptics';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenArtDetail?: (id: string) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery_cdek' | 'delivery_post' | 'pickup'>('delivery_cdek');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showPaymentMock, setShowPaymentMock] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (items.length === 0 && step === 'checkout') {
        setStep('cart');
      }
    } else {
      document.body.style.overflow = '';
      setShowPaymentMock(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, items.length, step]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalPrice = items.reduce((acc, item) => acc + (item.price || 0), 0);
  const formattedTotalPrice = totalPrice > 0 ? `${totalPrice.toLocaleString('ru-RU')} ₽` : 'По согласованию';

  const handleProceedToCheckout = () => {
    setStep('checkout');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);
    const newOrderId = `OP-${Date.now().toString().slice(-5)}`;
    setOrderId(newOrderId);

    try {
      const itemsList = items.map((i) => `• ${i.title} (${i.priceFormatted})`).join('\n');
      const deliveryLabels = {
        delivery_cdek: 'СДЭК по всей России (ПВЗ или курьер)',
        delivery_post: 'Почта России с трек-номером',
        pickup: 'Самовывоз из мастерской автора (г. Бабаево)'
      };

      const accessKey =
        localStorage.getItem('web3forms_access_key') ||
        (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string) ||
        '';

      if (accessKey) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Новый заказ #${newOrderId} на сайте olgapodkolzina.ru`,
            from_name: 'Ольга Подколзина - Галерея',
            to_email: 'ovpodkolzina@yandex.ru, losevf287@gmail.com',
            name: formData.name,
            phone: formData.phone,
            email: formData.email || 'Не указан',
            delivery: deliveryLabels[deliveryMethod],
            address: formData.address || 'Не указан',
            comment: formData.comment || 'Без комментария',
            order_items: itemsList,
            total_sum: formattedTotalPrice
          })
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      setIsSubmitting(false);
      setStep('success');
      onClearCart();
    } catch (err) {
      setIsSubmitting(false);
      setStep('success');
      onClearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-[#1D0F1B] border border-[#D99E41]/35 rounded-sm shadow-2xl z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#170B16]">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#D99E41] font-semibold">
              КОРЗИНА И ОФОРМЛЕНИЕ
            </span>
            {items.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#D99E41]/20 text-[#E8BD6F] text-xs font-semibold">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#BBA99A] hover:text-[#EDE4DC] rounded-sm transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-14 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-[#A89686] flex items-center justify-center mx-auto">
                    <CreditCard className="w-8 h-8 opacity-60" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#F7EFE6]">
                    Ваша корзина пуста
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A89686] max-w-sm mx-auto font-light">
                    Выберите понравившуюся картину в галерее или мастер-класс и нажмите «В корзину».
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      const galleryEl = document.getElementById('gallery');
                      if (galleryEl) {
                        galleryEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="mt-2 px-6 py-2.5 bg-[#D99E41] text-[#160B14] font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-[#E8BD6F] transition-colors cursor-pointer"
                  >
                    ПЕРЕЙТИ В ГАЛЕРЕЮ
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="divide-y divide-white/10">
                    {items.map((item) => (
                      <div key={item.id} className="py-3.5 flex items-center gap-4 group">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#281324] border border-white/10 rounded-xs overflow-hidden shrink-0 relative">
                          <ArtCanvas id={item.id} title={item.title} imageSrc={item.imageSrc} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-base sm:text-lg text-[#F7EFE6] truncate">
                            {item.title}
                          </h4>
                          {item.technique && (
                            <p className="text-xs text-[#A89686] truncate">
                              {item.technique} {item.size ? `• ${item.size}` : ''}
                            </p>
                          )}
                          <div className="text-sm font-sans font-bold text-[#E8BD6F] mt-1">
                            {item.priceFormatted}
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-[#8C7B6D] hover:text-red-400 transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xs bg-[#241221] border border-[#D99E41]/30 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-[#E8BD6F] font-semibold">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Порядок покупки и согласования</span>
                    </div>
                    <p className="text-[#BAA898] leading-relaxed font-light">
                      Каждое полотно уникально. После заявки Ольга лично связывается с вами для подтверждения брони, подбора багета и адреса доставки. Официальная оплата (СБП, карта) производится только после полного согласования.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              <div className="p-3.5 rounded-xs bg-[#241221] border border-white/10 text-xs space-y-1">
                <span className="text-[#E8BD6F] font-semibold uppercase tracking-wider block">
                  Выбранные произведения:
                </span>
                <div className="text-[#EDE4DC] space-y-0.5">
                  {items.map((i) => (
                    <div key={i.id} className="flex justify-between">
                      <span className="truncate pr-2">{i.title}</span>
                      <span className="font-sans font-semibold text-[#E8BD6F] shrink-0">{i.priceFormatted}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#BAA898]">
                  Способ получения
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery_cdek')}
                    className={`p-3 rounded-xs border text-left transition-colors ${
                      deliveryMethod === 'delivery_cdek'
                        ? 'bg-[#2E162A] border-[#D99E41] text-[#F7EFE6]'
                        : 'bg-[#180A16] border-white/10 text-[#A89686] hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold text-[#EDE4DC]">СДЭК по РФ</div>
                    <div className="text-[11px] text-[#A89686] mt-0.5">ПВЗ или курьер</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery_post')}
                    className={`p-3 rounded-xs border text-left transition-colors ${
                      deliveryMethod === 'delivery_post'
                        ? 'bg-[#2E162A] border-[#D99E41] text-[#F7EFE6]'
                        : 'bg-[#180A16] border-white/10 text-[#A89686] hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold text-[#EDE4DC]">Почта России</div>
                    <div className="text-[11px] text-[#A89686] mt-0.5">Трек-номер и страховка</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-3 rounded-xs border text-left transition-colors ${
                      deliveryMethod === 'pickup'
                        ? 'bg-[#2E162A] border-[#D99E41] text-[#F7EFE6]'
                        : 'bg-[#180A16] border-white/10 text-[#A89686] hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold text-[#EDE4DC]">Самовывоз</div>
                    <div className="text-[11px] text-[#A89686] mt-0.5">г. Бабаево</div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#BAA898] mb-1.5">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например, Екатерина"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#170A16] border border-white/10 rounded-xs text-sm text-[#EDE4DC] placeholder-[#736356] focus:outline-none focus:border-[#D99E41]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#BAA898] mb-1.5">
                    Телефон / Telegram *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+7 (999) 000-00-00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#170A16] border border-white/10 rounded-xs text-sm text-[#EDE4DC] placeholder-[#736356] focus:outline-none focus:border-[#D99E41]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#BAA898] mb-1.5">
                  Город и адрес доставки
                </label>
                <input
                  type="text"
                  placeholder="Санкт-Петербург, ул. Миллионная или Москва..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#170A16] border border-white/10 rounded-xs text-sm text-[#EDE4DC] placeholder-[#736356] focus:outline-none focus:border-[#D99E41]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#BAA898] mb-1.5">
                  Комментарий или пожелание по оформлению
                </label>
                <textarea
                  rows={2}
                  placeholder="Нужен ли багет, желаемые сроки, пожелания к упаковке..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#170A16] border border-white/10 rounded-xs text-sm text-[#EDE4DC] placeholder-[#736356] focus:outline-none focus:border-[#D99E41] resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 border border-white/15 text-xs uppercase tracking-wider text-[#BBA99A] hover:text-[#EDE4DC] rounded-xs cursor-pointer"
                >
                  Назад
                </button>

                <button
                  type="submit"
                  onClick={() => triggerHaptic(25)}
                  disabled={isSubmitting}
                  className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-[#160B14] bg-[#D99E41] hover:bg-[#E8BD6F] rounded-xs shadow-lg shimmer-btn interactive-action-btn disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Отправка...' : 'ЗАБРОНИРОВАТЬ И СОГЛАСОВАТЬ'}
                </button>
              </div>

              <p className="text-center text-[11px] text-[#8C7C6F] pt-1 leading-relaxed">
                Нажимая кнопку, вы&nbsp;подтверждаете согласие на&nbsp;конфиденциальную обработку контактных данных.
              </p>
            </form>
          )}

          {step === 'success' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D99E41]/20 border border-[#D99E41] text-[#E8BD6F] flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#FBF5ED]">
                Бронь успешно принята!
              </h3>
              <p className="text-sm text-[#D7C7B9] font-sans font-medium">
                Номер заявки: <span className="text-[#E8BD6F] font-bold">#{orderId}</span>
              </p>
              <p className="text-xs sm:text-sm text-[#A89686] max-w-md mx-auto leading-relaxed font-light">
                Информация направлена Ольге Подколзиной. Автор свяжется с вами для подтверждения готовности полотна, согласования багета и способа безопасной оплаты.
              </p>

              <div className="p-4 rounded-xs bg-[#241221] border border-white/10 max-w-md mx-auto text-left text-xs space-y-2 text-[#C9B9AA]">
                <div className="flex items-center gap-2 text-[#E8BD6F] font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Что происходит дальше:</span>
                </div>
                <div className="pl-6 space-y-1 text-[11px] leading-relaxed text-[#BAA898]">
                  <div>1. Звонок или сообщение от автора в течение 30 минут</div>
                  <div>2. Согласование багета, паспорта картины и упаковки</div>
                  <div>3. Отправка персональной ссылки на безопасную оплату (СБП/карта)</div>
                </div>
              </div>

              {showPaymentMock && (
                <div className="p-4 rounded-xs bg-[#170A16] border border-[#D99E41]/40 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex items-center justify-between text-[#E8BD6F] font-semibold">
                    <span>Безопасная оплата (СБП / Банк)</span>
                    <span className="font-bold">{formattedTotalPrice}</span>
                  </div>
                  <p className="text-[11px] text-[#A89686]">
                    После согласования с автором здесь станет доступна оплата через Систему быстрых платежей или банковской картой с чеком.
                  </p>
                </div>
              )}

              <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xs bg-[#2b1828] border border-white/10 hover:border-[#D99E41]/50 text-xs font-semibold uppercase tracking-wider text-[#EDE4DC] transition-colors"
                >
                  <Send className="w-4 h-4 text-[#D99E41]" />
                  Написать в Telegram
                </a>

                <button
                  type="button"
                  onClick={() => setShowPaymentMock(true)}
                  className="px-5 py-2.5 rounded-xs bg-[#D99E41]/20 border border-[#D99E41]/50 text-xs font-semibold uppercase tracking-wider text-[#E8BD6F] hover:bg-[#D99E41]/30 transition-colors"
                >
                  Узнать детали оплаты
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xs bg-[#D99E41] hover:bg-[#E8BD6F] text-xs font-semibold uppercase tracking-wider text-[#160B14] transition-colors"
                >
                  Закрыть
                </button>
              </div>
            </div>
          )}
        </div>

        {step === 'cart' && items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-white/10 bg-[#170B16] flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#8C7B6D]">
                Итого к согласованию:
              </div>
              <div className="text-xl sm:text-2xl font-sans font-bold text-[#E8BD6F]">
                {formattedTotalPrice}
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="px-6 py-3 bg-[#D99E41] hover:bg-[#E8BD6F] active:scale-[0.98] text-[#160B14] text-xs font-semibold uppercase tracking-wider rounded-xs shadow-lg shimmer-btn flex items-center gap-2 cursor-pointer"
            >
              <span>ОФОРМИТЬ ЗАКАЗ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
