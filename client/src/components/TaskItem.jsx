import React from "react";
import axios from "axios";

const TaskItem = ({ task, deleteTask, updateTask, setEditTask }) => {
  const handleToggle = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/task/${task._id}`,
        { completed: !task.completed },
        { withCredentials: true }
      );
      updateTask(res.data);
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/task/${task._id}`, {
        withCredentials: true,
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
