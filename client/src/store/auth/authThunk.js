import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

export const loginUserThunk = createAsyncThunk(
    "auth/loginUser",
    async (userCredentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/login", userCredentials);
            // console.log("Login Response:", response.data);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message ?? "Login failed";
            console.log("Login Error:", message);
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const userSignupThunk = createAsyncThunk(
    "auth/userSignup",
    async (signupData, { rejectWithValue }) => {
        try {
            console.log("Signup Data:", signupData);
            const response = await axiosInstance.post("/user/signup", signupData);
            // console.log("Signup Response:", response.data);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message ?? "Signup failed";
            console.log("Signup Error:", message);
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const logoutUserThunk = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/logout");
            console.log("Logout Response:", response.data);
            toast.success("Logout successful");
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message ?? "Logout failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);







export const checkAuthThunk = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get("/user/check-auth");
            if (data.success) {
                return data.user;
            }
            return rejectWithValue("Not authenticated");
        } catch (error) {
            const message = error.response?.data?.message ?? "Auth check failed";
            return rejectWithValue(message);
        }
    }
);
