import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
import jwt_decode from 'jwt-decode';
const secret='test';

const auth=async(req,res,next)=>{
    try {
        const token= req.headers.authorization.split(' ')[1];
          const isCustomAuth=token.length<500;
        let decodedToken

        if(token && isCustomAuth){
            decodedToken=jwt.verify(token,secret);
            req.userId=decodedToken?.id;
        }else{
           
            decodedToken=jwt_decode(token)
            const googleId=decodedToken?.sub;          
            const user=await UserModel.findOne({googleId});                      
            req.userId=user?._id
           
        }
        next()
    } catch (error) {
        console.log(error)
    }
};

export default auth;