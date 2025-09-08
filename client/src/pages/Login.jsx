import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const api = import.meta.env.VITE_API_URL
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/api/auth/login`, {
        email,
        password,
      });
      
     localStorage.setItem("token", res.data.token);
     localStorage.setItem("user",JSON.stringify(res.data.user))
    
      navigate("/dashboard");
      

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    
    <div className='flex justify-center items-center mt-40  p-3 '>
    
    <div className="w-full max-w-md  p-8 shadow-md rounded-lg ">
          <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-7 max-w-sm mx-auto bg-inherit p-2"
    >
      <div>
        <h2 className="text-white font-extrabold text-2xl">Log in</h2>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-100 border border-blue-600 text-gray-900 text-sm rounded-lg 
          w-full p-2.5 shadow focus:outline-none"
          required
          type="email"
          placeholder="Enter email"
        />
      </div>

      <div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-100 border border-blue-600 text-gray-900 text-sm rounded-lg  
          w-full p-2.5 shadow focus:outline-none"
          required
          type="password"
          placeholder="Enter your password"
        />
      </div>

      <div>
        <button
          type="submit"
          className="text-white cursor-pointer w-full border-2 bg-gradient-to-l from-blue-500
         via-blue-600 to-blue-700  
           rounded-lg font-extrabold px-5 py-2.5 text-center shadow"
        >
          Log in
        </button>
      </div>

      <div>
        <p className="text-white">
          Don’t have an account?{" "}
          <a className="text-blue-700" href="/register">
            Click here to register
          </a>
        </p>
      </div>
    </form>
    </div>

    </div>
  );
};

export default Login;
