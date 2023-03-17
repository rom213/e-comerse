import axios from 'axios'
import {SubmitHandler, useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import defaultValues from '../utils/defaultValues'
import './register.css'
import { Globalstore } from '../secstore/Store_global'
 type Regis={
  email:string,
  password:string
 }

const Loginpage = () => {
  const navigate=useNavigate()
  const {register,handleSubmit,reset}=useForm<Regis>()
  const { ThunkCarshop }=Globalstore()
  
  const onSubmit:SubmitHandler<Regis> =(data)=>{
      const url='https://e-commerce-api-v2.academlo.tech/api/v1/users/login'
      axios.post(url,data)
        .then(res=>{console.log(res.data)
        reset()
        localStorage.setItem('token', res.data.token)  
        localStorage.setItem('name', `${res.data.user.firstName} ${res.data.user.lastName}` )
        ThunkCarshop()
        })
        .catch(err=>{
          localStorage.clear()
          console.log(err)
        })
        reset(defaultValues)
  }


 const handleclick=()=>{
  localStorage.clear()
  console.log('roma');
  reset()
 }
  
  if (localStorage.getItem('name')) {
    return <div className='ingreso'>
      <div onClick={()=>navigate('/')} className='conarrow'><i className='bx bxs-left-arrow-square bx-lg'></i></div>
      <h2>welcome</h2>
      <h2>{localStorage.getItem('name')}</h2>
      <img className='imagen' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png" alt="" />
      <h2>your profile</h2>
      <div className='log' onClick={handleclick}>
        <h2>log out</h2>
      </div>
      <br />
    </div>
  }else{
  return (
    <div className='for'>
      <br />
      <div className='contenten'>
        <h2>log in</h2>
        <div onClick={()=>navigate('/')} className='cir'>
            <i className='bx bx-x'></i>
        </div>
      </div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
         <input {...register('email')} id='email' className='inpu' type="text" placeholder='your email' />
         <input {...register('password')} id='password' className='inpu' type="password" placeholder='your password' />
         <button className='btn3' >log in</button>
      </form>
      <button onClick={()=>navigate('/user/register')} className='bt3'>create new user</button>
    </div>
  )
}
}

export default Loginpage
