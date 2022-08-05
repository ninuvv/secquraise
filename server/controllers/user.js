import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
const secret = "test";


export const createUser = async (req, res) => {
  const { name,dob,gender,photo } = req.body;

  try {

    const result = await UserModel.create({
      name,dob,gender,photo
    });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    // const users = await UserModel.find();

    const users = await UserModel.aggregate([{
         $project:{ 
             name:1, 
             photo:1, 
             gender:1,dob:1,
             age:{ 
              $floor: { 
                 $divide: [ 
                   {$subtract: [ "$$NOW", "$dob" ]}, 
                  (365 * 24 * 60 * 60 * 1000) 
               ] 
              } 
            } 
           } 
    }])

    res.status(201).json(users);
  } catch (error) {
    res.status(404).json({ message: "something went wrong11" });
    console.log(error)
  }
};

export const userDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json({ message: "something went wrong111" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name,dob,gender,photo } = req.body;

  try {
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   console.log("ninu")
    //   return res.status(404).json(`No tour exist withid ${id} `);
    // }
    const updatedTour = {
      name,dob,gender,photo,
      _id: id,
    };
  
    await UserModel.findByIdAndUpdate(id, updatedTour, { new: true });
    res.status(201).json(updatedTour);
  } catch (error) {
    res.status(404).json({ message: "something went wrong6" });
  }

};

export const getUsersBySearch=async(req,res)=>{

  const {searchString}=req.query;
  console.log("serachstring"+searchString)
  try {
    const name=new RegExp(searchString,"i");
    const users=await UserModel.find({name});
    res.json(users);
  } catch (error) {
    res.status(404).json({ message: "something went wrong7" });
  }
}


export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id"+JSON.stringify(id))
    //   if (!mongoose.Types.ObjectId.isValid(id)) {      
    //   return res.status(404).json(`No tour exist withid ${id} `);
    // }
    await UserModel.findByIdAndRemove(id);
    res.status(201).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ message: "something went wrong5" });
  }
};

