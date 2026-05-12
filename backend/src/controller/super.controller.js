const supermodel = require('../model/super.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gymmodel = require('../model/gymmodel');

async function registercontroller(req, res) {
    try {
        // 1. Added missing fields to destructuring so they aren't undefined
        const { username,  password } = req.body;
        
        // 2. Simplified the look-up for existing unique fields
        const ifUserExists = await supermodel.findOne({
              username
        });

        if (ifUserExists) {
            return res.status(400).json({ 
                message: ifUserExists.email === email 
                    ? "User with this email already exists" 
                    : "User with this username already exists"
            });
        }

        // Hash password and create user
        const hash = await bcrypt.hash(password, 10);
        const user = await supermodel.create({
            username,
       
            password: hash,
        
        });

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Set Cookie
        res.cookie("tokens", token, {
            httpOnly: true,
            secure: true,      // Required for HTTPS (Vercel, Render, etc.)
            sameSite: "none",  // Required for Cross-Origin cookies
            maxAge: 24 * 60 * 60 * 1000 // 1 Day
        });

        return res.status(201).json({
            message: "Registered successfully",
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function logincontroller(req, res) {
    try {
        const { username, password } = req.body;

        const user = await supermodel.findOne({ username });

        if (!user) {
            return res.status(404).json({
                message: "Username does not exist"
            });
        }

        const ispasswordvalid = await bcrypt.compare(password, user.password);

        if (!ispasswordvalid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("tokens", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successfully",
            user: {
               
                username: user.username,
              
         
            }
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function gymdetail(req, res) {
    try {
      
        const details = await gymmodel.find({}); 

        if (!details || details.length === 0) {
            return res.status(404).json({
                message: "Database madhe ekhi gym bhetli nahi.",
                gymdetail: []
            });
        }

        return res.status(200).json({
            message: "gym details",
            gymdetail: details
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// 4. Exporting gymdetail so your router can access it
module.exports = {
    registercontroller,
    logincontroller,
    gymdetail
};