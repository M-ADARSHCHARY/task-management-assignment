import { createSlice } from "@reduxjs/toolkit";
import { checkAuthThunk, loginUserThunk, logoutUserThunk, userSignupThunk } from "./authThunk";

const initialState = {
  authUser: null,
  isCheckingAuth: false,
  isAuthenticated: false,
  loading:false,
  sidebarStatus:"dashboard",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateSideBarStatus: (state, action) => {
      state.sidebarStatus = action.payload;
    }
  },

  extraReducers: (builder) => {
    
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isCheckingAuth = true;
    });

    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      console.log("Login successful:", action.payload);
      state.authUser = action?.payload?.responseData;
      state.isCheckingAuth = false;
      state.isAuthenticated = true;
    });

    builder.addCase(loginUserThunk.rejected, (state, action) => {
      console.log("Login failed:", action.payload);
      state.isCheckingAuth = false;
    });

    builder.addCase(userSignupThunk.fulfilled, (state, action) => {
      console.log("Signup successful:", action.payload);
      state.authUser = action?.payload?.responseData;
      state.isCheckingAuth = false;
      state.isAuthenticated = true;
    });


    
    
    builder.addCase(checkAuthThunk.pending, (state) => {
      state.isCheckingAuth = true;
    });

    builder.addCase(checkAuthThunk.fulfilled, (state, action) => {
      console.log("Auth checked successfully:", action.payload);
      state.authUser = action.payload;
      state.isCheckingAuth = false;
      state.isAuthenticated = true;
    });

    builder.addCase(checkAuthThunk.rejected, (state, action) => {  
      console.log("Auth check failed:", action.payload);
      state.isCheckingAuth = false;

    });

    builder.addCase(logoutUserThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      console.log("Logout successful:", action.payload);
      state.authUser = null;
      state.isAuthenticated = false;
      state.loading = false;
    }); 
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      console.log("Logout failed:", action.payload);
      state.loading = false;
    });
  },
}); 

export const { updateSideBarStatus} = authSlice.actions;
export default authSlice.reducer;