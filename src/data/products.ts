export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
  category: string;
  collection?: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "CASUAL COMPANY POLO",
    price: 89.99,
    category: "polos",
    image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Polo classique en coton piqué avec logo brodé",
    colors: ["Noir", "Marine", "Gris"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "essential",
    isNewArrival: true
  },
  {
    id: "2",
    name: "WEEKEND BOMBER",
    price: 159.99,
    category: "vestes",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Bomber jacket léger avec détails contrastés",
    colors: ["Noir", "Kaki", "Marine"],
    sizes: ["S", "M", "L", "XL"],
    collection: "winter",
    isBestSeller: true
  },
  {
    id: "3",
    name: "URBAN TRACK TOP",
    price: 119.99,
    category: "sweats",
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Sweat zippé avec bandes latérales",
    colors: ["Noir", "Gris", "Bleu"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    collection: "winter",
    isNewArrival: true
  },
  {
    id: "4",
    name: "STREET STYLE HOODIE",
    price: 99.99,
    category: "sweats",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Hoodie streetwear avec design urbain",
    colors: ["Noir", "Blanc", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    collection: "street",
    isNewArrival: true
  },
  {
    id: "5",
    name: "URBAN CARGO PANTS",
    price: 129.99,
    category: "pantalons",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Pantalon cargo style urbain",
    colors: ["Noir", "Kaki"],
    sizes: ["S", "M", "L", "XL"],
    collection: "street",
    isNewArrival: true
  },
  {
    id: "6",
    name: "SPORT PERFORMANCE TEE",
    price: 49.99,
    category: "t-shirts",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "T-shirt technique pour le sport",
    colors: ["Noir", "Blanc", "Bleu"],
    sizes: ["S", "M", "L", "XL"],
    collection: "sport",
    isNewArrival: true
  },
  {
    id: "7",
    name: "SPORT SHORTS",
    price: 59.99,
    category: "shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Short de sport respirant",
    colors: ["Noir", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    collection: "sport",
    isBestSeller: true
  },
  {
    id: "8",
    name: "ESSENTIAL T-SHIRT",
    price: 39.99,
    category: "t-shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "T-shirt basique essentiel",
    colors: ["Blanc", "Noir", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    collection: "essential",
    isBestSeller: true
  },
  {
    id: 'fb6',
    name: 'FORTBLAKE CAP',
    price: 34.99,
    image: '/images/fortblake/forblake1.png',
    description: 'Casquette urbaine avec logo Fortblake brodé',
    colors: ['Noir', 'Blanc', 'Rouge'],
    sizes: ['Unique'],
    category: 'accessoires',
    collection: 'street',
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: 'fb7',
    name: 'FORTBLAKE WINTER BLACK SWEATSHIRT',
    price: 45.99,
    image: '/images/fortblake/fortblakeSweat.png',
    description: 'Sweat-shirt urbain au design minimaliste avec logo Fortblake',
    colors: ['Noir', 'Blanc', 'Rouge'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'sweats',
    collection: 'winter',
    isNewArrival: true
  },
  {
    id: 'fb8',
    name: 'FORTBLAKE CLASSIC DESERT POLOSHIRT',
    price: 45.99,
    image: '/images/fortblake/FORTBLAKEdesert.png',
    description: 'Polo classique en coton premium avec broderie Fortblake',
    colors: ['Noir', 'Blanc', 'Rouge'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'polos',
    collection: 'essential',
    isNewArrival: true,
    isBestSeller: true
  }
];

// Log pour vérifier que le fichier est bien chargé
console.log('Products loaded:', products.length, 'products found');
