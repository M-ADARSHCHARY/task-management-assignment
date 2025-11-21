import React from 'react'
import Header from '../Components/Header'
import StatsGrid from '../Components/StatsGrid'
import TaskSection from '../Components/TaskSection'
import SideBar from '../Components/SideBar'
import { useSelector } from 'react-redux'
import Profile from './Profile'
import TaskModal from '../Components/TaskModal'
import Footer from '../Components/Footer'

const DashBoard = () => {

  const {sidebarStatus} = useSelector(state => state.auth);
  const {createTaskStatus, editTaskStatus} = useSelector(state => state.tasks);
  return (
    <>
    
    <div className="grid min-h-screen h-screen grid-cols-1 lg:grid-cols-[250px_1fr] bg-black overflow-hidden">
      <div className="hidden lg:block bg-blue-950 top-0 left-0 h-screen sticky">
        <SideBar />
      </div>
      <div className="bg-black h-full w-full pb-4 overflow-y-auto overflow-x-hidden">
        <Header />

        
        
          { sidebarStatus === "dashboard" &&
            <><div className="mt-6 px-4">
            <StatsGrid />
          </div>
          <div className="px-4">
            <TaskSection />
          </div>
          </>}

          {
            sidebarStatus === "profile" &&
            <div className="mt-6 px-4 text-white">
              <Profile/>
            </div>
          }

          {
            sidebarStatus === "tasks" &&
            <div className="mt-6 px-4">
              <TaskSection />
            </div>
          }

      </div>

      {createTaskStatus && (<TaskModal />)}
      {editTaskStatus != "" && (<TaskModal />)}

    </div>
      <Footer />
    </>
  )
}

export default DashBoard
