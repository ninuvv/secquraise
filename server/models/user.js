import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    dob:{type:Date,required:true},
    gender:{type:String,required:true},
    photo:{type:String,required:true},
  
},{timestamps:true})

export default mongoose.model("User",userSchema);