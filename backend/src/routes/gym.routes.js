const express = require("express")
const gymroutes = express.Router()
const gymcontroller = require('../controller/gym.controller')
gymroutes.post("/colab",gymcontroller.registercontroller)
gymroutes.post("/colablogin",gymcontroller.logincontroller)
gymroutes.get("/colabcount",gymcontroller.membercount)  
module.exports = gymroutes