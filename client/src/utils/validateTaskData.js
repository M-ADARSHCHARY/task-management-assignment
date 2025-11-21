export const validateTaskData = (taskData) => {
  const { title, description, dueDate } = taskData; 
    if (!title || title.trim() === '') {
        return false;
    }   
    return true;
};      