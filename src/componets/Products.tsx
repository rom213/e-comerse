import React, { useEffect, useState } from 'react'
import './products.css'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { setproinf } from '../store/slices/product.info'
import axios from 'axios'
import config from '../utils/bearertoken'
import { getcarthunk } from '../store/slices/token.carshopin'
import { setstate } from '../store/slices/state.slice'


type props={
    produ:any,
}


const Products:React.FC<props> = ({produ}) => {
const [add, setadd] = useState(1)
const [img, setimg] = useState(0)
const navigate=useNavigate()    
const dispatch=useDispatch()
const { cartshopin }=useSelector((state:any)=>state)




const agregarcarrito=()=>{
    let s,t
    for (let index = 0; index < cartshopin.length; index++) {
        if(produ?.id===cartshopin[index].productId){
            s=(cartshopin[index].id)
            t=cartshopin?.[index].quantity
          }
    }
    
    t=t+1

    if (s) {
        const url=`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${s}`
        const data={
            quantity: t
        }
        axios.put(url,data,config)
            .then(res=>{console.log('con exito')
            dispatch(getcarthunk())
        })
        
    }else{
        if (add===1) {
            const url:any='https://e-commerce-api-v2.academlo.tech/api/v1/cart'
            const data={
                quantity: add,
                productId:produ?.id
            }
            axios.post(url,data,config)
            .then(res=>{console.log('agregado con exito');
            dispatch(getcarthunk())
        })
            .catch(err=>{console.log(err)})
        }
    }

}

const handleClick=()=>{
    navigate(`/product/${produ.id}`)
    dispatch(setproinf(produ))
}
  return (
        <div onClick={handleClick} className='content'>

        <header onMouseOut={()=>setimg(0)} onMouseOver={()=>setimg(1)}  className='cont1'>
           <img className='img' src={`${produ.images[img].url}`} alt="" />
        </header>   
        <div className='cont2'>
            <div>
                <span>{produ.brand}</span>
                <div>{produ.title}</div>
            </div>
            <div className='contprice'>
                <span>Price </span>
                <strong>${produ.price}</strong>
            </div>
            <div onClick={e=>{e.stopPropagation(); agregarcarrito()}} className='circle'>
                <i className='card bx bx-cart bx-lg'></i>
            </div>
            
        </div>
        </div>
  )
}

export default Products