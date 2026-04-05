export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Toast & Eggs" | "Main Course" | "Small Bites" | "Beverages";
  dietary?: string[];
  isSoldOut?: boolean;
}

export interface CartItem extends Dish {
  quantity: number;
  specialInstructions?: string;
  customizations?: string[];
}

export const DISHES: Dish[] = [
  {
    id: "1",
    name: "Kaya Butter Toast",
    description: "Crispy charcoal-grilled bread with thick slabs of cold butter and house-made pandan kaya.",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=1000&auto=format&fit=crop",
    category: "Toast & Eggs",
    dietary: ["Vegetarian"]
  },
  {
    id: "2",
    name: "Half-Boiled Eggs (2pcs)",
    description: "Perfectly timed soft-boiled eggs, served with white pepper and dark soy sauce.",
    price: 3.50,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000&auto=format&fit=crop",
    category: "Toast & Eggs",
    dietary: ["Vegetarian", "Gluten Free"]
  },
  {
    id: "3",
    name: "Nasi Lemak Ayam Berempah",
    description: "Fragrant coconut rice served with crispy spiced fried chicken, sambal, anchovies, and peanuts.",
    price: 16.90,
    image: "https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?auto=format&fit=crop&w=800&q=80",
    category: "Main Course"
  },
  {
    id: "4",
    name: "Char Kway Teow",
    description: "Wok-fried flat rice noodles with prawns, cockles, chinese sausage, and bean sprouts with 'wok hei'.",
    price: 14.50,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1000&auto=format&fit=crop",
    category: "Main Course"
  },
  {
    id: "5",
    name: "Curry Laksa",
    description: "Rich and spicy coconut curry broth with yellow noodles, shredded chicken, tofu puffs, and bean sprouts.",
    price: 15.50,
    image: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?q=80&w=1000&auto=format&fit=crop",
    category: "Main Course"
  },
  {
    id: "6",
    name: "Mee Rebus",
    description: "Yellow noodles served with a thick, spicy-sweet potato based gravy, garnished with hard-boiled egg and lime.",
    price: 12.90,
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1000&auto=format&fit=crop",
    category: "Main Course"
  },
  {
    id: "7",
    name: "Roti Canai (2pcs)",
    description: "Flaky, crispy flatbread served with dhal curry and sambal.",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1632778149975-420e0e75ee08?auto=format&fit=crop&w=800&q=80",
    category: "Small Bites",
    dietary: ["Vegetarian"]
  },
  {
    id: "8",
    name: "Chicken Satay (6pcs)",
    description: "Grilled chicken skewers marinated in local spices, served with peanut sauce, cucumber, and onions.",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80",
    category: "Small Bites"
  },
  {
    id: "9",
    name: "Otak-Otak",
    description: "Grilled fish cake made of ground fish meat mixed with spices and wrapped in banana leaves.",
    price: 8.50,
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=1000&auto=format&fit=crop",
    category: "Small Bites"
  },
  {
    id: "10",
    name: "Kopi Ice (Kopi Peng)",
    description: "Traditional Hainanese-style coffee with condensed milk, served over crushed ice.",
    price: 4.20,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1000&auto=format&fit=crop",
    category: "Beverages",
    dietary: ["Vegetarian"]
  },
  {
    id: "11",
    name: "Teh Tarik",
    description: "Frothy 'pulled' milk tea, a Malaysian classic with a smooth and creamy texture.",
    price: 3.80,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1000&auto=format&fit=crop",
    category: "Beverages",
    dietary: ["Vegetarian"]
  },
  {
    id: "12",
    name: "Cham Ice",
    description: "A perfect blend of traditional coffee and milk tea, served chilled.",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000&auto=format&fit=crop",
    category: "Beverages",
    dietary: ["Vegetarian"]
  },
  {
    id: "13",
    name: "Milo Dinosaur",
    description: "Iced Milo topped with a generous heap of undissolved Milo powder.",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    category: "Beverages",
    dietary: ["Vegetarian"]
  },
  {
    id: "14",
    name: "Cendol",
    description: "Shaved ice dessert with green rice flour jelly, coconut milk, and palm sugar syrup (gula melaka).",
    price: 6.90,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop",
    category: "Beverages",
    dietary: ["Vegetarian"]
  },
  {
    id: "15",
    name: "ABC (Air Batu Campur)",
    description: "Shaved ice with red beans, sweet corn, grass jelly, and colorful syrups.",
    price: 7.50,
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1000&auto=format&fit=crop",
    category: "Beverages",
    dietary: ["Vegetarian"]
  }
];
