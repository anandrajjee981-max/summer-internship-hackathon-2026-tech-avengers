const usermodel = require('../model/usermodel')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const gymmodel = require('../model/gymmodel')
async function registercontroller(req,res){
const {username , email , password , phonenumber,gymcode} = req.body
const ifemail = await usermodel.findOne({
    $or:[
        {username},
        {email}
    ]
})
if(ifemail){
    return res.status(404).json({
        message : ifemail.email === email ? "user with this email already exist" : "user with this username already exist"
    })
}
const code = await gymmodel.findOne({ gymcode })

if (!code) {
    return res.status(404).json({
        message: "enter correct gym code"
    })
}

const hash = await bcrypt.hash(password,10)
const user = await usermodel.create({
    username,
    email,
    password: hash,
    phonenumber,
    gymcode
})
const token = jwt.sign({
    id: user._id
},
process.env.JWT_SECRET,
{ expiresIn: "1d" }
)
res.cookie("tokens",token)
res.status(201).json({
    mesaage : "register sucessfully",
    user :{
        email : user.email ,
        username : user.username ,
        phonenumber : user.phonenumber ,
        gymcode : user.gymcode
    }
})


}

async function logincontroller(req, res) {

    const { username, password } = req.body

    const user = await usermodel.findOne({ username })

    if (!user) {
        return res.status(404).json({
            message: "user name not exist"
        })
    }

    const ispasswordvalid = await bcrypt.compare(
        password,
        user.password
    )

    if (!ispasswordvalid) {
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("tokens", token)

    res.status(200).json({
        message: "login successfully",
        user: {
            email: user.email,
            username: user.username,
            phonenumber: user.phonenumber
        }
    })
}
module.exports = {
    registercontroller , logincontroller
}
