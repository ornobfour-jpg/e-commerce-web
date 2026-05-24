import { Product } from './types';

export const EDITION_PRICES = {
  'Fan Edition': 599,
  'BD Premium Edition': 699,
  'Player Edition': 999,
};

export const POPULAR_CATEGORIES = [
  'Argentina', 'Brazil', 'Real Madrid', 'Barcelona', 'Manchester United', 'Arsenal',
  'Germany', 'France', 'Spain', 'England', 'Portugal', 'Bangladesh', 'Manchester City',
  'Chelsea', 'Liverpool', 'Bayern Munich', 'PSG', 'Juventus', 'AC Milan', 'Inter Milan'
];

const COUNTRY_DATA = [
  {
    name: 'Argentina',
    image: 'https://images.unsplash.com/photo-1614631446501-abcf76949eca?auto=format&fit=crop&w=800&q=80' // Argentina Jersey
  },
  {
    name: 'Brazil',
    image: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?auto=format&fit=crop&w=800&q=80' // Yellow Jersey
  },
  {
    name: 'Germany',
    image: 'https://images.unsplash.com/photo-1544607172-88229ca2b8da?auto=format&fit=crop&w=800&q=80' // White Jersey
  },
  {
    name: 'France',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=800&q=80' // Blue sport shirt
  },
  {
    name: 'Spain',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80' // Red Jersey
  },
  {
    name: 'England',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80' // White jersey field
  },
  {
    name: 'Portugal',
    image: 'https://images.unsplash.com/photo-1600181180556-9a2ccc10a514?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Bangladesh',
    image: 'https://images.unsplash.com/photo-1552318413-5a0ec77ee2d1?auto=format&fit=crop&w=800&q=80'
  },
];

const generateStock = (seed: number) => ({
  S: seed % 3 === 0 ? 0 : seed % 10 + 2,
  M: seed % 4 === 0 ? 0 : seed % 12 + 5,
  L: seed % 5 === 0 ? 0 : seed % 15 + 3,
  XL: seed % 2 === 0 ? 0 : seed % 8 + 1,
  XXL: seed % 7 === 0 ? 0 : seed % 5,
});

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    name: "Brazil World Cup 2026 Home Jersey",
    country: "Brazil",
    description: "Official Brazil national team home jersey for World Cup 2026. Engineered for performance and style.",
    images: ["https://i.postimg.cc/CLY6HjRx/AURORA-IB5143-724-PHSFH001-1500.jpg"],
    stock: generateStock(1),
    isWorldCup2026: true,
  },
  {
    id: "prod_2",
    name: "Brazil World Cup 2026 Away Jersey",
    country: "Brazil",
    description: "Official Brazil national team away jersey for World Cup 2026. Stand out with the iconic away colors.",
    images: ["https://i.postimg.cc/hPg3b9XP/image-faaff4b1-3cce-4935-b768-ee067601cf7f.jpg"],
    stock: generateStock(2),
    isWorldCup2026: true,
  },
  {
    id: "prod_3",
    name: "Argentina World Cup 2026 Home Jersey",
    country: "Argentina",
    description: "Official Argentina national team home jersey for World Cup 2026. The classic blue and white stripes.",
    images: ["https://i.postimg.cc/c4Z5MQv1/image-ab8f6ea2-c16a-4882-822e-aa52e9506054.png"],
    stock: generateStock(3),
    isWorldCup2026: true,
  },
  {
    id: "prod_4",
    name: "Argentina World Cup 2026 Away Jersey",
    country: "Argentina",
    description: "Official Argentina national team away jersey for World Cup 2026. Premium synthetic fabric.",
    images: ["https://i.postimg.cc/HWbhySkj/image-34bb69f4-73f6-4267-8f24-1f652c62db4e.jpg"],
    stock: generateStock(4),
    isWorldCup2026: true,
  },
  {
    id: "prod_5",
    name: "Portugal World Cup 2026 Home Jersey",
    country: "Portugal",
    description: "Official Portugal national team home jersey for World Cup 2026.",
    images: ["https://i.postimg.cc/zDTcgdX4/image-0c8a09d2-f012-494a-acd8-524248c421bd.jpg"],
    stock: generateStock(5),
    isWorldCup2026: true,
  },
  {
    id: "prod_6",
    name: "Portugal World Cup 2026 Away Jersey",
    country: "Portugal",
    description: "Official Portugal national team away jersey for World Cup 2026.",
    images: ["https://i.postimg.cc/XN9zC2YV/FIFAMZ0368-1.png"],
    stock: generateStock(6),
    isWorldCup2026: true,
  },
  {
    id: "prod_7",
    name: "Spain World Cup 2026 Home Jersey",
    country: "Spain",
    description: "Official Spain national team home jersey for World Cup 2026. Unleash the fury.",
    images: ["https://i.postimg.cc/dQGxyWVK/image-8b6f5358-fe86-4ed5-96dc-051e62e3e943.png"],
    stock: generateStock(7),
    isWorldCup2026: true,
  },
  {
    id: "prod_8",
    name: "Spain World Cup 2026 Away Jersey",
    country: "Spain",
    description: "Official Spain national team away jersey for World Cup 2026.",
    images: ["https://i.postimg.cc/BZ2VKhn4/image-9010dbcf-a2b4-40d0-a818-43835ebd6047.jpg"],
    stock: generateStock(8),
    isWorldCup2026: true,
  },
  {
    id: "prod_9",
    name: "France World Cup 2026 Home Jersey",
    country: "France",
    description: "Official France national team home jersey for World Cup 2026.",
    images: ["https://i.postimg.cc/NGRzHNjq/image-97c7b304-c8ac-48bb-b2a2-d6349ac9c33a.jpg"],
    stock: generateStock(9),
    isWorldCup2026: true,
  },
  {
    id: "prod_10",
    name: "France World Cup 2026 Away Jersey",
    country: "France",
    description: "Official France national team away jersey for World Cup 2026.",
    images: ["https://i.postimg.cc/WzmYc4H4/image-7b7e6576-fc29-4cee-8175-4b43134ebd88.jpg"],
    stock: generateStock(10),
    isWorldCup2026: true,
  }
];
