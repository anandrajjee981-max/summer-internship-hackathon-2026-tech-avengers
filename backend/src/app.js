const express = require("express")
const app = express()

const cors = require("cors")
const cookieparser = require("cookie-parser")

app.use(express.json())

app.use(cookieparser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get("/", (req,res)=>{
    res.send("API running")
})

const userroutes = require('../src/routes/user.routes')

app.use("/api/auth",userroutes)

module.exports = app

//  https://summer-internship-hackathon-2026-tech.onrender.com