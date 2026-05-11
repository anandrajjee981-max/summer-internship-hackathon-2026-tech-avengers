const express = require("express")
const attendroute = express.Router()
const attendcontroller = require('../controller/attendence.controller')
attendroute.post("/login/enter",attendcontroller.attendenter)
attendroute.post("/login/exit",attendcontroller.attendexit)
module.exports = attendroute
