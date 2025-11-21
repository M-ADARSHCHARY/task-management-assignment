import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = (user, res) => {
    
    const payload =  {_id: user._id};
    const token  = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '7d',});

    return res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });

}