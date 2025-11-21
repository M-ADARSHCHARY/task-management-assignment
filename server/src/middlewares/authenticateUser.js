import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
    

export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        
        if (!user) {
            return res.status(401).json({ message: "Invalid token, authorization denied" });
        }
        req.user = await User.findById(user._id).select("-password");
        next(); // Safe 
    }catch(error){
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }    

}