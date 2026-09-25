import React, { useEffect } from 'react';
import { X, ShieldCheck, Package, Truck, AlertCircle, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeliveryModal: React.FC<DeliveryModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#1A0D18] border border-[#D99E41]/35 rounded-sm shadow-2xl z-10 p-6 sm:p-8 my-auto overflow-hidden text-left"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#BAA99A] hover:text-[#EDE4DC] bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#D99E41] font-semibold block mb-1">
                ИНФОРМАЦИЯ ДЛЯ ПОКУПАТЕЛЕЙ
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#FBF5ED]">
                Как происходит оплата и доставка?
              </h3>
            </div>

            <div className="space-y-5 text-sm sm:text-base text-[#D4C5B8] leading-relaxed">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-sm bg-[#D99E41]/15 text-[#E8BD6F] flex items-center justify-center shrink-0 mt-0.5 border border-[#D99E41]/30 font-semibold font-mono text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-[#F7EFE6] text-base mb-1">Оплата картины</h4>
                  <p className="text-sm text-[#BAA898]">
                    Вы оплачиваете 100% стоимости произведения напрямую художнику (с предоставлением официального чека самозанятого).
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-sm bg-[#D99E41]/15 text-[#E8BD6F] flex items-center justify-center shrink-0 mt-0.5 border border-[#D99E41]/30 font-semibold font-mono text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-[#F7EFE6] text-base mb-1">Бережная отправка и страхование</h4>
                  <p className="text-sm text-[#BAA898]">
                    Ольга лично упаковывает работу в многослойную защитную броню (крафт-бумага, пузырьковая пленка, плотный картон) и оформляет отправку через СДЭК или Почту России. Каждая посылка передается со 100% объявленной ценностью (страховкой).
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-sm bg-[#D99E41]/15 text-[#E8BD6F] flex items-center justify-center shrink-0 mt-0.5 border border-[#D99E41]/30 font-semibold font-mono text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-[#F7EFE6] text-base mb-1">Расчет и получение</h4>
                  <p className="text-sm text-[#BAA898]">
                    Стоимость транспортировки и страховки не включается в цену картины – вы оплачиваете её напрямую логистической службе при получении посылки в вашем пункте выдачи или курьеру.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-[#271324] border-l-2 border-[#D99E41] text-xs sm:text-sm text-[#EAE0D5] space-y-1">
                <div className="font-semibold text-[#E8BD6F] flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Важно при получении:</span>
                </div>
                <p className="italic text-[#BAA99A]">
                  Просим вас вскрывать упаковку и проверять целостность картины непосредственно в пункте выдачи СДЭК или в присутствии курьера. Если есть повреждения, акт составляется сразу на месте – это гарантирует 100% выплату страховки.
                </p>
              </div>

              <div className="pt-2 text-xs text-[#9E8E81] border-t border-white/5 space-y-1">
                <div className="font-medium text-[#C4B4A5] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#D99E41]" />
                  <span>География доставки:</span>
                </div>
                <p>
                  Отправка произведений осуществляется только по территории России (СДЭК и Почта России). Каждое отправление сопровождается трек-номером и полным страхованием.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#D99E41] hover:bg-[#E8BD6F] text-[#180D16] font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Понятно
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
