import React from "react";
import axios from "axios";

const api = import.meta.env.VITE_API_URL

const TaskItem = ({ task, deleteTask, updateTask, setEditTask }) => {
  const token = localStorage.getItem("token")
  const handleToggle = async () => {
    try {
      const res = await axios.patch(
        `${api}/api/task/${task._id}`,
        { completed: !task.completed },
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      updateTask(res.data);
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${api}/api/task/${task._id}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      deleteTask(task._id);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className=" p-4 rounded-lg shadow-md flex break-words  justify-between items-center">
      <div>
        <h3
          className={`text-lg font-medium ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleToggle}
          className={`px-3 py-1 rounded text-white ${
            task.completed ? "bg-yellow-600" : "bg-green-600"
          } hover:opacity-80`}
        >
          {task.completed ? "Undo" : "Done"}
        </button>
        <button
          onClick={() => setEditTask(task)}
          className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
