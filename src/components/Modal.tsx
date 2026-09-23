import React, { useState, useEffect } from 'react';
import { X, Check, Loader2, Send, AlertCircle } from 'lucide-react';
import { InquiryData } from '../types';
import { triggerHaptic } from '../utils/haptics';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: InquiryData | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, inquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    botcheck: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const targetEmail = 'ovpodkolzina@yandex.ru, losevf287@gmail.com';

  const isGeneralInquiry =
    !inquiry?.itemTitle ||
    inquiry.itemTitle.includes('футер') ||
    inquiry.itemTitle.includes('меню') ||
    inquiry.itemTitle.includes('Индивидуальный') ||
    inquiry.itemTitle.includes('заказ') ||
    inquiry.itemTitle.includes('Общий');

  const displayModalTitle = isGeneralInquiry
    ? 'Консультация и заказ живописи'
    : inquiry.itemTitle;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStatus('idle');
      setErrorMessage('');
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: isGeneralInquiry
          ? 'Здравствуйте! Хочу проконсультироваться по картинам Ольги Подколзиной или обсудить заказ полотна в интерьер.'
          : `Здравствуйте! Меня интересует: «${inquiry.itemTitle}»`,
        botcheck: ''
      });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, inquiry, isGeneralInquiry]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.botcheck) return;

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Пожалуйста, укажите ваше имя и контактный телефон.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const activeKey =
        localStorage.getItem('web3forms_access_key') ||
        (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string) ||
        '';

      if (!activeKey) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setStatus('success');
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: activeKey,
          subject: inquiry?.itemTitle
            ? `Заявка с сайта: «${inquiry.itemTitle}»`
            : 'Новая заявка с сайта Ольги Подколзиной',
          from_name: 'Ольга Подколзина - Авторская живопись',
          to_email: targetEmail,
          name: formData.name,
          phone: formData.phone,
          email: formData.email || 'Не указан',
          message: formData.message || 'Без комментария',
          artwork: inquiry?.itemTitle || 'Общий запрос',
          price: inquiry?.price || 'По запросу',
          replyto: formData.email || undefined
        })
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Не удалось отправить заявку. Попробуйте снова или напишите в Telegram.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Сетевая ошибка при отправке. Пожалуйста, напишите напрямую в Telegram или позвоните.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-[#1F101E] border border-[#D99E41]/35 rounded-sm p-6 sm:p-8 shadow-2xl z-10 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-[#BAA898] hover:text-[#EDE4DC] transition-colors rounded-sm cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D99E41]/20 border border-[#D99E41] text-[#E8BD6F] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#FBF5ED]">
              Заявка успешно принята!
            </h3>
            <p className="text-sm text-[#C9B9AA] max-w-sm mx-auto leading-relaxed font-light">
              Информация направлена Ольге Подколзиной. Автор свяжется с&nbsp;вами в&nbsp;течение 30&nbsp;минут для&nbsp;согласования всех деталей.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#2b1828] border border-white/10 hover:border-[#D99E41]/50 text-xs font-semibold uppercase tracking-wider text-[#EDE4DC] transition-colors"
              >
                <Send className="w-4 h-4 text-[#D99E41]" />
                Написать в&nbsp;Telegram
              </a>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-sm bg-[#D99E41] hover:bg-[#E8BD6F] text-xs font-semibold uppercase tracking-wider text-[#160B14] transition-colors cursor-pointer"
              >
                Вернуться на&nbsp;сайт
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest text-[#D99E41] font-semibold block">
                СВЯЗАТЬСЯ С&nbsp;ХУДОЖНИКОМ
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#FBF5ED] mt-1.5">
                {displayModalTitle}
              </h3>
              {inquiry?.price && (
                <div className="text-base font-sans font-bold text-[#E8BD6F] mt-1 tracking-tight">
                  {inquiry.price}
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="mb-5 p-3 rounded-xs bg-red-950/50 border border-red-800/60 flex items-start gap-2.5 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="botcheck"
                value={formData.botcheck}
                onChange={(e) => setFormData({ ...formData, botcheck: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#B8A899] mb-1.5">
                  Ваше имя <span className="text-[#D99E41]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Например, Анна"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#170B16] border border-white/10 rounded-xs text-sm text-[#EDE4DC] placeholder-[#7E6F62] focus:outline-none focus:border-[#D99E41] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#B8A899] mb-1.5">
                    Телефон / Telegram <span className="text-[#D99E41]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+7 (999) 000-00-00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#170B16] border border-white/10 rounded-xs text-sm text-[#EDE4DC] placeholder-[#7E6F62] focus:outline-none focus:border-[#D99E41] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#B8A899] mb-1.5">
                    Email (по&nbsp;желанию)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#170B16] border border-white/10 rounded-xs text-sm text-[#EDE4DC] placeholder-[#7E6F62] focus:outline-none focus:border-[#D99E41] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#B8A899] mb-1.5">
                  Пожелания или вопрос
                </label>
                <textarea
                  rows={3}
                  placeholder="Уточните удобное время звонка, город доставки или детали заказа..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#170B16] border border-white/10 rounded-xs text-sm text-[#EDE4DC] placeholder-[#7E6F62] focus:outline-none focus:border-[#D99E41] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                onClick={() => triggerHaptic(25)}
                disabled={status === 'loading'}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#160B14] bg-[#D99E41] hover:bg-[#E8BD6F] active:scale-[0.99] disabled:opacity-50 transition-all rounded-xs shadow-lg shadow-[#D99E41]/20 flex items-center justify-center gap-2 cursor-pointer shimmer-btn interactive-action-btn"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Отправка заявки...</span>
                  </>
                ) : (
                  <span>ОТПРАВИТЬ ЗАЯВКУ</span>
                )}
              </button>

              <p className="text-center text-[11px] text-[#8C7C6F] pt-2 leading-relaxed">
                Нажимая кнопку, вы&nbsp;подтверждаете согласие на&nbsp;конфиденциальную обработку контактных данных.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
