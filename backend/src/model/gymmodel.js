const mongoose = require("mongoose")
const gymschema = new mongoose.Schema({
gymname :{
    type : String, 
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
    unique : [true , "write another gym code"],
    required : true
},
phonenumber : Number 

})
const gymmodel = mongoose.model("gym",gymschema)
module.exports = gymmodel

