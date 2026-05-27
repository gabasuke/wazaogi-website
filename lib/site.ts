import {
  Beef,
  CalendarDays,
  Clock,
  CreditCard,
  Fish,
  Flame,
  Footprints,
  Leaf,
  Martini,
  MessageCircle,
  Phone,
  Star,
  UsersRound,
  Vegan,
  Wine
} from "lucide-react";

export const INSTAGRAM_URL = "https://instagram.com/xxxxx";
export const INSTAGRAM_HANDLE = "@wazaogi";

export const restaurant = {
  name: "鉄板居酒屋 わざおぎ",
  shortName: "わざおぎ",
  addressJa: "沖縄県石垣市大川287-2 ミカサ商事ビル1F",
  addressEn: "1F Mikasa Shoji Building, 287-2 Okawa, Ishigaki, Okinawa",
  accessJa: "730交差点・バスターミナル徒歩4〜5分",
  accessEn: "4-5 min walk from the 730 intersection and bus terminal",
  hours: "17:00〜翌1:00",
  hoursEn: "5:00 PM – 1:00 AM",
  budget: "3,000〜5,000円",
  phone: "0980-00-0000",
  line: "https://line.me/",
  tabelog: "https://tabelog.com/",
  hotpepper: "https://www.hotpepper.jp/",
  instagram: INSTAGRAM_URL
};

export const navItems = ["about", "menu", "gallery", "features", "access", "reserve"] as const;

export const menuIconMap = {
  nebanebaRoll: Flame,
  teppanMeat: Beef,
  teppanVeg: Vegan,
  ishigakiBeef: Beef,
  sashimi: Fish,
  umibudu: Leaf,
  awamori: Wine,
  drinks: Martini
};

export const menuImages = {
  nebanebaRoll: "/images/menu-nebaneba-roll.svg",
  teppanMeat: "/images/menu-teppan-meat.svg",
  teppanVeg: "/images/menu-teppan-veg.svg",
  ishigakiBeef: "/images/menu-ishigaki-beef.svg",
  sashimi: "/images/menu-sashimi.svg",
  umibudu: "/images/menu-umi-budo.svg",
  awamori: "/images/menu-awamori.svg",
  drinks: "/images/menu-drinks.svg"
};

export const galleryImages = [
  { key: "counter", src: "/images/gallery-counter.svg" },
  { key: "table", src: "/images/gallery-table.svg" },
  { key: "interior", src: "/images/gallery-interior.svg" },
  { key: "zashiki", src: "/images/gallery-zashiki.svg" },
  { key: "cooking", src: "/images/gallery-cooking.svg" }
];

export const featureIconMap = {
  late: Clock,
  monday: CalendarDays,
  card: CreditCard,
  walk: Footprints,
  local: UsersRound
};

export const reservationCards = [
  {
    key: "line",
    href: restaurant.line,
    icon: MessageCircle,
    className: "from-[#06C755] to-[#2F7D5E]"
  },
  {
    key: "tabelog",
    href: restaurant.tabelog,
    icon: Star,
    className: "from-[#D72638] to-[#8A1C25]"
  },
  {
    key: "hotpepper",
    href: restaurant.hotpepper,
    icon: Phone,
    className: "from-[#FF9F43] to-[#E85D04]"
  }
];
