import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookie from "js-cookie"

const Protectedroutes = ({children})=>{
      
    const token = localStorage.getItem("token")

    if(!token) return <Navigate to="/login"/>

    return children
}

export default Protectedroutes