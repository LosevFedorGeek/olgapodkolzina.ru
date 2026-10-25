import React, { useEffect } from 'react';
import { X, Shield, FileText, CheckCircle2, Mail, ExternalLink } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToOther?: () => void;
}

export const PrivacyPolicyModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  onSwitchToOther
}) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl bg-[#1A0E1A] border border-[#D99E41]/35 rounded-sm shadow-2xl z-10 my-6 max-h-[90vh] flex flex-col overflow-hidden text-[#EDE4DC]">
        <div className="px-5 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between bg-[#150A15]/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D99E41]/15 border border-[#D99E41]/40 flex items-center justify-center text-[#E8BD6F]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif text-[#FBF5ED]">
                Политика конфиденциальности
              </h2>
              <p className="text-[11px] text-[#A8988B] tracking-wide uppercase">
                В соответствии с Федеральным законом РФ № 152-ФЗ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#9E8E81] hover:text-[#EDE4DC] hover:bg-white/5 rounded-xs transition-colors cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm leading-relaxed text-[#D7C7B9] font-light">
          <div className="p-3.5 bg-[#241221] border border-[#D99E41]/25 rounded-xs text-[12px] text-[#E8BD6F]">
            Редакция действует с 1 января 2026 г. Сайт: <strong>olgapodkolzina.ru</strong>. Оператор: Подколзина Ольга Викторовна (плательщик налога на профессиональный доход / самозанятая).
          </div>

          <section className="space-y-2">
            <h3 className="text-base font-serif font-bold text-[#F8F1E9] text-[#E8BD6F]">
              1. Общие положения
            </h3>
            <p>
              Настоящая Политика обработки персональных данных (далее — «Политика») определяет порядок сбора, хранения, защиты и обработки персональных данных пользователей сайта <strong>olgapodkolzina.ru</strong> в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и нормативными актами Роскомнадзора.
            </p>
            <p>
              Оператором персональных данных является гражданка РФ <strong>Подколзина Ольга Викторовна</strong> (место деятельности: Вологодская область, г. Бабаево; контактный e-mail: <a href="mailto:ovpodkolzina@yandex.ru" className="text-[#E8BD6F] underline">ovpodkolzina@yandex.ru</a>).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-serif font-bold text-[#F8F1E9] text-[#E8BD6F]">
              2. Категории собираемых персональных данных
            </h3>
            <p>Оператор собирает только те данные, которые необходимы для выполнения заказа и связи с покупателем:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Фамилия, имя, отчество пользователя;</li>
              <li>Контактный номер телефона;</li>
              <li>Адрес электронной почты (e-mail);</li>
              <li>Адрес доставки (для отправки произведений транспортными компаниями СДЭК или Почта России);</li>
              <li>Технические обезличенные данные (файлы cookie, IP-адрес, тип браузера, сохранение сессии корзины в локальном хранилище устройства).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-serif font-bold text-[#F8F1E9] text-[#E8BD6F]">
              3. Цели сбора и обработки данных
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Оформление бронирования и предварительного заказа авторских картин;</li>
              <li>Консультации по подбору багета, расчет стоимости и сроков доставки;</li>
              <li>Запись на мастер-классы и индивидуальные художественные консультации;</li>
              <li>Исполнение обязательств по отправке и вручению приобретенных произведений искусства;</li>
              <li>Предоставление официального чека самозанятого (в соответствии с Федеральным законом № 422-ФЗ).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-serif font-bold text-[#F8F1E9] text-[#E8BD6F]">
              4. Правовые основания и безопасность
            </h3>
            <p>
              Обработка данных осуществляется на основании ст. 6 Федерального закона № 152-ФЗ, добровольного согласия субъекта персональных данных, выраженного путем заполнения формы на сайте, а также для исполнения договора купли-продажи произведения.
            </p>
            <p>
              Оператор применяет современные организационные и технические меры безопасности: SSL/TLS шифрование канала передачи данных, антиспам-фильтрацию Honeypot, ограничение доступа к почтовым уведомлениям. Данные не передаются третьим лицам, за исключением официальных курьерских служб (СДЭК, Почта России) исключительно в объеме, необходимом для доставки.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-serif font-bold text-[#F8F1E9] text-[#E8BD6F]">
              5. Срок обработки и порядок отзыва согласия
            </h3>
            <p>
              Персональные данные обрабатываются до достижения целей их обработки либо до момента отзыва согласия субъектом.
            </p>
            <p>
              Пользователь вправе в любой момент отозвать свое согласие на обработку персональных данных, направив электронное заявление в свободной форме на адрес: <strong>ovpodkolzina@yandex.ru</strong> с пометкой «Отзыв согласия на обработку персональных данных». Заявление обрабатывается в срок до 10 рабочих дней, после чего данные безвозвратно удаляются.
            </p>
          </section>
        </div>

        <div className="px-5 sm:px-8 py-4 border-t border-white/10 bg-[#150A15]/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {onSwitchToOther ? (
            <button
              onClick={onSwitchToOther}
              className="text-xs text-[#D99E41] hover:text-[#E8BD6F] underline cursor-pointer"
            >
              Открыть Пользовательское соглашение
            </button>
          ) : <div />}

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-[#D99E41] hover:bg-[#E8BD6F] text-[#160B14] font-semibold text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
          >
            Понятно и согласен
          </button>
        </div>
      </div>
    </div>
  );
};

export const TermsModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  onSwitchToOther
}) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-3xl bg-[#1A0E1A] border border-[#D99E41]/35 rounded-sm shadow-2xl z-10 my-6 max-h-[90vh] flex flex-col overflow-hidden text-[#EDE4DC]">
        <div className="px-5 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between bg-[#150A15]/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D99E41]/15 border border-[#D99E41]/40 flex items-center justify-center text-[#E8BD6F]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif text-[#FBF5ED]">
                Пользовательское соглашение и условия покупки
              </h2>
              <p className="text-[11px] text-[#A8988B] tracking-wide uppercase">
                Защита авторских прав и правила галереи
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#9E8E81] hover:text-[#EDE4DC] hover:bg-white/5 rounded-xs transition-colors cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm leading-relaxed text-[#D7C7B9] font-light">
          <section className="space-y-2">
            <h3 className="text-base font-serif font-bold text-[#F8F1E9] text-[#E8BD6F]">
              1. Статус галереи и авторство
            </h3>
            <p>
              Настоящий сайт является персональной авторской онлайн-галереей художника <strong>Ольги Викторовны Подколзиной</strong>.
            </p>
            <p>
              Все представленные произведения живописи, графики, натюрморты, пейзажи и учебные материалы созданы лично автором и являются объектами авторского права, охраняемыми в соответствии с частью IV Гражданского кодекса РФ (ст. 1259, 1270, 1291 ГК РФ).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-serif font-bold text-[#F8F1E9] text-[#E8BD6F]">
              2. Интеллектуальная собственность
            </h3>
            <p>
              Приобретение физического оригинала картины влечет переход права собственности на материальный носитель (ст. 1291 ГК РФ). При этом <strong>исключительные авторские права</strong> на произведение, включая право на воспроизведение, тиражирование, печать репродукций, публикацию в каталогах и цифровых медиа, остаются за автором — Подколзиной Ольгой Викторовной.
            </p>
            <p>
              Любое коммерческое воспроизведение, перепечатка, создание принтов без письменного согласия автора запрещены законодательством РФ и влекут гражданскую и административную ответственность.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-serif font-bold text-[#F8F1E9] text-[#E8BD6F]">
              3. Порядок бронирования и покупки
            </h3>
            <p>
              Каждое полотно уникально и существует в единственном экземпляре.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Оформление заказа через корзину на сайте является бронированием и заявкой на согласование;</li>
              <li>Списание средств с карты на сайте автоматически не происходит;</li>
              <li>После отправки заявки автор лично связывается с заказчиком в течение 2–4 часов для подтверждения наличия, подбора багета и расчета доставки;</li>
              <li>Оплата производится официальным безналичным переводом (по Системе быстрых платежей / реквизитам счета) с формированием официального электронного чека самозанятого из приложения «Мой налог» ФНС России.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-serif font-bold text-[#F8F1E9] text-[#E8BD6F]">
              4. Условия доставки и передачи
            </h3>
            <p>
              Произведения упаковываются автором вручную по стандарту безопасной транспортировки предметов искусства: плотный картон, амортизирующая воздушно-пузырьковая пленка, влагозащита и защитные уголки.
            </p>
            <p>
              Доставка осуществляется по всей России службами СДЭК (до пункта выдачи или курьером) и Почтой России. Трек-номер для отслеживания посылки предоставляется заказчику в день отправки.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-serif font-bold text-[#F8F1E9] text-[#E8BD6F]">
              5. Реквизиты и контакты
            </h3>
            <div className="p-3.5 bg-[#241221] border border-white/10 rounded-xs space-y-1 text-xs text-[#D7C7B9]">
              <div><strong>Автор:</strong> Подколзина Ольга Викторовна</div>
              <div><strong>Налоговый статус:</strong> Плательщик налога на профессиональный доход (НПД)</div>
              <div><strong>Локация мастерской:</strong> Вологодская область, г. Бабаево</div>
              <div><strong>Электронная почта:</strong> ovpodkolzina@yandex.ru</div>
              <div><strong>Телефон:</strong> +7 (921) 141-86-77</div>
            </div>
          </section>
        </div>

        <div className="px-5 sm:px-8 py-4 border-t border-white/10 bg-[#150A15]/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {onSwitchToOther ? (
            <button
              onClick={onSwitchToOther}
              className="text-xs text-[#D99E41] hover:text-[#E8BD6F] underline cursor-pointer"
            >
              Открыть Политику конфиденциальности (152-ФЗ)
            </button>
          ) : <div />}

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-[#D99E41] hover:bg-[#E8BD6F] text-[#160B14] font-semibold text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
