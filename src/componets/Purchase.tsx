import React from 'react'
import { ppurchases } from '../utils/interfase'
type props={
    state:ppurchases,
}

const Purchase:React.FC<props> = ({state}) => {
  return (
    <div className='purchas'>
        <div>
          <img className='img5' src={`${state.product.images[2].url}`} alt="" />
        
        </div>
        <div>
        <h6 className='dc'>Purchase</h6>
        <div className='clas'>
          <h4>Quantity: {state.quantity}</h4>
          <h5>total price: <br /> ${((state.quantity)*state.product.price).toFixed(1)} </h5>
          </div>
          
        </div>
    </div>
  )
}

export default Purchase