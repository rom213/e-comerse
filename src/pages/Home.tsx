import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Products from '../componets/Products';
import './home.css'

const Home = () => {
    const { products }= useSelector((state:any)=>state)
    

  return (
    <div>
        <form className='continp'>
          <input placeholder='What are you looking for?' id='dato' type="text" />
          <button className='butt'><i className='bx bx-search bx-sm'></i></button>
        </form>
        <div className='products'>
        {
            products?.map((produ:any)=>{
                return <Products key={produ.id} produ={(produ)}/>
            })
        }
        </div>
    </div>
  )
}

export default Home