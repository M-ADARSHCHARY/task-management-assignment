import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTaskSearchTerm } from "../store/task/taskSlice";
import { Menu, Search } from "lucide-react";
import SideBar from "./SideBar";

export default function Header() {
  const {authUser} = useSelector(state => state.auth);
  const { searchTerm } = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  const handleSearchChange = (event) => {
    dispatch(setTaskSearchTerm(event.target.value));
  };
  return (
    <>
      <header className="md:ml-2 lg:ml-2 auto w-full bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-20">

        {/* ---- LEFT: Search Bar ---- */}
        <div className="flex items-center gap-3 w-full max-w-xl">
          <div className="relative w-full">
            <input 
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-full bg-gray-100 py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Search size={20} className="text-gray-500" />
            </span>
          </div>
        </div>

        {/* ---- RIGHT: Profile + Mobile Menu ---- */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:block font-medium text-gray-700">
            {authUser?.name}
          </span>

          <img
            src={"https://www.w3schools.com/howto/img_avatar.png"}
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200 lg:hidden"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
          <div className="relative z-50 h-full w-64">
            <SideBar isMobile onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
