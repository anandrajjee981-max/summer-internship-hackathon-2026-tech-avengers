const usermodel = require('../model/usermodel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gymmodel = require('../model/gymmodel');

async function registercontroller(req, res) {
    try {
        const { username, email, password, phonenumber, gymcode } = req.body;
        
        const ifemail = await usermodel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (ifemail) {
            return res.status(400).json({ // Corrected status to 400 for validation
                message: ifemail.email === email ? "User with this email already exists" : "User with this username already exists"
            });
        }

        const code = await gymmodel.findOne({ gymcode });

        if (!code) {
            return res.status(404).json({
                message: "Enter correct gym code"
            });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await usermodel.create({
            username,
            email,
            password: hash,
            phonenumber,
            gymcode
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("tokens", token, {
            httpOnly: true,
            secure: true,      // Required for HTTPS (Vercel & Render use HTTPS)
            sameSite: "none",  // Required for Cross-Origin cookie transmission
            maxAge: 24 * 60 * 60 * 1000 // 1 Day expiration
        });

        return res.status(201).json({
            message: "Registered successfully",
            user: {
                email: user.email,
                username: user.username,
                phonenumber: user.phonenumber,
                gymcode: user.gymcode
            }
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function logincontroller(req, res) {
    try {
        const { username, password, gymcode } = req.body;

        const user = await usermodel.findOne({ username });

        if (!user) {
            return res.status(404).json({
                message: "Username does not exist"
            });
        }

        // Gymcode Verification Check
        if (user.gymcode !== gymcode) {
            return res.status(403).json({
                message: "Invalid gym code for this user account"
            });
        }

        const ispasswordvalid = await bcrypt.compare(
            password,
            user.password
        );

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
            secure: true,      // Required for HTTPS
            sameSite: "none",  // Required for Cross-Origin cookie transmission
            maxAge: 24 * 60 * 60 * 1000 // 1 Day expiration
        });

        return res.status(200).json({
            message: "Login successfully",
            user: {
                email: user.email,
                username: user.username,
                phonenumber: user.phonenumber,
                gymcode: user.gymcode
            }
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    registercontroller,
    logincontroller
};