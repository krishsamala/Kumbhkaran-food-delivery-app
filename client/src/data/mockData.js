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
import Nonginis from '../assets/Nonginis.png'
import BFcake from '../assets/Cake.png'
import highway from '../assets/Highway.png'
import pizzabut from '../assets/pizzabut.png'
import paneer from '../assets/panner.png'

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
  {
    id: 'r4',
    name: "Nonginis",
    img: Nonginis,
    rating: 4.5,
    cuisine: "Dessert, Ice-Cream",
    time: "15-25 min",
  },
  {
    id: 'r5',
    name: "Highway",
    img: highway,
    rating: 4.3,
    cuisine: "Healthy, Salad",
    time: "35-45 min",
  },
  {
    id: 'r6',
    name: "Pizza BUT",
    img: pizzabut,
    rating: 4.52,
    cuisine: "Italian, Pizza",
    time: "20-25 min",
  },
];



export const mockDishes = [
  {
    id: 'd1',
    name: 'Margherita Pizza',
    price: 299,
    restaurant: 'Pizza BUT',
    img: pizzaImg,
    categoryName: 'Pizza', // <-- ADD THIS
  },
  {
    id: 'd2',
    name: 'Chicken Biryani',
    price: 350,
    restaurant: 'The Hungry Brahmin',
    img: biryaniImg,
    categoryName: 'Indian', // <-- ADD THIS
  },
  {
    id: 'd3',
    name: 'Classic Cheeseburger',
    price: 250,
    restaurant: 'Burger Bliss',
    img: burgerImg,
    categoryName: 'Burgers', // <-- ADD THIS
  },
  {
    id: 'd4',
    name: 'Hakka Noodles',
    price: 220,
    restaurant: "Dragon's Lair",
    img: hakka,
    categoryName: 'Chinese', // <-- ADD THIS
  },
  {
    id: 'd5',
    name: 'Black Forest Cake',
    price: 340,
    restaurant: "Nonginis",
    img: BFcake,
    categoryName: 'Desserts', // <-- ADD THIS
  },
  {
    id: 'd6',
    name: 'Paneer Sandwich',
    price: 210,
    restaurant: "Highway",
    img: paneer,
    categoryName: 'Healthy', // <-- ADD THIS
  },
  // Add more dishes here with their categoryName
];

export const allSearchableItems = [...mockRestaurants, ...mockDishes];
