import react, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { loginUserThunk } from '../store/auth/authThunk';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const [loginData, setLoginData] = useState({
    email:"",
    password:"",
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // e.preventDefault();
    setLoginData({ ...loginData,[e.target.name]: e.target.value,})
  }
  const handleUserLogin = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUserThunk(loginData));
    if(response?.status == 200){
      navigate("/");
      // Handle successful login (e.g., redirect to dashboard)
    } 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1A2F] px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-[#0F2A45] rounded-2xl shadow-xl p-8 text-white">

        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Welcome Back 👋
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleUserLogin}>
          
          {/* Email */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value = {loginData.email}
              onChange={handleChange}
              name="email"
              className="w-full p-3 rounded-lg mt-1 bg-[#102B4A] text-white border border-[#1E3A5F]
              focus:outline-none focus:ring-2 focus:ring-[#98B060]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={loginData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg mt-1 bg-[#102B4A] text-white border border-[#1E3A5F]
              focus:outline-none focus:ring-2 focus:ring-[#98B060]"
            />
          </div>

          {/* Button */}
          <button type="submit"
            className="mt-2 bg-[#22427d] text-black font-semibold py-3 rounded-lg shadow-md 
            hover:bg-[#A4C66F] transition-all"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm mt-5 text-gray-300">
          Don't have an account?{" "}
          <button className="text-[#98B060] hover:underline cursor-pointer" onClick={()=>{navigate("/signup")}}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
