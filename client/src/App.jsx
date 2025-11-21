import react, {useState, useEffect} from 'react'
import LoginPage from './Pages/LoginPage'
import {Routes, Route, Navigate} from 'react-router-dom'
import {checkAuthThunk} from './store/auth/authThunk.js'
import { useSelector, useDispatch } from 'react-redux'
import SignUpPage from './Pages/SignUpPage.jsx'
import DashBoard from './Pages/DashBoard.jsx'
import { Toaster } from "react-hot-toast";

function App() {
  const {authUser, isAuthenticated} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkAuthThunk());
  }, []);
 
  return (
    <>
    <div>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={ authUser ? <DashBoard/> : <Navigate to="/login"/>} />
        <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/signup" element={ !authUser ? <SignUpPage /> : <Navigate to="/"/>} />
      </Routes>
    </div>
    </>
  )
}

export default App
