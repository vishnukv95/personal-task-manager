import React from 'react'
import {Routes,Route} from "react-router-dom"
import Header from "./components/Header"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Protectedroutes from "./components/Protectedroutes"
import Footer from './components/Footer'
const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/login' element={<Login/>}/>
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
