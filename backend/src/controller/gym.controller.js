const gymmodel = require('../model/gymmodel')              
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const QRCode = require("qrcode")
const usermodel = require('../model/usermodel')
async function registercontroller(req,res){
  const { gymname, email, password, phonenumber, gymcode } = req.body

  const ifemail = await gymmodel.findOne({ email })
  if(ifemail){
    return res.status(400).json({
      message : "User with this email already exists"
    })
  }

  const hash = await bcrypt.hash(password,10)

  const gym = await gymmodel.create({
    gymname,
    email,
    password: hash,
    phonenumber,
    gymcode
  })

  // 🔥 QR GENERATE HERE
  const qrimage = await QRCode.toDataURL(
    JSON.stringify({
      gymcode: gym.gymcode,
      gymId: gym._id
    })
  )

  // (optional but recommended) save QR in DB
  gym.qr = qrimage
  await gym.save()

  const token = jwt.sign(
    { id: gym._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

        res.cookie("tokens", token, {
            httpOnly: true,
            secure: true,      // Required for HTTPS
            sameSite: "none",  // Required for Cross-Origin cookie transmission
            maxAge: 24 * 60 * 60 * 1000 // 1 Day expiration
        });

  res.status(201).json({
    message: "register successfully",
    qrimage, // 🔥 send QR to frontend

    gym: {
      email: gym.email,
      gymname: gym.gymname,
      phonenumber: gym.phonenumber,
      gymcode: gym.gymcode
    }
  })
}

async function logincontroller(req, res) {

  const { gymname, password } = req.body

  const gym = await gymmodel.findOne({ gymname })

  if (!gym) {
    return res.status(404).json({
      message: "gym not exist"
    })
  }

  const ispasswordvalid = await bcrypt.compare(
    password,
    gym.password
  )

  if (!ispasswordvalid) {
    return res.status(401).json({
      message: "invalid password"
    })
  }

  const token = jwt.sign(
    { id: gym._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

        res.cookie("tokens", token, {
            httpOnly: true,
            secure: true,      // Required for HTTPS
            sameSite: "none",  // Required for Cross-Origin cookie transmission
            maxAge: 24 * 60 * 60 * 1000 // 1 Day expiration
        });

  // 🔥 QR GENERATE ON LOGIN ALSO (optional)
  const qrimage = await QRCode.toDataURL(
    JSON.stringify({
      gymcode: gym.gymcode,
      gymId: gym._id
    })
  )

  res.status(200).json({
    message: "login successfully",
    qrimage, // 🔥 frontend will show this

    user: {
      email: gym.email,
      gymname: gym.gymname,
      phonenumber: gym.phonenumber
    }
  })
}

async function membercount(req, res) {

  try {

    // TOKEN
    const token = req.cookies.tokens

    if (!token) {
      return res.status(401).json({
        message: "token expired relogin"
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

    // FIND GYM
    const gym = await gymmodel.findById(decoded.id)

    if (!gym) {

      return res.status(404).json({
        message: "gym not found"
      })
    }

    // FIND USERS OF THIS GYM
 const users = await usermodel.find(
  { gymcode: gym.gymcode },
  "username email"
)

    // RESPONSE
    res.status(200).json({

      message: "member list fetched successfully",

      totalmembers: users.length,
users 
      
    })

  } catch (err) {

    res.status(500).json({
      message: err.message
    })
  }
}


module.exports = {
  registercontroller,
  logincontroller ,
  membercount
}


