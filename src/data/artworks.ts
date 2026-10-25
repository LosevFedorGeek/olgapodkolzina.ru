import { Artwork, ServiceItem } from '../types';

export const ARTIST_CONTACTS = {
  name: 'Ольга Подколзина',
  phone: '+7 (921) 717-71-47',
  phoneRaw: '+79217177147',
  email: 'ovpodkolzina@yandex.ru',
  location: 'Вологодская область, Бабаевский район, г. Бабаево',
  education: 'Череповецкий государственный университет, художественно-графический факультет (1995–2000)',
  vkPersonal: 'https://vk.ru/id218728523',
  vkGroup: 'https://vk.ru/id218728523',
  vkUrl: 'https://vk.ru/id218728523',
  telegram: 'https://t.me/+79217177147',
  telegramUrl: 'https://t.me/+79217177147',
  max: 'https://max.ru/+79217177147',
  maxUrl: 'https://max.ru/+79217177147'
};

export const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: 'dyhanie-vesny',
    title: 'Дыхание весны',
    technique: 'Тонированная бумага, сухая пастель',
    size: '30х40 см',
    year: '2026',
    category: 'graphics',
    inStock: true,
    price: 17000,
    priceFormatted: '17 000 ₽',
    imageSrc: '/assets/dyhanie-vesny.jpg',
    description:
      'Проникновенный лирический пейзаж о пробуждении северной природы. Бархатистая фактура сухой пастели тонко передает прозрачный весенний воздух, подтаявший мартовский снег и золотистый солнечный свет на стволах берез.'
  },
  {
    id: 'osennee-teplo',
    title: 'Осеннее тепло',
    technique: 'Бумага, акварель',
    size: '40х30 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 18000,
    priceFormatted: '18 000 ₽',
    imageSrc: '/assets/osennee-teplo.jpg',
    description:
      'Многослойная академическая акварель с глубокими медово-охристыми и багряными рефлексами. Натюрморт со спелой тыквой, керамическим кувшином полевых трав и гроздьями рябины наполняет пространство теплом домашнего очага.'
  },
  {
    id: 'barhat-sada',
    title: 'Бархат сада',
    technique: 'Тонированная бумага, соус (Графика)',
    size: '40х30 см',
    year: '2026',
    category: 'graphics',
    inStock: true,
    price: 18000,
    priceFormatted: '18 000 ₽',
    imageSrc: '/assets/barhat-sada.jpg',
    description:
      'Редкая графическая техника соуса на тонированной бумаге. Глубокие бархатные тени и деликатная растушевка подчеркивают хрупкую пластику белых соцветий и спелых гроздьев черноплодной рябины.'
  },
  {
    id: 'sirenevyj-etyud',
    title: 'Сиреневый этюд',
    technique: 'Бумага, многослойная авторская акварель',
    size: '40х30 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 16000,
    priceFormatted: '16 000 ₽',
    imageSrc: '/assets/sirenevy-etud.jpg',
    description:
      'Воздушный цветочный натюрморт, выполненный методом тончайших прозрачных лессировок. Жемчужно-сиреневые и аметистовые оттенки лепестков создают эффект живого внутреннего свечения акварельного листа.'
  },
  {
    id: 'sentyabrskoe-utro',
    title: 'Сентябрьское утро',
    technique: 'Холст, масло',
    size: '40х40 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 22000,
    priceFormatted: '22 000 ₽',
    imageSrc: '/assets/sentyabrskoe-utro.jpg',
    description:
      'Классическая масляная живопись в квадратном формате. Пышный букет садовых астр в старинном медном чайнике, ажурное кружево скатерти и спелые яблоки передают поэзию тихого сентябрьского утра.'
  },
  {
    id: 'oranzhevyj-akkord',
    title: 'Оранжевый аккорд',
    technique: 'Бумага, акварель',
    size: '40х30 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 16000,
    priceFormatted: '16 000 ₽',
    imageSrc: '/assets/oranzhevy-akkord.jpg',
    description:
      'Экспрессивный и солнечный акварельный натюрморт. Контраст пламенеющего осеннего букета, расписного фарфорового заварника и холодной синевы драпировки создает бодрящий цветовой аккорд в интерьере.'
  },
  {
    id: 'pereulok-krasnyj',
    title: 'Переулок Красный. Этюд',
    technique: 'Холст, масло',
    size: '35х25 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 14000,
    priceFormatted: '14 000 ₽',
    imageSrc: '/assets/pereulok-krasny.jpg',
    description:
      'Натурный пленэрный этюд маслом, запечатлевший уютный уголок деревянной архитектуры русского Севера. Фактурный пастозный мазок передает игру весеннего солнца на бревенчатых стенах и лазурном небе.'
  },
  {
    id: 'okno-v-zimu',
    title: 'Окно в зиму',
    technique: 'Тонированная бумага, темпера',
    size: '40х30 см',
    year: '2026',
    category: 'graphics',
    inStock: true,
    price: 15000,
    priceFormatted: '15 000 ₽',
    imageSrc: '/assets/okno-v-zimu.jpg',
    description:
      'Камерная работа темперой на тонированной бумаге. Теплое золото сухоцветов в глиняном кувшине на деревянном подоконнике перекликается с тихим серебристым снегопадом за оконным стеклом.'
  },
  {
    id: 'avgust-na-podnose',
    title: 'Август на подносе',
    technique: 'Холст, масло',
    size: '45х35 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 23000,
    priceFormatted: '23 000 ₽',
    imageSrc: '/assets/avgust-na-podnose.jpg',
    description:
      'Торжественный летний натюрморт маслом на холсте. Солнечный букет садовых ромашек и золотистых хризантем в сочетании с наливными яблоками излучает щедрость и безмятежность августа.'
  },
  {
    id: 'buket',
    title: 'Букет',
    technique: 'Бумага, акварель',
    size: '50х33 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 5000,
    priceFormatted: '5 000 ₽',
    imageSrc: '/assets/aistudio/_________________________50_33__5_000_9bf14bfc.jpg',
    description:
      'Свежая акварельная композиция с пышными шапками розово-сиреневых флоксов и белоснежными садовыми ромашками. Живые переливы цвета и мягкие касания кисти передают аромат цветущего летнего сада.'
  },
  {
    id: 'cvety-sentyabrya',
    title: 'Цветы сентября',
    technique: 'Бумага, акварель',
    size: '41х30 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 5000,
    priceFormatted: '5 000 ₽',
    imageSrc: '/assets/aistudio/__________________________________41_30__5000_9e9a12b2.jpg',
    description:
      'Утонченный акварельный букет в стеклянном сосуде: белоснежные осенние астры, золотистые соцветия гортензии и темные ягоды черемухи и рябины в окружении багряной листвы.'
  },
  {
    id: 'utrennij-buket',
    title: 'Утренний букет',
    technique: 'Бумага, акварель',
    size: '50х33 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 8000,
    priceFormatted: '8 000 ₽',
    imageSrc: '/assets/aistudio/__________________________50_33__8_000_703e59ff.jpg',
    description:
      'Изысканный весенний натюрморт акварелью. Бархатные фиолетовые ирисы и воздушные гроздья белой сирени в прозрачном стекле наполнены солнечными брызгами и свежестью майского утра.'
  },
  {
    id: 'prazdnik-vesny',
    title: 'Праздник весны',
    technique: 'Бумага, акварель',
    size: '40х56 см',
    year: '2022',
    category: 'watercolor',
    inStock: true,
    price: 10000,
    priceFormatted: '10 000 ₽',
    imageSrc: '/assets/aistudio/________________40_56__10_000_240d53bb.jpg',
    description:
      'Крупноформатный акварельный натюрморт со сложной игрой рефлексов на узорчатой сине-белой драпировке, фарфоровым кувшином весенних цветов, солнечными нарциссами и прозрачным стеклом.'
  },
  {
    id: 'antichnyj-motiv',
    title: 'Античный мотив',
    technique: 'Бумага, акварель',
    size: '41х30 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 5000,
    priceFormatted: '5 000 ₽',
    imageSrc: '/assets/aistudio/__________________________________41_30__5_000_bddc1c51.jpg',
    description:
      'Академический натюрморт в благородной винно-терракотовой гамме: античная статуэтка, старинная шкатулка с алой лентой, расписная ваза с сухими соцветиями гортензии и нить темного жемчуга.'
  },
  {
    id: 'belye-piony',
    title: 'Белые пионы',
    technique: 'Бумага, акварель',
    size: '40х50 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 7000,
    priceFormatted: '7 000 ₽',
    imageSrc: '/assets/aistudio/_______________________________c357e9b1.jpg',
    description:
      'Пышный букет нежно-розовых и жемчужно-белых пионов в керамической вазе. Богатство акварельных фактур и мягкие переходы тона передают трепетную нежность живых лепестков.'
  },
  {
    id: 'letnie-kraski',
    title: 'Летние краски',
    technique: 'Бумага, акварель',
    size: '40х57 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 10000,
    priceFormatted: '10 000 ₽',
    imageSrc: '/assets/aistudio/_________________________________40_57__10_000_84515d99.jpg',
    description:
      'Праздничный крупноформатный натюрморт: сочные ломти сахарного арбуза, спелая черешня, веточки красной смородины и малиновые пионы на фоне глубокой кобальтовой драпировки.'
  },
  {
    id: 'letnie-travy',
    title: 'Летние травы',
    technique: 'Тонированная бумага, акварель, графика',
    size: '40х30 см',
    year: '2026',
    category: 'graphics',
    inStock: true,
    price: 4000,
    priceFormatted: '4 000 ₽',
    imageSrc: '/assets/aistudio/______________40_30__________________4000_5c6ea824.jpg',
    description:
      'Изящная ботаническая композиция в смешанной технике на теплом охристом фоне. Тонкий графический контур в сочетании с акварельными заливками раскрывает поэзию северного разнотравья.'
  },
  {
    id: 'natyurmort-s-gipsom',
    title: 'Натюрморт с гипсом',
    technique: 'Бумага, гуашь',
    size: '42х59 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 6000,
    priceFormatted: '6 000 ₽',
    imageSrc: '/assets/aistudio/___________________________________42_59__6000_39b3f71a.jpg',
    description:
      'Яркий декоративный натюрморт с сочной оранжевой тыквой, веточками физалиса в темном стекле, металлическим кофейником и белым ботаническим рельефом на выразительном алом фоне.'
  },
  {
    id: 'blagoveshchenskaya-cerkov-v-ustyuzhne',
    title: 'Благовещенская церковь в Устюжне',
    technique: 'Тонированная бумага, сухая пастель',
    size: '30х40 см',
    year: '2025',
    category: 'graphics',
    inStock: true,
    price: 4000,
    priceFormatted: '4 000 ₽',
    imageSrc: '/assets/aistudio/________________________________________________________________30_40__4000_692a38a8.jpg',
    description:
      'Архитектурный пейзаж сухой пастелью на тонированной бумаге. Величественный силуэт православного храма с шатровой колокольней и старинными наличниками согрет мягким северным светом.'
  },
  {
    id: 'letnij-buket',
    title: 'Летний букет',
    technique: 'Бумага, акварель',
    size: '53х33 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 10000,
    priceFormatted: '10 000 ₽',
    imageSrc: '/assets/aistudio/________________________________53_33__10_000_d6a24942.jpg',
    description:
      'Выразительная авторская акварель вытянутого вертикального формата. Глубокие сапфировые и лиловые соцветия флоксов в сочетании с бордовыми садовыми колокольчиками создают богатую цветовую симфонию.'
  },
  {
    id: 'letnij-polden',
    title: 'Летний полдень',
    technique: 'Тонированная бумага, сухая пастель',
    size: '30х40 см',
    year: '2025',
    category: 'graphics',
    inStock: true,
    price: 5000,
    priceFormatted: '5 000 ₽',
    imageSrc: '/assets/aistudio/______________________________________________30_40__5000_6f453885.jpg',
    description:
      'Солнечный лесной пейзаж пастелью на фактурной охристой бумаге. Могучие стволы вековых сосен, нагретые солнцем валуны и глубокие синие тени передают тишину и величие северного бора.'
  },
  {
    id: 'belaya-noch',
    title: 'Белая ночь',
    technique: 'Бумага, акварель',
    size: '50х33 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 6000,
    priceFormatted: '6 000 ₽',
    imageSrc: '/assets/aistudio/______________________________50_33__6000_ddad06aa.jpg',
    description:
      'Поэтический весенний натюрморт с бело-зелеными тюльпанами, кружевом голубых незабудок, стеклянными сосудами и бирюзовым подсвечником, залитыми утренним светом.'
  },
  {
    id: 'buket-roz',
    title: 'Букет роз',
    technique: 'Бумага, акварель',
    size: '36х26 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 4500,
    priceFormatted: '4 500 ₽',
    imageSrc: '/assets/aistudio/________________________36_26__4500_1453bedd.jpg',
    description:
      'Камерный акварельный букет в хрустальной граненой вазе. Чайные розы нежного кремово-розового оттенка гармонично оттеняются насыщенными малиновыми соцветиями.'
  },
  {
    id: 'malvy-i-delfinium',
    title: 'Мальвы и дельфиниум',
    technique: 'Бумага, акварель',
    size: '40х30 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 4000,
    priceFormatted: '4 000 ₽',
    imageSrc: '/assets/aistudio/_______________________________________40_30__4000_91c1379d.jpg',
    description:
      'Светлая прозрачная акварель с высокими сине-фиолетовыми свечами дельфиниума и трепетными розовыми цветами садовой мальвы на воздушном солнечном фоне.'
  },
  {
    id: 'hrizantemy',
    title: 'Хризантемы',
    technique: 'Холст, масло',
    size: '30х35 см',
    year: '2026',
    category: 'watercolor',
    inStock: true,
    price: 4000,
    priceFormatted: '4 000 ₽',
    imageSrc: '/assets/aistudio/__________________________30_35__4000_8f2659da.jpg',
    description:
      'Лирический натюрморт маслом на холсте. Нежно-розовые садовые цветы в глянцевой кобальтовой вазе на мягких складках светлой драпировки написаны живым, свободным мазком.'
  },
  {
    id: 'vesennij-natyurmort',
    title: 'Весенний натюрморт',
    technique: 'Бумага, акварель',
    size: '40х30 см',
    year: '2021',
    category: 'watercolor',
    inStock: true,
    price: 4000,
    priceFormatted: '4 000 ₽',
    imageSrc: '/assets/aistudio/______________________________________40_30__4000_a0917dd5.jpg',
    description:
      'Солнечная акварельная композиция на контрасте золотисто-желтых нарциссов и глубокого сапфирово-фиолетового заварника на узорчатой ткани.'
  },
  {
    id: 'piony-i-chereshnya',
    title: 'Пионы и черешня',
    technique: 'Бумага, акварель',
    size: '56х40 см',
    year: '2025',
    category: 'watercolor',
    inStock: true,
    price: 7500,
    priceFormatted: '7 500 ₽',
    imageSrc: '/assets/aistudio/___________________________________56_40__7500_2eb597ad.jpg',
    description:
      'Богатый по колориту крупноформатный натюрморт с бархатными бордовыми пионами в рельефной вазе, нежными анютиными глазками в прозрачном бокале и спелыми ягодами вишни.'
  }
];

export const ARTWORKS = INITIAL_ARTWORKS;

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'private-lessons',
    badge: 'Индивидуальный подход',
    title: 'Частные академические уроки',
    desc: 'Персональные занятия (очно или онлайн с детальным видеоразбором). Постановка руки, законы композиции, светотень и сложные многослойные лессировки.',
    price: '3 500 ₽',
    period: 'за занятие (2 акад. часа)'
  },
  {
    id: 'masterclass',
    badge: 'Творческое погружение',
    title: 'Авторские мастер-классы',
    desc: 'Создание законченного произведения за один сеанс под чутким руководством мастера. Изучение фактурных приемов акварели, пастели или соуса. Все материалы включены.',
    price: '5 000 ₽',
    period: 'интенсив (3 часа, материалы включены)'
  },
  {
    id: 'art-consultation',
    badge: 'Для коллекционеров и дизайнеров',
    title: 'Арт-консультация и подбор',
    desc: 'Профессиональный подбор живописи и графики для вашего дома или кабинета. Консультация по колористическому решению, выбору багета, паспарту и музейного стекла.',
    price: 'Бесплатно',
    period: 'при заказе или покупке картины'
  }
];

export const SERVICES = INITIAL_SERVICES;
