import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
const api = import.meta.env.VITE_API_URL
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
         const token = localStorage.getItem("token");
         const savedUser =  JSON.parse(localStorage.getItem("user"));
            
         if (!token || !savedUser) {
          navigate("/login");
          return;
        }
        setUser(savedUser);
        const taskRes = await axios.get(`${api}/api/task`,{headers:{ Authorization: `Bearer ${token}` }});
        setTasks(taskRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

 
  const addTask = (task) => setTasks([...tasks, task]);

 
  const updateTask = (updated) =>
    setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));

  
  const deleteTask = (id) =>
    setTasks(tasks.filter((t) => t._id !== id));

  if (!user) return <p className="text-white text-center mt-20">Loading...</p>;

  return (
    <div className="flex justify-center items-center mt-10">
      <div className=" text-blue-700 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Welcome {user.name} </h1>
        
       
        <TaskForm
          editTask={editTask}
          setEditTask={setEditTask}
          addTask={addTask}
          updateTask={updateTask}
        />

        
        <h2 className="text-xl font-semibold mb-3">Your Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
                setEditTask={setEditTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
