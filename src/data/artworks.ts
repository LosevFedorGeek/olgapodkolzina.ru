import { Artwork, ServiceItem } from '../types';

export const ARTIST_CONTACTS = {
  name: 'Ольга Подколзина',
  phone: '+7 (921) 717-71-47',
  phoneRaw: '+79217177147',
  email: 'ovpodkolzina@yandex.ru',
  secondaryEmail: 'losevf287@gmail.com',
  vkUrl: 'https://vk.ru/id218728523',
  telegramUrl: 'https://t.me/+79217177147',
  whatsappUrl: 'https://max.ru/79217177147',
  maxUrl: 'https://max.ru/79217177147',
  address: 'Вологодская область, Бабаевский район, г. Бабаево'
};

export const ARTWORKS: Artwork[] = [
  {
    id: 'still-life-grapes',
    title: 'Осенний натюрморт с виноградом',
    technique: 'Бумага, акварель',
    size: '40х50 см',
    price: 45000,
    priceFormatted: '45\u00A0000\u00A0₽',
    inStock: true,
    category: 'watercolor',
    year: '2024',
    description: 'Многослойная лессировочная акварель. Изысканная игра света на\u00A0гранях античного серебряного кувшина и\u00A0спелых гроздьях винограда, покоящихся на\u00A0льняной скатерти.',
    imagePlaceholder: 'svg-grapes',
    imageSrc: '/assets/inner-bevel.jpg'
  },
  {
    id: 'workshop-light',
    title: 'Весенний свет в\u00A0мастерской',
    technique: 'Холст, масло',
    size: '50х60 см',
    price: null,
    priceFormatted: 'В\u00A0частной коллекции',
    inStock: false,
    category: 'watercolor',
    year: '2023',
    description: 'Импрессионистический этюд мастерской в\u00A0лучах утреннего солнца. Пышный букет белой сирени, мольберт с\u00A0чистым холстом и\u00A0теплая атмосфера творческого уединения.',
    imagePlaceholder: 'svg-workshop',
    imageSrc: '/assets/inner-bevel-1.jpg'
  },
  {
    id: 'neva-morning',
    title: 'Утро на\u00A0набережной Невы',
    technique: 'Бумага, пастель',
    size: '35х45 см',
    price: 38000,
    priceFormatted: '38\u00A0000\u00A0₽',
    inStock: true,
    category: 'graphics',
    year: '2024',
    description: 'Нежные рассветные тона Петербурга. Зимний дворец в\u00A0предрассветной дымке, зеркальная гладь Невы и\u00A0силуэт прогулочной лодки в\u00A0золотисто-розовом тумане.',
    imagePlaceholder: 'svg-neva',
    imageSrc: '/assets/inner-bevel-2.jpg'
  },
  {
    id: 'old-estate-noon',
    title: 'Старая усадьба. Полдень',
    technique: 'Холст, масло',
    size: '40х60 см',
    price: 52000,
    priceFormatted: '52\u00A0000\u00A0₽',
    inStock: true,
    category: 'watercolor',
    year: '2023',
    description: 'Русский классицизм и\u00A0величие природы. Старинный дворянский особняк с\u00A0колоннами, залитый полуденным солнцем сквозь листву вековых берез.',
    imagePlaceholder: 'svg-estate',
    imageSrc: '/assets/inner-bevel-3.jpg'
  },
  {
    id: 'peonies-terrace',
    title: 'Букет пионов на\u00A0террасе',
    technique: 'Бумага, акварель',
    size: '50х50 см',
    price: null,
    priceFormatted: 'В\u00A0частной коллекции',
    inStock: false,
    category: 'watercolor',
    year: '2024',
    description: 'Виртуозная ботаническая акварель. Нежные лепестки розовых пионов в\u00A0прозрачной стеклянной вазе с\u00A0каплями росы на\u00A0залитой светом дощатой террасе.',
    imagePlaceholder: 'svg-peonies',
    imageSrc: '/assets/d89124556d17bbd137ab1c395aa790068db03cc1.jpg'
  },
  {
    id: 'winter-temple',
    title: 'Зимний силуэт храма',
    technique: 'Бумага, соус, уголь',
    size: '40х50 см',
    price: 42000,
    priceFormatted: '42\u00A0000\u00A0₽',
    inStock: true,
    category: 'graphics',
    year: '2024',
    description: 'Академическая тональная графика. Древний пятиглавый собор сквозь кружево заснеженных ветвей деревьев. Глубокая тишина и\u00A0покой русской зимы.',
    imagePlaceholder: 'svg-temple',
    imageSrc: '/assets/inner-bevel-5.jpg'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'private-lessons',
    title: 'Частные уроки и\u00A0подготовка',
    desc: 'Индивидуальный академический курс для\u00A0поступающих в\u00A0художественные вузы и\u00A0желающих освоить рисунок с\u00A0нуля. Постановка руки, штрих, законы перспективы и\u00A0светотени.',
    price: '3\u00A0500\u00A0₽',
    period: '/ занятие (2\u00A0часа)',
    badge: 'Академический базис'
  },
  {
    id: 'masterclasses',
    title: 'Авторские мастер-классы',
    desc: 'Камерные групповые встречи в\u00A0мастерской художника (до\u00A05 человек). Тонкости лессировочной акварели и\u00A0смешанных графических техник. Профессиональные материалы включены.',
    price: '5\u00A0000\u00A0₽',
    period: '/ сессия (3\u00A0часа)',
    badge: 'Камерные группы'
  },
  {
    id: 'art-consultation',
    title: 'Арт-консультации',
    desc: 'Профессиональный подбор картин под\u00A0колористику и\u00A0освещение вашего интерьера. Примерка в\u00A0цифровом формате и\u00A0написание индивидуальных полотен по\u00A0брифу.',
    price: 'Бесплатно',
    period: 'при заказе полотна',
    badge: 'Для вашего дома'
  }
];

export const getStoredArtworks = (): Artwork[] => {
  try {
    const raw = localStorage.getItem('podkolzina_artworks');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  return ARTWORKS;
};

export const saveStoredArtworks = (artworks: Artwork[]): void => {
  try {
    localStorage.setItem('podkolzina_artworks', JSON.stringify(artworks));
  } catch {}
};

export const getStoredServices = (): ServiceItem[] => {
  try {
    const raw = localStorage.getItem('podkolzina_services');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  return INITIAL_SERVICES;
};

export const saveStoredServices = (services: ServiceItem[]): void => {
  try {
    localStorage.setItem('podkolzina_services', JSON.stringify(services));
  } catch {}
};
