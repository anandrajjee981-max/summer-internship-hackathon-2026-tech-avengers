const express = require("express")
const attendroute = express.Router()
const attendcontroller = require('../controller/attendence.controller')
attendroute.post("/login/check",attendcontroller.scanattendence)

module.exports = attendroute
