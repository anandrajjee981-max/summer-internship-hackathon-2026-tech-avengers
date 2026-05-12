const mongoose = require("mongoose")
const superschema = new mongoose.Schema({
username :{
    type : String,
    unique : [true , "try another username"],
    required : true
},

password :{
type : String ,
required : true

},

phonenumber : Number 

})
const supermodel = mongoose.model("boss",superschema)
module.exports = supermodel

