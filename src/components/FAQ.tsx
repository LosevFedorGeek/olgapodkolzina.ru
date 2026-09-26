import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = useMemo(
    () => [
      {
        q: 'Как приобрести понравившуюся картину и\u00A0можно\u00A0ли примерить её\u00A0в\u00A0интерьере?',
        a: 'Нажмите «Приобрести» рядом с\u00A0выбранной картиной или\u00A0оставьте контакты в\u00A0форме заявки. Ольга Подколзина лично свяжется с\u00A0вами для\u00A0обсуждения деталей. Доступна услуга виртуальной примерки: вы\u00A0можете прислать фото вашей комнаты или\u00A0офиса, и\u00A0мы\u00A0визуализируем картину точно в\u00A0масштабе интерьера.'
      },
      {
        q: 'Как организована бережная доставка по России?',
        a: 'Отправка осуществляется надежными службами СДЭК и Почта России с предоставлением трек-номера. Каждая работа упаковывается в многослойную арт-защиту (крафт-бумага, воздушно-пузырьковая пленка, жесткий плотный картон) и страхуется на 100% объявленной ценности. Перед отправкой мы пришлем вам фото и видео готовой посылки. При получении просим обязательно проверять целостность в присутствии курьера или в пункте выдачи.'
      },
      {
        q: 'Являются\u00A0ли картины оригиналом в\u00A0единственном экземпляре?',
        a: 'Да, абсолютно все представленные произведения Ольги Подколзиной — это авторские подлинники, созданные вручную в единственном экземпляре и снабженные личной подписью художника на полотне.'
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
        <SectionHeader
          badge="ВОПРОСЫ И ОТВЕТЫ"
          title="Частые вопросы покупателей"
          subtitle="Все, что важно знать об оформлении, сертификации, доставке и заказах авторской живописи"
          className="mb-12"
        />

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
