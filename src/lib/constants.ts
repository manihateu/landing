export const WEDDING_DATE = new Date("2026-09-18T09:00:00+03:00");

export const TIMELINE = [
  {
    type: "event",
    time: "13:00",
    title: "Церемония",
    venue: "ЗАГС",
    description: "Болгар, ул. Пионерская д.44",
    icon: "heart",
    yandexUrl:
      "https://yandex.ru/maps/20014/bolgar/house/pionerskaya_ulitsa_44/YEAYdgVjSkcOQFtufXV5c3VjYQ==/?ll=49.023329%2C54.982905&z=17",
  },
  {
    type: "event",
    time: "15:00",
    title: "Банкет",
    venue: "Ресторан «Регина»",
    description: "Болгар, ул. Горького д. 30",
    icon: "wine",
    yandexUrl:
      "https://yandex.ru/maps/?text=%D0%91%D0%BE%D0%BB%D0%B3%D0%B0%D1%80%2C%20%D1%83%D0%BB.%20%D0%93%D0%BE%D1%80%D1%8C%D0%BA%D0%BE%D0%B3%D0%BE%2C%2030",
  },
  {
    type: "section",
    title: "Второй день",
  },
  {
    type: "event",
    time: "10:00",
    title: "Отдых на природе",
    venue: "Колодец Габдрахмана",
    description: "Шашлыки, уха, красивые виды",
    icon: "trees",
    yandexUrl:
      "https://yandex.ru/maps/?text=%D0%9A%D0%BE%D0%BB%D0%BE%D0%B4%D0%B5%D1%86+%D0%93%D0%B0%D0%B1%D0%B4%D1%80%D0%B0%D1%85%D0%BC%D0%B0%D0%BD%D0%B0+%D0%91%D0%BE%D0%BB%D0%B3%D0%B0%D1%80",
  },
  {
    type: "event",
    time: "Вечером",
    title: "Продолжение праздника",
    venue: "Домик в отеле «Регина»",
    description: "Бассейн, уютный вечер в кругу близких",
    icon: "home",
    yandexUrl:
      "https://yandex.ru/maps/?text=%D0%BE%D1%82%D0%B5%D0%BB%D1%8C+%D0%A0%D0%B5%D0%B3%D0%B8%D0%BD%D0%B0+%D0%91%D0%BE%D0%BB%D0%B3%D0%B0%D1%80",
  },
] as const;

export const HOST_CONTACT = {
  name: "Галина Владимировна",
  phone: "+79600429149",
  phoneDisplay: "+7 (960) 042-91-49",
  socialUrl: "https://vk.com/origalya",
  socialLabel: "VK",
} as const;

export const DRINK_OPTIONS = [
  "Вино белое полусладкое",
  "Вино красное полусладкое",
  "Водка",
  "Самогон",
  "Шампанское",
  "Безалкогольные напитки",
] as const;

export const TELEGRAM_LINKS = {
  nikita: "https://t.me/nikita_placeholder",
  polina: "https://t.me/polina_placeholder",
} as const;

export const STORY_TEXT = `Дорогие друзья и близкие!

Мы с радостью приглашаем вас разделить с нами один из самых важных дней в нашей жизни. Это история о двух людях, которые когда-то были просто знакомыми, а теперь стали семьёй.

Наша встреча произошла совсем не по сценарию романтических фильмов — случайно, неожиданно, но именно так, как и должно было быть. С первых разговоров мы поняли, что между нами что-то особенное: лёгкость, доверие и ощущение, что мы знаем друг друга целую вечность.

Годы шли, и вместе с ними росла наша любовь. Мы переживали радости и трудности, мечтали, планировали, смеялись до слёз и поддерживали друг друга в самые непростые моменты. Каждый день рядом друг с другом убеждал нас: мы нашли своего человека.

И вот настал день, когда мы готовы официально сказать «да» — друг другу и всему миру. Мы хотим, чтобы вы были рядом в этот день, наполнили его своим теплом, улыбками и любовью.

С любовью,
Никита и Полина`;
