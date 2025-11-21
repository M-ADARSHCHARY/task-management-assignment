import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

export const getTasksThunk = createAsyncThunk(
    "task/getTasks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/task/get-tasks");
            //  toast.success("Tasks Fetched Successfully");
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message ?? "task fetch failed";
            return rejectWithValue(message);
        }
    }
);

export const createTaskThunk = createAsyncThunk(
    "task/createTask",
    async (taskData, { rejectWithValue }) => {  
        try {   
            console.log("Creating Task with Data:", taskData);
            const response = await axiosInstance.post("/task/create", taskData);
            toast.success("Task Created Successfully");
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message ?? "Task creation failed";
            toast.error(`Task Creation Error: ${message}`);
            return rejectWithValue(message);
        }
    }
);

export const editTaskThunk = createAsyncThunk(
    "task/editTask",
    async (taskData, { rejectWithValue }) => {  
        try {   
            console.log("editing Task with Data:", taskData);
            const response = await axiosInstance.put(`/task/edit/${taskData._id}`, taskData);
            toast.success("Task Edited Successfully");
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message ?? "Task edition failed";
            toast.error(`Task Edition Error: ${message}`);
            return rejectWithValue(message);
        }
    }
);

export const deleteTaskThunk = createAsyncThunk(
    "task/deleteTask",
    async (taskId, { rejectWithValue }) => {  
        try {   
            console.log("Deleting Task with ID:", taskId);
            const response = await axiosInstance.delete(`/task/delete/${taskId}`);
            toast.success("Task deleted Successfully");
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message ?? "Task deletion failed";
            toast.error(`Task Deletion Error: ${message}`);
            return rejectWithValue(message);
        }
    }
);

