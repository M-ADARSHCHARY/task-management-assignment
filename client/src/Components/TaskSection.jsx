import { useDispatch, useSelector } from "react-redux";
import { deleteTaskThunk, getTasksThunk } from "../store/task/taskThunk";
import { useEffect } from "react";
import { setCreateTaskStatus, setDeleteTaskStatus, setEditTaskStatus, setTaskFilter, clearTaskFilter } from "../store/task/taskSlice";
import { Pencil, Trash2 } from "lucide-react";

const TaskSection =() => {
  
  const { filteredTasks, filters } = useSelector(state => state.tasks);
  const tasks = filteredTasks;
  
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getTasksThunk());
  },[])

  const handleAddTask = (e) => {
    e.preventDefault();
    dispatch(setCreateTaskStatus(true));
    // console.log("Add Task Clicked");
  }

  const handleDeleteTask = async (taskId) => {
    // Dispatch delete task thunk
    await dispatch(setDeleteTaskStatus(taskId));
    dispatch(deleteTaskThunk(taskId));
  }
  
  const handleEditTask = (data) => {
    dispatch(setEditTaskStatus(data));
    console.log("Edit Task Clicked for ID:", data._id);
  }




  return (
    <div className="mt-8">

      {/* ---------------- FILTER BUTTONS + ACTION BUTTONS ---------------- */}
      <div className="flex flex-wrap items-center justify-between gap-3">

        {/* Left Filters */}
        <div className="flex flex-wrap gap-3">

          <div>
            <select
              name="status"
              value={filters.status}
              onChange={(e) => dispatch(setTaskFilter({ status: e.target.value }))}
              className="bg-white w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div>
            <select
              name="priority"
              value={filters.priority}
              onChange={(e) => dispatch(setTaskFilter({ priority: e.target.value }))}
              className="bg-white w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <input
              name="dueDate"
              value={filters.dueDate}
              onChange={(e) => dispatch(setTaskFilter({ dueDate: e.target.value }))}
              type="date"
              className="bg-white w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button type="button" onClick={() => dispatch(clearTaskFilter())} className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg">
            Clear Filters
          </button>
        </div>

        {/* Right Buttons */}
        <div className="flex gap-3">
          <button onClick={handleAddTask} className="px-5 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
            + Add Task
          </button>
        </div>

      </div>

      {/* ---------------- TABLE WRAPPER ---------------- */}
      <div className="bg-white rounded-xl shadow-sm border mt-6 overflow-x-auto">
        
        {/* Table Header */}
        <div className="min-w-[900px] bg-blue-900 text-white px-6 py-3 font-semibold grid grid-cols-6">
          <div>Title</div>
          <div>Description</div>
          <div>Status</div>
          <div>Priority</div>
          <div>Due Date</div>
          <div>Actions</div>
        </div>

        {/* ------------------ ROW 1 ------------------ */}
        {tasks.map((data)=>{
           return ( <div key={data?._id} className="min-w-[900px] grid grid-cols-6 px-6 py-4 items-center border-b">
          <div className="font-medium text-gray-800">{data?.title}</div>
          <div className="text-gray-600">{data?.description}</div>

          <div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {data?.status}
            </span>
          </div>

          <div>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
              {data?.priority}
            </span>
          </div>

          <div className="text-gray-700">{data?.dueDate.slice(0, 10)}</div>

          <div className="flex gap-4 text-xl text-gray-700">
            <Pencil onClick={()=>{handleEditTask(data)}} 
              size={20} 
              className="cursor-pointer hover:text-blue-600 transition" 
            />
           <button onClick={()=>{handleDeleteTask(data?._id)}}>
               <Trash2 
              size={20} 
              className="cursor-pointer hover:text-red-600 transition" 
            />
           </button>
          </div>
        </div>
        )})} 

      </div>
    </div>
  );
}
export default TaskSection
;