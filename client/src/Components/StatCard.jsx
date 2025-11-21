import { 
 
  CheckCircle,
  Clock,
  Loader2,
  ListTodo
} from "lucide-react";


const StatCard = ({title, number}) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border relative">
      {/* Title */}
      <p className="text-gray-500 text-sm mt-2">{title}</p>

      {/* Number */}
      <h2 className="text-3xl font-bold text-gray-800 mt-2">{number}</h2>

      {/* Icon */}
      <div className="absolute bottom-4 right-4 text-gray-600 text-xl">
       {title == "Total Tasks" && <ListTodo size={26} className="text-blue-600" /> }
       {title == "Pending Tasks" && <Clock size={26} className="text-blue-600" /> }
       {title == "Completed Tasks" && <CheckCircle size={26} className="text-blue-600" /> }
       {title == "In-Progress Tasks" && <Loader2 size={26} className="text-blue-600" /> }
      </div>
    </div>
  );
}

export default StatCard;