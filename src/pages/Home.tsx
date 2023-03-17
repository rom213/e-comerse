import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Products from '../componets/Products';
import { Globalstore } from '../secstore/Store_global';
import './home.css'
import { SubmitHandler, useForm } from 'react-hook-form';
import { productts } from '../utils/interfase';
import axios from 'axios';


type data={
  dato:string
}

const Home = () => {
    const [search, setsearch] = useState("")
    const [marca, setmarca] = useState<productts[]>([])


    const {pproducts,ThunkProdu} =Globalstore()
    const {register,handleSubmit,reset}= useForm<data>()
    
    useEffect(() => {
      ThunkProdu()
    }, [])

  const submitsearch:SubmitHandler<data> = (e)=>{
    setsearch(e.dato)
    reset()
  }
  useEffect(() => {
    if (search) {
      const url=`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${search}`
      axios.get(url)
        .then(res=>setmarca(res.data))
    }
  }, [search])

useEffect(() => {
  setmarca(pproducts)
}, [pproducts])


  useEffect(() => {
        if (marca.length===0) {
          setmarca(pproducts)
        }
  
  }, [marca])
  
 const handlechange=(e:ChangeEvent<HTMLSelectElement>)=>{
    e.preventDefault()
    setsearch(e.target.value)
 }
  return (
    <div>
        <form className='continp' onSubmit={handleSubmit(submitsearch)}>
          <input {...register('dato')} placeholder='What are you looking for?' id='dato' type="text" />
              <select className='select' onChange={handlechange}>
                <option value="">select</option>
                <option value="nopdfpo">all products</option>
                <option value="Samsung">Samsung</option>
                <option value="Sony">Sony</option>
                <option value="Apple">Apple</option>
                <option value="Cosmo">Cosmo</option>
              </select>
          <button className='butt'><i className='bx bx-search bx-sm'></i></button>
        
        </form>



        <div className='products'>
        {
            marca?.map((produ)=>{
                return <Products key={produ.id} produ={(produ)}/>
            })
        }
        </div>
    </div>
  )
}

export default Home
