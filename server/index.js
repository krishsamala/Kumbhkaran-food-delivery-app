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

app.get('/profile', (req, res) => {
  // Check if the user is logged in by looking for the session
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  //  Use the ID from the session to find the user in the database
  UserModel.findById(req.session.userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // 3. Send back the user's name and email
      res.json({ name: user.name, email: user.email });
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