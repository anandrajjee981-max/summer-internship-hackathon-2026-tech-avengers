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
const gymroutes = require('../src/routes/gym.routes')
const attendroutes = require('../src/routes/attendence.routes')
app.use("/api/auth",userroutes)
app.use("/api/auths",gymroutes)   
app.use("/api",attendroutes)

module.exports = app

//  https://summer-internship-hackathon-2026-tech.onrender.com