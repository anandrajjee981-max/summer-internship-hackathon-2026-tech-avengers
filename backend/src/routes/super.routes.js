const express = require("express")
const superroute = express.Router()
const supercontrol = require('../controller/super.controller')
superroute.post("/super",supercontrol.registercontroller)
superroute.post("/superlogin",supercontrol.logincontroller)
superroute.get("/gym",supercontrol.gymdetail)


module.exports = superroute