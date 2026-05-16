const express = require("express")
const userroutes = express.Router()
const usercontroller = require('../controller/user.controller')
userroutes.post("/register",usercontroller.registercontroller) 
userroutes.post("/login",usercontroller.logincontroller) 
userroutes.get("/getme",usercontroller.getme)
module.exports = userroutes