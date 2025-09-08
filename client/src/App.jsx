import React from 'react'
import {Routes,Route} from "react-router-dom"
import Header from "./components/Header"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Protectedroutes from "./components/Protectedroutes"
import Footer from './components/Footer'
import { useState } from 'react'
const App = () => {

  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <div>
      <Header user={user} setUser={setUser}/>
      <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/login' element={<Login setUser={setUser}/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/dashboard' element={<Protectedroutes>
        <Dashboard/>
       </Protectedroutes>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
