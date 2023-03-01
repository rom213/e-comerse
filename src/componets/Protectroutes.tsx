import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export const Protectroutes = () => {
  if (localStorage.getItem('token')) {
    return <Outlet />
  }else{
    return <Navigate to={'user/login'} />
  }
}
