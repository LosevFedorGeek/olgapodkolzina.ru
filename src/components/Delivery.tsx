import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Frame, ShieldCheck, Truck, AlertCircle, Globe, Info } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { DeliveryModal } from './DeliveryModal';

export const Delivery: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      icon: Frame,
      title: 'Оформление под ваш интерьер',
      text: 'Работы поставляются подготовленными к оформлению. Вы сможете подобрать багет в местной мастерской точно под ваш интерьер, а Ольга лично проконсультирует вас по идеальному цвету рамки и типу стекла.'
    },
    {
      icon: ShieldCheck,
      title: 'Надежная арт-упаковка',
      text: 'Многослойная защита при пересылке: крафт-бумага, воздушно-пузырьковая пленка и жесткий плотный картон. Работа гарантированно зафиксирована от изломов, влаги и случайных повреждений.'
    },
    {
      icon: Truck,
      title: 'Бережная доставка по России',
      text: 'Отправка проверенными службами СДЭК и Почта России с предоставлением трек-номера. Каждая работа страхуется, а перед отправкой мы пришлем вам фото и видео готовой посылки.'
    }
  ];

  return (
    <section id="delivery" className="py-20 lg:py-28 relative bg-[#150A13] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="ПОКУПКА И ДОСТАВКА"
          title="Забота о сохранности каждого произведения"
          className="mb-12 max-w-3xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-6 sm:p-8 rounded-sm bg-[#1E0F1C]/80 border border-white/5 hover:border-[#D99E41]/35 transition-all duration-300 group shadow-lg"
              >
                <div className="w-12 h-12 rounded-sm bg-[#31182D] text-[#E8BD6F] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-[#FBF5ED] mb-3 group-hover:text-[#E8BD6F] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#BAA99A] font-light leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-sm bg-[#1E0F1C] border border-[#D99E41]/25 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#D99E41] font-semibold mb-2">
                ПРОФЕССИОНАЛЬНАЯ АРТ-ЗАЩИТА
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#FBF5ED] mb-3">
                Гарантия идеального состояния при получении
              </h3>
              <p className="text-sm text-[#C9B9AA] font-light leading-relaxed">
                Мы используем ударопрочные жесткие каркасы и влагозащитные материалы, которые гарантируют сохранность углов, поля и фактуры бумаги даже при транспортировке на дальние расстояния.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-[#9E8E81] leading-relaxed">
                Доставка осуществляется только по территории России
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[#D99E41] hover:text-[#E8BD6F] underline transition-colors cursor-pointer inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 font-medium whitespace-nowrap"
              >
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Подробные условия</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 rounded-sm bg-[#241221] border-l-2 border-[#D99E41] flex flex-col justify-between">
            <div>
              <div className="font-semibold text-[#E8BD6F] text-sm flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Важно: Осмотр покупателем при получении</span>
              </div>
              <p className="text-xs sm:text-sm text-[#D4C5B8] leading-relaxed">
                Просим вас вскрывать упаковку и проверять целостность картины непосредственно в пункте выдачи СДЭК или в присутствии курьера. Если есть повреждения, акт составляется сразу на месте – это гарантирует 100% выплату страховки.
              </p>
            </div>
            <div className="pt-3 text-[11px] text-[#A8988B] border-t border-white/5 flex items-center gap-1.5 mt-3">
              <Truck className="w-3.5 h-3.5 text-[#D99E41] shrink-0" />
              <span>Доставка только по территории России (СДЭК / Почта России).</span>
            </div>
          </div>
        </div>
      </div>

      <DeliveryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
