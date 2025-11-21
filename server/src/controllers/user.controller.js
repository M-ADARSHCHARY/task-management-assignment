import User from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';


export const userSignup = async (req, res) =>{
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide All fields"});
    }

    if(password.length < 6){
        return res.status(400).json({ message: "Password must be at least 6 characters long"});
    }

    const existingUser = await User.find({email});
    if(existingUser.length > 0){
        return res.status(400).json({ message: "User with this email already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword, 
    });
    await newUser.save();
    await generateToken(newUser, res);
    return res.status(201)
            .json({
                message: "User registered successfully",
                responseData: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    profilePicture: newUser.profilePicture,
                    bio: newUser.bio,
                },
                success:true,
            });
}

export const userLogin = async (req, res) => {
    try{
        const { email, password } = req.body;
        // console.log(req.body);

        if(!email || !password){
        return res.status(400).json({ message: "Please provide all fields"});
    }

    const user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({ message: "Invalid email or password"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({ message: "Invalid email or password"});
    }

    await generateToken(user, res);

    return res.status(200).json({
        message: "User logged in successfully",
        responseData: 
        {    
            id: user._id,
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
        },
        success: true,
    });
    }catch(error){
        return res.status(500)
               .json({
                 message: "Internal Server error", 
                 error: error.message 
                });
    }
}


export const getUserProfile = async (req, res) =>{
   
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({
            message: "User profile fetched successfully",
            responseData: user,
            success: true,
        });
    }catch(error){
        return res.status(500)
               .json({
                 message: "Internal Server error", 
                 responseData:[],
                 success:false,
                 error: error.message 
                }); 
    }
}


export const userLogout = async (req, res) => {
    
    res.clearCookie("token");
    return res.status(200).json({
        message: "User logged out successfully",
        success: true,
    });
}

export const checkAuth = (req, res) => {
    
    return res.status(200)
    .json({
         user: req.user,
         message: "User is authenticated",
         success:true,
        });
}