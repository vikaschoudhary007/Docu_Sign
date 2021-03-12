const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.signUp = async (req,res) => {
    try{
        const {name, email, password} = req.body;

        //validation

        if(!name || !email || !password){
            return res.status(400).json({errorMessage: "Please enter all require fields"});
        }

        if(password.length < 6){
            return res.status(400).json({errorMessage: "Please enter a password of atleast 6 characters"});
        }
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({errorMessage: "An account with this email address already exists"});
        }

        // Hash the password

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Saving the User to DB

        const newUser = new User({
            name,email,passwordHash
        })

        const savedUser = await newUser.save();

        // Login the User

        const token = jwt.sign({
            user: savedUser._id
        }, process.env.JWT_SECRET);

        // send the token in a http-only cookie

        res.cookie("token", token, {
            httpOnly: true
        }).send();


    }catch(err) {
        console.log(err);
        res.status(500).send();
    }
}

exports.signIn = async (req,res) => {
    try{

        const {email, password} = req.body;

        // validation

        if(!email || !password){
            return res.status(400).json({errorMessage: "Please enter all require fields"});
        }

        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(401).json({errorMessage: "Wrong email or password"});
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);

        if(!passwordCorrect){
            return res.status(401).json({errorMessage: "Wrong email or password"});
        }

        // Sign the token

        const token = jwt.sign({
            user: existingUser._id
        }, process.env.JWT_SECRET);

        // send the token in a http-only cookie

        res.cookie("token", token, {
            httpOnly: true
        }).send();
      

    }catch(err){
        console.log(err);
        res.status(500).send();
    }
}

exports.signOut = (req,res) => {
    res.cookie("token", "", {
        httpOnly:true,
        expires: new Date(0)
    }).send();
}

exports.loggedIn = (req,res) => {
    try{

        const token = req.cookies.token;

        if(!token){
            return res.json(false);
        }

       jwt.verify(token, process.env.JWT_SECRET);
      
       res.send(true);
    }catch(err){
        console.log(err);
        res.json(false);
    }
}