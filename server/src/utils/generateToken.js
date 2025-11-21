import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = (user, res) => {
    
    const payload =  {_id: user._id};
    const token  = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '7d',});

    return res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

}