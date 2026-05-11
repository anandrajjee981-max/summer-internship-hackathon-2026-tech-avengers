const jwt = require("jsonwebtoken")

const attendmodel = require("../model/attendence.model")

const usermodel = require("../model/usermodel")

// ENTRY CONTROLLER
async function attendenter(req, res) {

    try {

        // TOKEN
        const token = req.cookies.tokens

        if (!token) {

            return res.status(401).json({
                message: "token required"
            })
        }

        // VERIFY TOKEN
        let decoded

        try {

            decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            )

        } catch (err) {

            return res.status(401).json({
                message: "unauthorised access"
            })
        }

        // FIND USER
        const user = await usermodel.findById(decoded.id)

        if (!user) {

            return res.status(404).json({
                message: "user not found"
            })
        }

        // CHECK ALREADY INSIDE
        const alreadyinside =
        await attendmodel.findOne({

            user: user._id,

            status: "INSIDE"
        })

        if (alreadyinside) {

            return res.status(400).json({
                message: "user already inside"
            })
        }

        // CREATE ATTENDANCE
        const attendance =
        await attendmodel.create({

            user: user._id,

            gymcode: user.gymcode,

            entrytime: new Date(),

            status: "INSIDE",

            date: new Date()
            .toISOString()
            .split("T")[0]
        })

        res.status(201).json({

            message: "entry successful",

            attendance
        })

    } catch (err) {

        res.status(500).json({

            message: "internal server error",

            error: err.message
        })
    }
}

// EXIT CONTROLLER
async function attendexit(req, res) {

    try {

        // TOKEN
        const token = req.cookies.tokens

        if (!token) {

            return res.status(401).json({
                message: "token required"
            })
        }

        // VERIFY TOKEN
        let decoded

        try {

            decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            )

        } catch (err) {

            return res.status(401).json({
                message: "unauthorised access"
            })
        }

        // FIND USER
        const user = await usermodel.findById(decoded.id)

        if (!user) {

            return res.status(404).json({
                message: "user not found"
            })
        }

        // FIND ACTIVE SESSION
        const activeSession =
        await attendmodel.findOne({

            user: user._id,

            status: "INSIDE"
        })

        // USER ALREADY OUTSIDE
        if (!activeSession) {

            return res.status(400).json({
                message: "user already outside"
            })
        }

        // EXIT TIME
        activeSession.exittime =
        new Date()

        // STATUS UPDATE
        activeSession.status =
        "OUTSIDE"

        // DURATION
        activeSession.duration =
        Math.floor(

            (
                activeSession.exittime -
                activeSession.entrytime
            ) / 1000 / 60
        )

        // SAVE
        await activeSession.save()

        res.status(200).json({

            message: "exit successful",

            attendance: activeSession
        })

    } catch (err) {

        res.status(500).json({

            message: "internal server error",

            error: err.message
        })
    }
}

module.exports = {
    attendenter,
    attendexit
}