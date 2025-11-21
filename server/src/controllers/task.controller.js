import Task from '../models/taskSchema.js';

export const createTask = async (req, res) => {

    try{
        const { title, description, status, priority, dueDate } = req.body;
        // console.log("Request body:", req.body);
        if(!title){
            return res.status(400).json({ message: "Title is required"});
        }
        
        const userId = req.user._id;
        const newTask = new Task({
            title,
            description,
            status,
            priority,
            dueDate,
            userId,
        })
       
        await newTask.save();
        res.status(201).json({ 
            responseData: newTask,
            message: "Task created successfully",
            success: true,
        });
    }catch(error){
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}



export const getUserTasks = async (req, res) => {
    try{
        const tasks = await Task.find({ userId: req.user._id });

        res.status(200).json({
            responseData: tasks, // array of tasks
            message: "Tasks fetched successfully",
            success: true,
        });
    }catch(error){
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const editTask = async (req, res) => { 
  
    try{
        const taskId = req.params.id;
        const updatedTask = req.body;
        const task = await Task.findOne({ _id: taskId});

        if(!task){
            return res.status(404).json({ message: "Task not found"});
        }

        const result = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true });

        res.status(200).json({
            responseData: result,
            message: "Task updated successfully",
            success: true,
        });
    }catch(error){
        res.status(500)
           .json({
                message: "Internal Server Error", 
                error: error.message,
                success:false,
            });
    }

}

export const deleteTask = async (req, res) => {
   try{
        const taskId = req.params.id;
        const task = await Task.findOne({ _id: taskId});

        if(!task){
            return res.status(404).json({ message: "Task not found"});
        }

        await Task.findByIdAndDelete(taskId);

        res.status(200).json({
            message: "Task deleted successfully",
            success: true,
        });
   }catch(error){
        res.status(500)
           .json({
                message: "Internal Server Error", 
                error: error.message,
                success:false,
            });
   }
}