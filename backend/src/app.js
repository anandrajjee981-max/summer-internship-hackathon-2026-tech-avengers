const express = require("express")
const app = express()
const cors = require("cors")
const cookieparser = require("cookie-parser")
app.use(express.json())
app.use(cookieparser())
app.use(cors())
const userroutes = require('../src/routes/user.routes')
app.use("/api/auth",userroutes)

module.exports = app

//  https://summer-internship-hackathon-2026-tech.onrender.com