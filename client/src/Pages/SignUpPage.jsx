import react, { useState } from "react";
import { userSignupThunk } from "../store/auth/authThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

  const [signupData, setSignupData] = useState({
      name:"",
      email:"",
      password:"",
      bio:"",
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
      setSignupData({ ...signupData,[e.target.name]: e.target.value,})
    }


    const handleSignup = async (e) => {
      e.preventDefault();
      // Implement signup logic here
      const response = await dispatch(userSignupThunk(signupData));
      console.log()
      if(response?.success){
        navigate("/");
        // Handle successful signup (e.g., redirect to dashboard)
      }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1A2F] px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-[#0F2A45] rounded-2xl shadow-xl p-8 text-white">

        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Create Account ✨
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSignup}>

          {/* Name */}
          <div>
            <label className="text-sm font-semibold">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={handleChange}
              className="w-full p-3 rounded-lg mt-1 bg-[#102B4A] text-white 
              border border-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#98B060]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              className="w-full p-3 rounded-lg mt-1 bg-[#102B4A] text-white 
              border border-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#98B060]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full p-3 rounded-lg mt-1 bg-[#102B4A] text-white 
              border border-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#98B060]"
            />
          </div>

          {/* Button */}
          <button type="submit"
            className="mt-2 bg-[#98B060] text-black font-semibold py-3 rounded-lg shadow-md 
            hover:bg-[#A4C66F] transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-5 text-gray-300">
          Already have an account?{" "}
          <button className="text-[#98B060] hover:underline cursor-pointer" onClick={()=>{navigate("/login")}}>
            Log in
          </button>
        </p>

      </div>
    </div>
  );
};

export default SignUpPage;
