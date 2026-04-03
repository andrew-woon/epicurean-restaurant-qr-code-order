export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Starters" | "Mains" | "Desserts" | "Drinks";
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
    name: "Truffle Wild Mushroom Risotto",
    description: "Arborio rice slow-cooked with woodland mushrooms and drizzled with white truffle oil.",
    price: 24.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOY9EdVuwxk3XhmLii-plL-v4zi43_QhEmg-aP0OHE8Es3_diYqoAU8bbVpFyrLXiXQV_7q_dtON-R-tMso_BssgkPccjxBFjaCmdc_5mF-bJarlM1OkvQInmiBSu01s_uE8wCgajFUIc6oEnx04KDjAEYMaoChefr1-LHRgcBSBvqnYSm1i5tBMmRXgtYveoKwZksrzGPe9ljveJmcPaPeGZh2CqyAvda4l-wcSv0uVe-9rSCpWovDFQfBevg0Gyh19h-Qh2DQ9gB",
    category: "Mains",
    dietary: ["Vegetarian", "Gluten Free"]
  },
  {
    id: "2",
    name: "Spiced Lamb Sliders",
    description: "Three mini brioche buns filled with harissa-spiced lamb and cooling mint yogurt.",
    price: 18.50,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvdUw4v0ghlSLZk34D-KM1M0TN7-tDB32sOUOqTYbWQhWA6BcnKS-6-3aYhrQlZxtKtmxs70A_8nsREaOjeWSE16C3yGX9W5PbLG1ZSAe_uZRsgouvjMmo3SHTKYHj4tAPSFo4Nuxxj8ncBBITlXFW1X2qZqwH19XIHwP7aKyZJ94QFyC4lqUe_Qdl6yUhzZ-gsiKmhBBs8uf0Y6EYaQb-HNOqgtv3OlKmYPVkHRF8L0pe40OitX7RRinM4GxhWxQjrCZqa_EXiaeA",
    category: "Starters",
    isSoldOut: true
  },
  {
    id: "3",
    name: "Heirloom Burrata Salad",
    description: "Fresh burrata, heirloom tomatoes, and aged balsamic reduction with garden basil.",
    price: 16.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEiNV-a3_yy8emYXqH2v9XcsjvfrM7p49PC1_rdlItqN1wE9tnmCYcbsRqKFhW4n2NMHfKlsHgUJ0uRH-ZTHHaGAcMMfpkdpx7GmBe99n3qqE9okHSwhlHs90L6wjdw8K0z9Przx6NQVsiGMyAoV2guzgyk2YBNv_IOPVbo2461CsPS85pw9y5AAVk9uJQZtP-6hRYcMwzJfX094xKz9Qo2xlUQZ9xKd5u_YEDBnC6qI2W6IVxOY_riN8eXqOpXIqF7LN5F0-Bvl1r",
    category: "Starters",
    dietary: ["Vegetarian", "Gluten Free"]
  },
  {
    id: "4",
    name: "Miso-Honey Glazed Salmon",
    description: "Sustainable salmon fillet glazed with umami-rich miso honey and seasonal greens.",
    price: 32.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWczsIk9qr43B0X57-OACR1mWw0HYc4yzBoLvlw_B9l9CdDNEORyNteGkqSkofYfu7qcw3KMVfYYdOdk_YsSGbuO24-SPlcFJBdeCh1ItDeM2r9hQP4ngjlP_XFSknUZZNgR4eI0v3a4HBO5W_TI00H6MiiHOco1bwP3HPIXT0hkj7cxGnL66sVtVO_71fPBYhEPEQIJXj1dI7dMJ_wfNBv3ma1s1TcpjT_-bw_9l3_brl5ObsU9A8D59_44RT02xsX0ZKB44J1Cbi",
    category: "Mains",
    dietary: ["Gluten Free"]
  },
  {
    id: "5",
    name: "Burrata & Hearth Peaches",
    description: "Aged balsamic, toasted pine nuts.",
    price: 18.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOKBDeNqH0-D-rJSuURyaK_drXTQpQS_8c9GX1jQo-tZ885uIMur8c5ThftZ8Ptf-xAgiNwZBTA5tTBCoxtkE2Yk4YPsO9ZDdzrZA5Eo-jJpaWaJfei8pQIgVf57PRjcAZZunp8fDmR-bEkMkSZw_vMGqjVvhAeWajEt4SZYFLTV1BBGiWVzIzdKeuUbeMWICs3RQdvtP5AkpKPyjqI1rivlM0FzJjdwbv2-mRxJmMUwKY-rcsjV6DDrMNjD8SoXJV3rRjXoG-PAm7",
    category: "Starters",
    dietary: ["Vegetarian"]
  },
  {
    id: "6",
    name: "Wood-Fired Octopus",
    description: "Saffron aioli, fingerling potatoes.",
    price: 26.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJTxCUHrAV2FtVOgsCoJHEf51Ger59z3nI8rwWL-k6W-aav03l9EixEtnMDCiXrNtYVx7GWVoXT-6wKRh7mrMYHOSoUt6CtNJMaftkdKNh5RTLxa_2mTuQv6ad8dzH6gHbgNk6W_nfLCT9G-Z25T4K1jT_LFg1ss1ao9uXXMXrPDKFFCXFH_U4NAHJsKdZMoT0MZMlTMlAfm56SWmnQpexLziCtDf5SSdZhIWbkpxr1A_GpCJJMBGd_t1j6E4abII1rGM_FtRKaDbN",
    category: "Starters",
    dietary: ["Gluten Free"]
  },
  {
    id: "7",
    name: "Botanical Spritz",
    description: "House-made gin, elderflower, citrus.",
    price: 14.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAL4cYkPnwNqu2Chnm86nbNwGazAKhIkmBquClD1SbukLsFfEjKd-ZMkGTVXqwpki49zqHw9RtZT-0nz6UsJS2Rh2GcvB1rqTWDBYycRMeMFWPIL6wzwH9GfblAeNKo29QBroWMamFeiAaUTaE3g4u1o3iub7Ll4HRRIBBC_ZhrKtoCrFhN9MzTzdra5qaAsLKekjYaZGvxYhnpCXOvHVYJZ8KbF5yd73H27gtZ2IlxGPrNXq4rJO2BdYrHIL9rMLYNsa-q0zNM-LS9",
    category: "Drinks"
  },
  {
    id: "8",
    name: "Garden Harvest Salad",
    description: "A vibrant assembly of organic baby greens, heirloom cherry tomatoes, sliced radishes, and toasted sunflower seeds. Served with a hand-whisked lemon-thyme vinaigrette and topped with creamy goat cheese crumbles.",
    price: 16.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARqj5OUW7DevQwRC3AApuXDZ-_JoP9H-ZMGJOUCb9T5piIgvmOHdn-djExmQmw5BNQi18skz7DASxsTc2rxTtqFI16Ub3-gpIy_R5YqwqZ329Ovviw_ARVKFJepE5ckKz9xhOQgpLPQIeWRWoJKumEw6rHdOE-j6i65HUizzkaMATDgtSupK0_t-_v6QnxEyMWiHOEEiwkZLDu6_io3hy7dzB7sNJRNYwW1-ieB241xMhc_b2OuCX5k2E57sil304nUU-9mYO_1xGu",
    category: "Starters",
    dietary: ["Vegetarian", "Gluten Free"]
  }
];
