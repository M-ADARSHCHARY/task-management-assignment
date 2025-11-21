import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateTaskStatus, setEditTaskStatus } from '../store/task/taskSlice';
import { createTaskThunk, editTaskThunk } from '../store/task/taskThunk';
import { X } from 'lucide-react';
import { validateTaskData } from '../utils/validateTaskData';
import toast from 'react-hot-toast';


const TaskModal = () => {
  const [taskData, setTaskData] = React.useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
  });

  const { createTaskStatus, editTaskStatus } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (editTaskStatus) {
      setTaskData(editTaskStatus);
      console.log('Setting Task Data for Edit:', editTaskStatus);
    }
  }, [editTaskStatus]);

  const dispatch = useDispatch();

  const handleCreateTask = async (e) => {
    e.preventDefault();
    await dispatch(createTaskThunk(taskData));
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    await dispatch(editTaskThunk(taskData));
  };

  const handleSaveTask = async (e) => {
    await validateTaskData(taskData);
   
    if(!validateTaskData(taskData)) {
      console.log("Validation Failed");
      toast.error("Please fill all required fields correctly.");
      return;
    }

    if (editTaskStatus) {
      handleEditTask(e);
      dispatch(setEditTaskStatus(''));
    } else {
      handleCreateTask(e);
      dispatch(setCreateTaskStatus(false));
    }
  };

  const handleCancel = () => {
    if (editTaskStatus) {
      dispatch(setEditTaskStatus(''));
    } else {
      dispatch(setCreateTaskStatus(false));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        {/* --------- HEADER --------- */}
        <div className="mb-4 flex items-center justify-between border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-900">Edit Task</h2>
          <button onClick={handleCancel}
            type="button"
            className="rounded-full p-2 text-gray-500 transition hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* --------- FORM --------- */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">Title</label>
            <input
              onChange={(e) => {
                setTaskData({ ...taskData, title: e.target.value });
              }}
              type="text"
              name="title"
              value={taskData?.title}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Task Title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">Description</label>
            <textarea
              value={taskData?.description}
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Task Description"
              name="description"
              onChange={(e) => {
                setTaskData({ ...taskData, description: e.target.value });
              }}
            ></textarea>
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={taskData?.status}
              onChange={(e) => {
                setTaskData({ ...taskData, status: e.target.value });
              }}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In-progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">Priority</label>
            <select
              name="priority"
              value={taskData?.priority}
              onChange={(e) => {
                setTaskData({ ...taskData, priority: e.target.value });
              }}
              className="w-full rounded-lg border border-gray-200 px-3.5 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">Due Date</label>
            <input
              name="dueDate"
              value={taskData?.dueDate}
              onChange={(e) => {
                setTaskData({ ...taskData, dueDate: e.target.value });
              }}
              type="date"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* --------- FOOTER BUTTONS --------- */}
        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button
            onClick={handleCancel}
            className="rounded-lg bg-gray-200 px-5 py-2 text-gray-800 transition hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveTask}
            className="rounded-lg bg-blue-900 px-5 py-2 text-white shadow-sm transition hover:bg-blue-800"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;