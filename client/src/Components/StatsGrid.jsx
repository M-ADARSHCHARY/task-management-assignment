import { useSelector } from "react-redux";
import StatCard from "./StatCard";

const StatsGrid = ()=>{
  const {allTasks,} = useSelector(state => state.tasks);  
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(task => task.status === "Completed").length;
  const pendingTasks = allTasks.filter(task => task.status === "Pending").length;
  const inProgressTasks = allTasks.filter(task => task.status === "In-Progress").length;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <StatCard title={"Total Tasks"} number={totalTasks}/>
        <StatCard title={"Completed Tasks"} number={completedTasks}/>
        <StatCard title={"Pending Tasks"} number={pendingTasks}/>
        <StatCard title={"In-Progress Tasks"} number={inProgressTasks}/>
    </div>
  );
}

export default StatsGrid;