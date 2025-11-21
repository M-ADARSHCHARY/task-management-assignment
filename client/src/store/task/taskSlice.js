import { createSlice } from "@reduxjs/toolkit";
import { createTaskThunk, editTaskThunk, getTasksThunk } from "./taskThunk";

const defaultFilters = {
  status: "All",
  priority: "All",
  dueDate: "",
};

const applyFilters = (state) => {
  const { status, priority, dueDate } = state.filters;
  const searchTerm = state.searchTerm.trim().toLowerCase();

  state.filteredTasks = state.allTasks.filter((task) => {
    const matchesStatus = status === "All" || task.status === status;
    const matchesPriority = priority === "All" || task.priority === priority;
    const matchesDueDate = !dueDate || (task.dueDate && task.dueDate.slice(0, 10) === dueDate);
    const matchesSearch = !searchTerm || (task.title ?? "").toLowerCase().includes(searchTerm);
    return matchesStatus && matchesPriority && matchesDueDate && matchesSearch;
  });
};

const initialState = {
  allTasks: [],
  filteredTasks: [],
  filters: { ...defaultFilters },
  searchTerm: "",
  createTaskStatus: false,
  editTaskStatus: "",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setCreateTaskStatus: (state, action) => {
      state.createTaskStatus = action.payload;
    },
    setDeleteTaskStatus: (state, action) => {
      state.allTasks = state.allTasks.filter((task) => task._id !== action.payload);
      applyFilters(state);
    },
    setEditTaskStatus: (state, action) => {
      state.editTaskStatus = action.payload;
    },
    setTaskFilter: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
      applyFilters(state);
    },
    setTaskSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      applyFilters(state);
    },
    clearTaskFilter: (state) => {
      state.filters = { ...defaultFilters };
      state.searchTerm = "";
      applyFilters(state);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getTasksThunk.pending, (state, action) => {  
   });
   builder.addCase(getTasksThunk.fulfilled, (state, action) => {
           console.log("Tasks Fetched Successfully:");
           state.allTasks = action?.payload?.responseData ?? [];
           applyFilters(state);
    });
    
   builder.addCase(getTasksThunk.rejected, (state, action) => {
        
    });


   builder.addCase(createTaskThunk.pending, (state, action) => {
        
   });
   builder.addCase(createTaskThunk.fulfilled, (state, action) => {
       if(action?.payload?.responseData){
         state.allTasks.push(action.payload.responseData);
         applyFilters(state);
       }
   });
   builder.addCase(createTaskThunk.rejected, (state, action) => {        
   });

    builder.addCase(editTaskThunk.fulfilled, (state, action) => {
      const updated = action.payload?.responseData;
      if (!updated) return;

      const index = state.allTasks.findIndex((task) => task._id === updated._id);
      if (index !== -1) {
        state.allTasks[index] = updated;
        applyFilters(state);
      }
    });





  },
  
  
});

export const {
  setCreateTaskStatus,
  setDeleteTaskStatus,
  setEditTaskStatus,
  setTaskFilter,
  setTaskSearchTerm,
  clearTaskFilter,
} = taskSlice.actions;
export default taskSlice.reducer;
