const mongoose = require("mongoose")
const userschema = new mongoose.Schema({
username :{
    type : String,
    unique : [true , "try another username"],
    required : true
},
email :{
type : String ,
unique : [true , "user with email already exist"],
required : true 
},
password :{
type : String ,
required : true

},
gymcode :{
    type : String ,
    required : true
},
phonenumber : Number 

})
const usermodel = mongoose.model("user",userschema)
module.exports = usermodel

