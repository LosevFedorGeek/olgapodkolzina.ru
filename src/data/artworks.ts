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
    id: 'spring-breath',
    title: 'Дыхание весны',
    technique: 'Тонированная бумага, сухая пастель',
    size: '30х40 см',
    price: 17000,
    priceFormatted: '17 000 ₽',
    inStock: true,
    category: 'graphics',
    year: '2024',
    description: 'Весеннее пробуждение северного леса. Тающий мартовский снег, первые проталины, тонкие стволы берез и птицы, возвращающиеся в родные края.',
    imagePlaceholder: 'svg-birch',
    imageSrc: '/assets/dyhanie-vesny.jpg'
  },
  {
    id: 'autumn-warmth',
    title: 'Осеннее тепло',
    technique: 'Бумага, акварель',
    size: '40х30 см',
    price: 18000,
    priceFormatted: '18 000 ₽',
    inStock: true,
    category: 'watercolor',
    year: '2024',
    description: 'Богатый и душевный осенний натюрморт. Спелая медовая долька тыквы, глиняный кувшин с пышным букетом луговых трав и пламенеющие гроздья рябины на ткани с традиционным орнаментом.',
    imagePlaceholder: 'svg-pumpkin',
    imageSrc: '/assets/osennee-teplo.jpg'
  },
  {
    id: 'garden-velvet',
    title: 'Бархат сада',
    technique: 'Тонированная бумага, соус (Графика)',
    size: '40х30 см',
    price: 18000,
    priceFormatted: '18 000 ₽',
    inStock: true,
    category: 'graphics',
    year: '2024',
    description: 'Виртуозная академическая станковая графика в редкой технике соуса. Бархатистые соцветия белых садовых цветов, контрастные гроздья черноплодной рябины и выразительная фактура тонированного листа.',
    imagePlaceholder: 'svg-garden',
    imageSrc: '/assets/barhat-sada.jpg'
  },
  {
    id: 'august-tray',
    title: 'Август на подносе',
    technique: 'Холст, масло',
    size: '45х35 см',
    price: 23000,
    priceFormatted: '23 000 ₽',
    inStock: true,
    category: 'watercolor',
    year: '2024',
    description: 'Солнечный натюрморт, наполненный ароматом уходящего лета. Пышный букет золотистых ромашек и полевых хризантем в стеклянной вазе на винтажном подносе со спелыми садовыми яблоками.',
    imagePlaceholder: 'svg-august',
    imageSrc: '/assets/avgust-na-podnose.jpg'
  },
  {
    id: 'september-morning',
    title: 'Сентябрьское утро',
    technique: 'Холст, масло',
    size: '40х40 см',
    price: 22000,
    priceFormatted: '22 000 ₽',
    inStock: true,
    category: 'watercolor',
    year: '2024',
    description: 'Уютный натюрморт в мягком утреннем свете. Медный кувшин-чайник с пышным букетом садовых астр, ажурная кружевная салфетка, спелые яблоки и россыпь алых ягод на серебристом блюдце.',
    imagePlaceholder: 'svg-morning',
    imageSrc: '/assets/sentyabrskoe-utro.jpg'
  },
  {
    id: 'lilac-etude',
    title: 'Сиреневый этюд',
    technique: 'Многослойная авторская акварель. Бумага, акварель',
    size: '40х30 см',
    price: 16000,
    priceFormatted: '16 000 ₽',
    inStock: true,
    category: 'watercolor',
    year: '2024',
    description: 'Многослойная авторская акварель высокой сложности. Тончайшие прозрачные лессировки передают воздушность сиреневых флоксов и астр, создавая неповторимый эффект внутреннего свечения.',
    imagePlaceholder: 'svg-lilac',
    imageSrc: '/assets/sirenevy-etud.jpg'
  },
  {
    id: 'krasny-lane',
    title: 'Переулок Красный. Этюд',
    technique: 'Холст, масло',
    size: '35х25 см',
    price: 14000,
    priceFormatted: '14 000 ₽',
    inStock: true,
    category: 'watercolor',
    year: '2024',
    description: 'Живописный пленэрный этюд русского провинциального городка. Старинный деревянный дом с резным крыльцом в кружевной тени весенних ветвей под ясным северным небом.',
    imagePlaceholder: 'svg-lane',
    imageSrc: '/assets/pereulok-krasny.jpg'
  },
  {
    id: 'winter-window',
    title: 'Окно в зиму',
    technique: 'Тонированная бумага, темпера',
    size: '40х30 см',
    price: 15000,
    priceFormatted: '15 000 ₽',
    inStock: true,
    category: 'graphics',
    year: '2024',
    description: 'Теплый образ домашнего уюта на фоне морозного дня. Стеклянный кувшин с золотистыми сухими цветами на подоконнике бревенчатого дома и тихий зимний снегопад за рамой.',
    imagePlaceholder: 'svg-winter',
    imageSrc: '/assets/okno-v-zimu.jpg'
  },
  {
    id: 'orange-accord',
    title: 'Оранжевый аккорд',
    technique: 'Бумага, акварель',
    size: '40х30 см',
    price: 16000,
    priceFormatted: '16 000 ₽',
    inStock: true,
    category: 'watercolor',
    year: '2024',
    description: 'Яркий, экспрессивный акварельный натюрморт. Пылающий букет цветов в терракотово-солнечных тонах, старинный расписной фарфоровый заварник и спелые садовые яблоки, наполняющие дом теплом и энергией.',
    imagePlaceholder: 'svg-orange',
    imageSrc: '/assets/oranzhevy-akkord.jpg'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'private-lessons',
    title: 'Частные уроки и подготовка',
    desc: 'Индивидуальный академический курс для поступающих в художественные вузы и желающих освоить рисунок с нуля. Постановка руки, штрих, законы перспективы и светотени.',
    price: '3 500 ₽',
    period: '/ занятие (2 часа)',
    badge: 'Академический базис'
  },
  {
    id: 'masterclasses',
    title: 'Авторские мастер-классы',
    desc: 'Камерные групповые встречи в мастерской художника (до 5 человек). Тонкости лессировочной акварели и смешанных графических техник. Профессиональные материалы включены.',
    price: '5 000 ₽',
    period: '/ сессия (3 часа)',
    badge: 'Камерные группы'
  },
  {
    id: 'art-consultation',
    title: 'Арт-консультации',
    desc: 'Профессиональный подбор картин под колористику и освещение вашего интерьера. Примерка в цифровом формате и написание индивидуальных полотен по брифу.',
    price: 'Бесплатно',
    period: 'при заказе полотна',
    badge: 'Для вашего дома'
  }
];
