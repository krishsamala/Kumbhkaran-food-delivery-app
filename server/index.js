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

mongoose.connect("mongodb://localhost:27017/user")
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



// This route gets the logged-in user's data

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


// 2. UPDATE YOUR EXISTING /profile route
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

app.post('/register', (req, res)=>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3001, () =>{
    console.log("server is running")
})