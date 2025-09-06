import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ editTask, setEditTask, addTask, updateTask }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
    } else {
      setTitle("");
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editTask) {
        const res = await axios.patch(
          `http://localhost:3000/api/task/${editTask._id}`,
          { title },
          { withCredentials: true }
        );
        updateTask(res.data);
        setEditTask(null);
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/task",
          { title },
          { withCredentials: true }
        );
        addTask(res.data);
      }
      setTitle("");
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={editTask ? "Edit task" : "Enter new task"}
        className="flex-1 p-2 rounded text-black"
      />
      <button
        type="submit"
        className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
      >
        {editTask ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TaskForm;
