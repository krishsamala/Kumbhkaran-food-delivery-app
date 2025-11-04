import hungryBrahminImg from '../assets/hungrybrahmin.png'; 
import dragonsLairImg from '../assets/dragonlair.png';   
import burgerblissImg from '../assets/burgerbliss.png';   
import pizzaImg from '../assets/pizza.png';   
import burgerImg from '../assets/burger.png'; 
import biryaniImg from '../assets/biryani.png'; 
import chineseImg from '../assets/chinese.png';
import DessertsImg from '../assets/dessert.png';
import HealthyImg from '../assets/salad.png';
import hakka from '../assets/hakkanoodles.png'

// --- Mock Data ---




export const mockCategories = [
{ name: 'Pizza', img: pizzaImg },
  { name: 'Burgers', img: burgerImg },
  { name: 'Indian', img: biryaniImg },
  { name: 'Chinese', img: chineseImg },
  { name: 'Desserts', img: DessertsImg },
  { name: 'Healthy', img: HealthyImg },
];

export const mockRestaurants = [
{
    id: 'r1',
    name: "The Hungry Brahmin",
    img: hungryBrahminImg,
    rating: 4.5,
    cuisine: "South Indian, North Indian",
    time: "30-40 min",
  },
  {
    id: 'r2',
    name: "Dragon's Lair",
    img: dragonsLairImg,
    rating: 4.2,
    cuisine: "Chinese, Thai",
    time: "25-35 min",
  },
  {
    id: 'r3',
    name: "Burger Bliss",
    img: burgerblissImg,
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
    img: pizzaImg,
  },
  {
    id: 'd2',
    name: 'Chicken Biryani',
    price: 350,
    restaurant: 'The Hungry Brahmin',
    img: biryaniImg,
  },
  {
    id: 'd3',
    name: 'Classic Cheeseburger',
    price: 250,
    restaurant: 'Burger Bliss',
    img: burgerImg,
  },
  {
    id: 'd4',
    name: 'Hakka Noodles',
    price: 220,
    restaurant: "Dragon's Lair",
    img: hakka,
  },
];

export const allSearchableItems = [...mockRestaurants, ...mockDishes];
