export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Tees" | "Hoodies" | "Bottoms" | "Accessories";
  description: string;
  image: string;
  sizes: string[];
};

export const products: Product[] = [
  {
    id: "1",
    name: "GULF GRID TEE",
    price: 180,
    category: "Tees",
    description: "Heavyweight 240gsm cotton tee with pure black construction. Minimalist grid graphic screen-printed on the chest. Designed in Doha.",
    image: "/images/product-1.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "2",
    name: "DOHA NIGHTS HOODIE",
    price: 380,
    category: "Hoodies",
    description: "Ultra-heavy 400gsm fleece hoodie. Raw edges, oversized fit, drop shoulder. Made for the midnight heat.",
    image: "/images/product-2.png",
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: "3",
    name: "CIRCUIT CARGO PANTS",
    price: 320,
    category: "Bottoms",
    description: "Tactical ripstop cargo pants with 8 functional pockets. Adjustable drawstrings at the ankle. Stark black finish.",
    image: "/images/product-3.png",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "4",
    name: "SANDS SNAPBACK",
    price: 120,
    category: "Accessories",
    description: "Structured 5-panel snapback. Stealth embroidered VINTRIX logo. Flat brim, raw finish.",
    image: "/images/product-4.png",
    sizes: ["OS"],
  },
  {
    id: "5",
    name: "GULF HEAT LONGSLEEVE",
    price: 220,
    category: "Tees",
    description: "Breathable long sleeve for layered fits. Subtle ribbing on cuffs. Sharp, uncompromising cut.",
    image: "/images/product-5.png",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "6",
    name: "VINTRIX LOGO HOODIE",
    price: 350,
    category: "Hoodies",
    description: "The core piece. Distressed ghost logo across the chest. Double-lined hood, heavy drawstrings.",
    image: "/images/product-6.png",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "7",
    name: "DESERT STORM JOGGERS",
    price: 280,
    category: "Bottoms",
    description: "Heavy fleece joggers with a structured, aggressive silhouette. Side zip pockets. Matte black hardware.",
    image: "/images/product-7.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "8",
    name: "BRASS CHAIN NECKLACE",
    price: 160,
    category: "Accessories",
    description: "Raw industrial chain. Dark silver finish. Weighs heavy on the neck. An anchor.",
    image: "/images/product-8.png",
    sizes: ["OS"],
  },
];
