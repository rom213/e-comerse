import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../utils/bearertoken'
import './carpage.css'
import { Globalstore } from '../secstore/Store_global'
import { Carshop } from '../utils/interfase'

interface prop{
  state:Carshop
}


const Cardpage:React.FC<prop> = ({state}) => { 
  const [operadoor, setoperaoor] = useState(0)
  const {ThunkCarshop} = Globalstore()
  
  const handle=()=>{
    
    if (state.quantity===1) {
      let s=state.id
      const url=`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${s}`
      axios.delete(url,config)
        .then(res=>{console.log('borrado'); ThunkCarshop()})
      }  
    if (state.quantity>0) {
      let s=state.quantity
      s--
      const url=`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${state.id}`
      const data={
          quantity: s
      }
      axios.put(url,data,config)
          .then(res=>{console.log('con exito')
          ThunkCarshop()
      })

    }
  }

  const handleclick =()=>{
    let s=state.quantity
      s++
      const url=`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${state.id}`
      const data={
          quantity: s
      }
      axios.put(url,data,config)
          .then(res=>{
          ThunkCarshop()
      })
  }
  const handledelete=()=>{
    let s=state.id
    const url=`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${s}`
    axios.delete(url,config)
      .then(res=>{ThunkCarshop()})
  }
  useEffect(() => {
    setoperaoor((state.product.price)*state.quantity)
  }, [state.quantity])





  return (
    <div className='secs'>
      <div className='contenimage'>
        <img className='r' src={`${state.product.images[0].url}`} alt="" />
      </div>
        <div className='dat'>
          <h5>{state.product.title}</h5>
        </div>
    <div className='contenticon'>
      <div className='d'>
      <i onClick={()=>{handleclick()}} className=' bx bx-plus bx-sm  '></i>
      </div>
      <div onClick={()=>{handle()}} className='d'>
      <i className=' bx bx-minus bx-sm'></i>
      </div>
      <div className='d'>
      <i onClick={()=>{handledelete()}} className=' bx bx-trash bx-sm'></i>
      </div>
    </div>
    <div className='pric'>total: <b>{operadoor.toFixed(1)}</b></div>
    <div className='amount'>Amount: <h3>{state.quantity}</h3> </div>
    </div>

  )
}

export default Cardpage