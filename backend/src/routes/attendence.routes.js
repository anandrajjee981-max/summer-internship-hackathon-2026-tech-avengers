const express = require("express")
const attendroute = express.Router()
const attendcontroller = require('../controller/attendence.controller')
attendroute.post("/login/check",attendcontroller.scanattendence)
attendroute.get("/login/sheet",attendcontroller.attendencecount)
module.exports = attendroute
