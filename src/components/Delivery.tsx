import React from 'react';
import { ShieldCheck, Frame, Truck, Award } from 'lucide-react';

export const Delivery: React.FC = () => {
  const features = [
    {
      icon: Frame,
      title: 'Оформление в\u00A0раму и\u00A0паспарту',
      text: 'Индивидуальный подбор музейного багета и\u00A0бескислотного паспарту в\u00A0классическом или\u00A0лаконичном стиле. Готовое полотно сразу готово к\u00A0размещению в\u00A0вашем пространстве.'
    },
    {
      icon: ShieldCheck,
      title: 'Влагозащитная арт-упаковка',
      text: 'Многослойный защитный кокон: воздушно-пузырьковая пленка, влагостойкий полиэтилен, пенополистирол и\u00A0жесткий деревянный короб для\u00A0дальних пересылок.'
    },
    {
      icon: Truck,
      title: 'Бережная доставка по\u00A0РФ и\u00A0миру',
      text: 'Партнерство с\u00A0надежными арт-курьерами и\u00A0транспортными службами (СДЭК, Boxberry, Почта EMS). Каждое отправление застраховано на\u00A0полную объявленную стоимость.'
    }
  ];

  return (
    <section id="delivery" className="py-20 lg:py-28 relative bg-[#150A13] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="w-6 h-[1.5px] bg-[#D99E41]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#D99E41] font-semibold">
            ПОКУПКА И&nbsp;ДОСТАВКА
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FBF5ED] mb-12 max-w-3xl text-balance section-title-subtle">
          Забота о&nbsp;сохранности каждого произведения
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-sm bg-[#1E0F1C]/80 border border-white/5 hover:border-[#D99E41]/35 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-sm bg-[#31182D] text-[#E8BD6F] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-[#FBF5ED] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#BBA99A] font-light leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="p-6 sm:p-8 rounded-sm bg-gradient-to-r from-[#291426] via-[#200E1D] to-[#180A16] border border-[#D99E41]/35 flex items-center gap-4 sm:gap-5 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[#D99E41]/15 text-[#E8BD6F] flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-serif text-[#FBF5ED]">
              Именной сертификат подлинности
            </div>
            <div className="text-xs sm:text-sm text-[#B5A496] mt-1 leading-relaxed">
              К&nbsp;каждому полотну прилагается авторский сертификат подлинности с&nbsp;личной подписью Ольги Подколзиной.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
