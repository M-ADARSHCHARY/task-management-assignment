import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSideBarStatus } from "../store/auth/authSlice";
import { logoutUserThunk } from "../store/auth/authThunk";
import { Check, LayoutGrid, ListTodo, LogOut, User } from "lucide-react";

const SideBar = ({ isMobile = false, onClose })  => {
  const dispatch = useDispatch();
  const {sidebarStatus} = useSelector(state => state.auth);

  const handleChange = (e, status) => {
     e.preventDefault();
     dispatch(updateSideBarStatus(status));
     if(onClose){
      onClose();
     }
  }

  const handleLogout = () => {
    dispatch(logoutUserThunk());
    if(onClose){
      onClose();
    }
  }

  const layoutClasses = isMobile ? "flex flex-col" : "hidden lg:flex lg:flex-col";

  return (
    <aside className={`${layoutClasses} h-full lg:h-screen w-64 bg-blue-950 text-white p-5 gap-6`}> 

      {/* LOGO */}
      <div className="flex items-center gap-2 text-xl font-bold mb-4">
        <span className="text-green-400 text-2xl">
            <Check size={26} className="text-green-500" />

        </span>
        <span>TaskFlow</span>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-2 text-sm">

        {/* Dashboard */}
        <button onClick={(event)=>{handleChange(event, "dashboard")}} className={`flex items-center gap-3 px-4 py-2 hover:bg-blue-800 rounded-lg cursor-pointer transition  ${sidebarStatus === "dashboard" ? "bg-blue-800" : ""}`}>
          <LayoutGrid size={20} />
          <span>Dashboard</span>
        </button>

        {/* Tasks */}
        <button onClick={(event)=>{handleChange(event, "tasks")}}className={`flex items-center gap-3 px-4 py-2 hover:bg-blue-800 rounded-lg cursor-pointer transition  ${sidebarStatus === "tasks" ? "bg-blue-800" : ""}`}>
           <ListTodo size={20} /> 
          <span>Tasks</span>
        </button>

        {/* Profile */}
        <button onClick={(event)=>{handleChange(event, "profile")}} className={`flex items-center gap-3 px-4 py-2 hover:bg-blue-800 rounded-lg cursor-pointer transition  ${sidebarStatus === "profile" ? "bg-blue-800" : ""}`}>
           <User size={20} />   
          <span>Profile</span>
        </button>

        {/* Settings */}
        {/* <button  onClick={(event)=>{handleChange(event, "settings")}} className={`flex items-center gap-3 px-4 py-2 hover:bg-blue-700 rounded-lg cursor-pointer  ${sidebarStatus === "settings" ? "bg-blue-700" : ""}`}>
                 <Settings size={20} /> 
          <span>Settings</span>
        </button> */}

        {/* Logout */}
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 hover:bg-blue-800 rounded-lg cursor-pointer transition mt-4">
          <LogOut size={20} /> 
          <span>Logout</span>
        </button>

      </nav>
    </aside>
  );
}

export default SideBar;

