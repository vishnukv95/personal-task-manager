import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

const Header = () => {
const navigate = useNavigate()
const [open, setOpen] = useState(false);
const [user,setUser] = useState(false)

useEffect(()=>{
  const fetchData = async () => {
      try {
        const profileRes = await axios.get("http://localhost:3000/api/auth/profile", {
          withCredentials: true,
        });
        setUser(profileRes.data.user);
      }catch(error){
        console.log(error.message)
      }
     }
      fetchData()
    },[])

  const handleLogout = async () => {
  try {
    await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
    navigate('/')
  } catch (error) {
    console.log(error.message);
  }
};

const handleLogOutButton =()=>{
  setOpen(false)
  handleLogout()
}

return (
   <header className="w-full bg-blue-700 text-white shadow-md">
      <div className=" mx-auto flex justify-between items-center p-4">
      
        <div className="text-2xl font-bold">Task Manager</div>

    
        <nav className="hidden md:flex gap-6 font-semibold">
          <Link to="/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
          {user?<button onClick={handleLogout}  className="hover:text-gray-200">
            Log out
          </button>:<Link to="/login" className="hover:text-gray-200">
            Login
          </Link>}
          {user?"":<Link to="/register" className="hover:text-gray-200">
            Register
          </Link>}
        </nav>

       
        <button
          className="md:hidden text-2xl font-bold"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

    
      <nav
        className={`md:hidden bg-blue-700 px-4 pb-4 ${
          open ? "block" : "hidden"
        }`}
      >
        <Link
          to="/dashboard"
          className="block py-2 font-semibold hover:text-gray-200"
          onClick={() => setOpen(false)}
        >
          Dashboard
        </Link>
       {user? <button
          
          className="block py-2 font-semibold cursor-pointer hover:text-gray-200"
          onClick={handleLogOutButton}
        >
          Log out
        </button>: <Link
          to="/login"
          className="block py-2 font-semibold hover:text-gray-200"
          onClick={() => setOpen(false)}
        >
          Login
        </Link>}
        <Link
          to="/register"
          className="block py-2 font-semibold hover:text-gray-200"
          onClick={() => setOpen(false)}
        >
          Register
        </Link>
      </nav>
    </header>
  )
}

export default Header