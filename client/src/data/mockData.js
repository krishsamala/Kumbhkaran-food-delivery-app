import hungryBrahminImg from '../assets/hungrybrahmin.png'; 
import dragonsLairImg from '../assets/dragonlair.png';   
import burgerblissImg from '../assets/burgerbliss.png';   
import pizzaImg from '../assets/pizza.png'; 
import pizza2 from '../assets/pizza2.png';   
import pizza3 from '../assets/pizza3.png'; 
import pizza3d from '../assets/pizza3d.png';   
import burgerImg from '../assets/burger.png'; 
import burger2 from '../assets/burger2.png'; 
import burger3d from '../assets/burger3d.png'; 
import biryaniImg from '../assets/biryani.png';
import biryani2 from '../assets/biryani2.png'; 
import biryani3d from '../assets/biryani3d.png'; 
import chineseImg from '../assets/chinese.png';
import chinese3d from '../assets/chinese3d.png';
import DessertsImg from '../assets/dessert.png';
import Desserts3d from '../assets/dessert3d.png';
import HealthyImg from '../assets/salad.png';
import Healthy3d from '../assets/salad3d.png';
import hakka from '../assets/hakkanoodles.png'
import Nonginis from '../assets/Nonginis.png'
import BFcake from '../assets/Cake.png'
import highway from '../assets/Highway.png'
import pizzabut from '../assets/pizzabut.png'
import paneer from '../assets/panner.png'
import Manchurian from '../assets/manchurian.jpeg'
import waffle from '../assets/waffle.jpeg'
import tikkawrap from '../assets/tikkawrap.png'

// --- Mock Data ---

export const mockCategories3d = [
{ name: 'Pizza', img: pizza3d },
  { name: 'Burgers', img: burger3d },
  { name: 'Indian', img: biryani3d },
  { name: 'Chinese', img: chinese3d },
  { name: 'Desserts', img: Desserts3d },
  { name: 'Healthy', img: Healthy3d },
];


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
  {
    id: 'd7',
    name: 'Veggie Paradise Pizza',
    price: 559,
    restaurant: 'Pizza BUT',
    img: pizza2,
    categoryName: 'Pizza', // <-- ADD THIS
  },
  {
    id: 'd8',
    name: 'Chicken Dominator Pizza',
    price: 709,
    restaurant: 'Pizza BUT',
    img: pizza3,
    categoryName: 'Pizza', // <-- ADD THIS
  },
  {
    id: 'd9',
    name: 'Paneer Biryani',
    price: 459,
    restaurant: 'The Hungry Brahmin',
    img: biryani2,
    categoryName: 'Indian', // <-- ADD THIS
  },
  {
    id: 'd10',
    name: 'Triple Whopper Cheeseburger',
    price: 495,
    restaurant: 'Burger Bliss',
    img: burger2,
    categoryName: 'Burgers', // <-- ADD THIS
  },
  {
    id: 'd11',
    name: 'Veg Manchurian',
    price: 289,
    restaurant: "Dragon's Lair",
    img: Manchurian,
    categoryName: 'Chinese', // <-- ADD THIS
  },
  {
    id: 'd12',
    name: 'Brownie Waffle',
    price: 349,
    restaurant: "Nonginis",
    img: waffle,
    categoryName: 'Desserts', // <-- ADD THIS
  },
  {
    id: 'd13',
    name: 'Chicken Tikka Wrap',
    price: 409,
    restaurant: "Highway",
    img: tikkawrap,
    categoryName: 'Healthy', // <-- ADD THIS
  },
  // Add more dishes here with their categoryName
];

export const allSearchableItems = [...mockRestaurants, ...mockDishes];
