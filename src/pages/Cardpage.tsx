import React from 'react'
import { useSelector } from 'react-redux'

const Cardpage = () => {
  const  { cartshopin }=useSelector((state:any)=>state)
  console.log(cartshopin)
  return (
    <div>Cardpage</div>
  )
}

export default Cardpage