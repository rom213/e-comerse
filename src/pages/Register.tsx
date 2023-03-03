import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import defaultValues from '../utils/defaultValues'
import './register.css'
import {  useNavigate } from 'react-router-dom'



const Register = () => {
    const navigate=useNavigate()

const {register,handleSubmit,reset}=useForm()

const submit=(data:any)=>{
const url:string='https://e-commerce-api-v2.academlo.tech/api/v1/users'
axios.post(url,data)
    .then(res=>{console.log(res.data)
    navigate('/user/login')})
    .catch(err=>console.log(err))
reset(defaultValues)
}
  return (
    <div className='for'>
      <div className='contenten'>
        <h2>log in</h2>
        <div onClick={()=>navigate('/user/login')} className='cir'>
            <i className='bx bx-x'></i>
        </div>
      </div>
        <h2>Create New User</h2>
        <br />
        <form className='form' onSubmit={handleSubmit(submit)}>
                <input className='inpu' {...register('firstName')} id='firstName' placeholder='your first Name' type="text" />
                <input className='inpu' {...register('lastName')} type="text" placeholder='your last Name' id='lastName'/>
                <input className='inpu' {...register('email')} type="email" id='email'  placeholder='your Email'/>
                <input className='inpu' {...register('password')} type="password" id='password' placeholder='create your password'/>
                <input className='inpu' {...register('phone')} type="number" id='phone' placeholder='your phone' />
                <button className='btn3'>Register</button>
        </form>
    </div>
  )
}

export default Register