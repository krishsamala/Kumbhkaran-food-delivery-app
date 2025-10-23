// --- Mock Data ---
// All the data is now in one place.

export const mockCategories = [
{ name: 'Pizza', img: 'https://placehold.co/100x100/f87171/ffffff?text=Pizza' },
  { name: 'Burgers', img: 'https://placehold.co/100x100/fb923c/ffffff?text=Burgers' },
  { name: 'Indian', img: 'https://placehold.co/100x100/facc15/ffffff?text=Indian' },
  { name: 'Chinese', img: 'https://placehold.co/100x100/a3e635/ffffff?text=Chinese' },
  { name: 'Desserts', img: 'https://placehold.co/100x100/4ade80/ffffff?text=Desserts' },
  { name: 'Healthy', img: 'https://placehold.co/100x100/34d399/ffffff?text=Healthy' },
];

export const mockRestaurants = [
{
    id: 'r1',
    name: "The Hungry Brahmin",
    img: 'https://placehold.co/600x400/fb923c/ffffff?text=The+Hungry+Brahmin',
    rating: 4.5,
    cuisine: "South Indian, North Indian",
    time: "30-40 min",
  },
  {
    id: 'r2',
    name: "Dragon's Lair",
    img: 'https://placehold.co/600x400/f87171/ffffff?text=Dragon%27s+Lair',
    rating: 4.2,
    cuisine: "Chinese, Thai",
    time: "25-35 min",
  },
  {
    id: 'r3',
    name: "Burger Bliss",
    img: 'https://placehold.co/600x400/facc15/ffffff?text=Burger+Bliss',
    rating: 4.7,
    cuisine: "American, Fast Food",
    time: "15-25 min",
  },
];

export const mockDishes = [
{
    id: 'd1',
    name: 'Margherita Pizza',
    price: 299,
    restaurant: 'Pizza Paradise',
    img: 'https://placehold.co/600x400/ef4444/ffffff?text=Margherita+Pizza',
  },
  {
    id: 'd2',
    name: 'Chicken Biryani',
    price: 350,
    restaurant: 'The Hungry Brahmin',
    img: 'https://placehold.co/600x400/f97316/ffffff?text=Chicken+Biryani',
  },
  {
    id: 'd3',
    name: 'Classic Cheeseburger',
    price: 250,
    restaurant: 'Burger Bliss',
    img: 'https://placehold.co/600x400/eab308/ffffff?text=Cheeseburger',
  },
  {
    id: 'd4',
    name: 'Hakka Noodles',
    price: 220,
    restaurant: "Dragon's Lair",
    img: 'https://placehold.co/600x400/84cc16/ffffff?text=Hakka+Noodles',
  },
];

export const allSearchableItems = [...mockRestaurants, ...mockDishes];
