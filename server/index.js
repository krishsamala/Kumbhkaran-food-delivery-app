const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require('express-session'); 
const cookieParser = require('cookie-parser');
const UserModel=require('./models/User.js')

const app= express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}));

mongoose.connect("mongodb+srv://krish:krishsv601@cluster0.8rl9k9b.mongodb.net/user")
app.use(cookieParser());


app.use(session({ 
  secret: 'my-super-secret-key-for-kumbhkaran', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if you are on HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

//this is for handling login auth
app.post("/login", (req, res)=>{
    const {email, password}= req.body
    UserModel.findOne({email: email})
    .then(user=>{
        if(user){
            if(user.password === password){                
                
                req.session.userId = user._id;
                req.session.name = user.name;

                res.json("Success")
            }else{
                res.json("incorrect password")
            }
        }
        else{
            res.json("No record existed")
        }
    })
})



// this is for the logged-in user's address

app.post('/add-address', (req, res) => {
    // Check if the user is logged in from their session
    if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    const newAddress = req.body; // Get the address data from the frontend

    // Find the user by their ID and push the new address into their 'addresses' array
    UserModel.findByIdAndUpdate(
        req.session.userId,
        { $push: { addresses: newAddress } }, // $push adds an item to an array
        { new: true } // This option returns the updated user document
    )
    .then(updatedUser => {
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // Send back a success message and the new list of addresses
        res.json({ success: true, addresses: updatedUser.addresses });
    })
    .catch(err => res.status(500).json(err));
});


// this is for showing user info in the accountpage
app.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  UserModel.findById(req.session.userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // UPDATE: Send the addresses along with name and email
      res.json({ 
          name: user.name, 
          email: user.email, 
          addresses: user.addresses // <-- THIS IS THE NEW PART
      });
    })
    .catch(err => res.status(500).json(err));
});

//this is for registring in the signup page
app.post('/register', (req, res)=>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


//  GET USER'S FAVORITES 
app.get('/favorites', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    UserModel.findById(req.session.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user.favorites); // Send back the array of favorite IDs
        })
        .catch(err => res.status(500).json(err));
});


// ADD/REMOVE A FAVORITE 

app.post('/favorites/toggle', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    const { dishId } = req.body;

    UserModel.findById(req.session.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if the dish is already a favorite
            const index = user.favorites.indexOf(dishId);

            if (index > -1) {
                // It exists, so remove it
                user.favorites.splice(index, 1);
            } else {
                // It doesn't exist, so add it
                user.favorites.push(dishId);
            }

            // Save the updated user
            return user.save();
        })
        .then(updatedUser => {
            // Send back the new list of favorites
            res.json({ success: true, favorites: updatedUser.favorites });
        })
        .catch(err => res.status(500).json(err));
});



app.listen(3001, () =>{
    console.log("server is running")
})