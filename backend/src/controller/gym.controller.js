const gymmodel = require('../model/gymmodel')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const QRCode = require("qrcode")

async function registercontroller(req,res){
const {gymname , email , password , phonenumber , gymcode} = req.body
const ifemail = await gymmodel.findOne({email})
if(ifemail){
    return res.status(404).json({
        message : "user with this email already exist" 
    })
}
const hash = await bcrypt.hash(password,10)

const gym = await gymmodel.create({
    gymname,
    email,
    password: hash,
    phonenumber ,
    gymcode 
})
const token = jwt.sign({
    id: gym._id
},
process.env.JWT_SECRET,
{ expiresIn: "1d" }
)
res.cookie("tokens",token)
res.status(201).json({
    mesaage : "register sucessfully",
    gym :{
        email : gym.email ,
        gymname : gym.gymname ,
        phonenumber : gym.phonenumber ,
        gymcode : gym.gymcode
    }
})


}

async function logincontroller(req, res) {

    const { gymname, password ,gymcode} = req.body

    const gym = await gymmodel.findOne({ gymname })

    if (!gym) {
        return res.status(404).json({
            message: "gym name not exist"
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
        {
            id: gym._id
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("tokens", token)

    res.status(200).json({
        message: "login successfully",
        user: {
            email: gym.email,
            gymname: gym.gymname,
            phonenumber: gym.phonenumber
        }
    })
}

module.exports = {
    registercontroller , logincontroller 
}
