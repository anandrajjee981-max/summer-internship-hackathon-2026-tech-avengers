const usermodel = require('../model/usermodel')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registercontroller(req,res){
const {username , email , password , phonenumber} = req.body
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
const hash = await bcrypt.hash(password,10)
const user = await usermodel.create({
    username,
    email,
    password: hash,
    phonenumber
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
        phonenumber : user.phonenumber 
    }
})


}

async function logincontroller(req,res){
const {username , password} = req.body
const user = usermodel.findOne({username})
if(!user){
    return res.status(404).json({
        message : "user name not exist"
    })
}
const ispasswordvalid = await bcrypt.compare(password ,user.password)
if(!ispasswordvalid){
       return res.status(404).json({
        message : "invalid password "
    })
}
const token = jwt.sign({
    id : user._id
},
process.env.JWT_SECRET , {expiresIn : "1d"}
)
res.cookie("tokens",token)
res.status(201).json({
    mesaage : "login sucessfully",
    user :{
        email : user.email ,
        username : user.username ,
        phonenumber : user.phonenumber 
    }
})

}

module.exports = {
    registercontroller , logincontroller
}
