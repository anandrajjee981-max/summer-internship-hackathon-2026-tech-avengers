const express = require("express")
const userroutes = express.Router()
const usercontroller = require('../controller/user.controller')
userroutes.post("/register",usercontroller.registercontroller) 
userroutes.post("/login",usercontroller.logincontroller) 

module.exports = userroutes