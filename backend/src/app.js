const express = require("express");
const app = express();

const cors = require("cors");
const cookieparser = require("cookie-parser");

// 1. CORS MUST BE FIRST (especially for handling preflight OPTIONS requests)
const allowedOrigins = [
  'http://localhost:5173', // For local development
  'https://summer-internship-hackathon-2026-te.vercel.app' // For production Vercel deployment
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));

// 2. Standard Body & Cookie Parsers
app.use(express.json());
app.use(cookieparser());

// 3. Routes
const userroutes = require('../src/routes/user.routes');
const gymroutes = require('../src/routes/gym.routes');
const attendroutes = require('../src/routes/attendence.routes');

app.use("/api/auth", userroutes);
app.use("/api/auths", gymroutes);   
app.use("/api", attendroutes);

module.exports = app;