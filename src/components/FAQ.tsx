import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = useMemo(
    () => [
      {
        q: 'Как приобрести понравившуюся картину и\u00A0можно\u00A0ли примерить её\u00A0в\u00A0интерьере?',
        a: 'Нажмите «Приобрести» рядом с\u00A0выбранной картиной или\u00A0оставьте контакты в\u00A0форме заявки. Ольга Подколзина лично свяжется с\u00A0вами для\u00A0обсуждения деталей. Доступна услуга виртуальной примерки: вы\u00A0можете прислать фото вашей комнаты или\u00A0офиса, и\u00A0мы\u00A0визуализируем картину точно в\u00A0масштабе интерьера.'
      },
      {
        q: 'Как организована бережная доставка по\u00A0России и\u00A0миру?',
        a: 'Каждое произведение пакуется в\u00A0специальный многослойный влагозащитный бокс с\u00A0амортизирующими уголками и\u00A0жесткими защитными панелями. Для\u00A0отправки графики под\u00A0стеклом и\u00A0крупноформатных холстов используется жесткая деревянная обрешетка. Все отправления застрахованы на\u00A0полную стоимость.'
      },
      {
        q: 'Прилагается\u00A0ли к\u00A0картине сертификат подлинности?',
        a: 'Да, абсолютно ко\u00A0всем оригинальным полотнам Ольги Подколзиной прилагается авторский номерной сертификат подлинности с\u00A0личной подписью автора, указанием года создания, техники и\u00A0размеров произведения.'
      },
      {
        q: 'Что делать, если картина уже «В\u00A0частной коллекции»?',
        a: 'Вы можете заказать индивидуальный авторский повтор в\u00A0желаемом размере или\u00A0заказать новую оригинальную картину в\u00A0той\u00A0же технике и\u00A0колористике. Сроки создания составляют от\u00A02 до\u00A04\u00A0недель в\u00A0зависимости от\u00A0сложности и\u00A0техники.'
      },
      {
        q: 'Как проходят частные уроки и\u00A0авторские мастер-классы?',
        a: 'Занятия проводятся очно в\u00A0мастерской художника (Вологодская область, г.\u00A0Бабаево), а\u00A0также в\u00A0интерактивном онлайн-формате по\u00A0всей России с\u00A0индивидуальным видеоразбором каждой работы.'
      }
    ],
    []
  );

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.q.replace(/\u00A0/g, ' '),
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a.replace(/\u00A0/g, ' ')
        }
      }))
    };
  }, [faqs]);

  return (
    <section
      id="faq"
      itemScope
      itemType="https://schema.org/FAQPage"
      className="py-20 lg:py-28 relative bg-[#180D16] border-t border-white/5"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="w-6 h-[1.5px] bg-[#D99E41]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#D99E41] font-semibold">
            ВОПРОСЫ И&nbsp;ОТВЕТЫ
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FBF5ED] mb-4 section-title-subtle">
          Частые вопросы покупателей
        </h2>
        <p className="text-sm sm:text-base text-[#BBA99A] font-light mb-12">
          Все, что важно знать об&nbsp;оформлении, сертификации, доставке и&nbsp;заказах авторской живописи
        </p>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const cleanQuestion = faq.q.replace(/\u00A0/g, ' ');
            const cleanAnswer = faq.a.replace(/\u00A0/g, ' ');

            return (
              <div
                key={idx}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="rounded-sm bg-[#22121F]/80 border border-white/5 hover:border-[#D99E41]/30 transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span
                    itemProp="name"
                    className="font-serif text-lg sm:text-xl text-[#F8F1E9] leading-snug"
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`p-1 rounded-full text-[#D99E41] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <div
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                  className={isOpen ? 'block' : 'hidden'}
                >
                  <div
                    itemProp="text"
                    className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#C7B7A7] font-light leading-relaxed border-t border-white/5"
                  >
                    {faq.a}
                  </div>
                </div>

                {!isOpen && (
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className="sr-only"
                    aria-hidden="true"
                  >
                    <span itemProp="text">{cleanAnswer}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
