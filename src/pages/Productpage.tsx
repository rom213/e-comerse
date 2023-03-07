import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Products from '../componets/Products'
import './productpage.css'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { getcarthunk } from '../store/slices/token.carshopin'
import config from '../utils/bearertoken'

const Wrapper=styled.div`
border-top: 1px solid rgb(87, 81, 81);
border-bottom: 1px solid rgb(87, 81, 81);
border-left: 1px solid rgb(87, 81, 81) ;
border-right: 1px solid rgb(87, 81, 81);
`

type props={
  setnavigator:any,
}


const Productpage:React.FC<props>= ({setnavigator}) => {
  const [similar, setsimilar] = useState()
  const [similaproducts, setsimilaproducts] = useState()
  const [similarcategory, setsimilarcategory] = useState()
  const [add, setadd] = useState(1)
  const [count, setcount] = useState(0)
  const [image, setimage] = useState(0)
  const slider:any=document.querySelector('.slider')
  const s:any=similaproducts
  const t:any=similarcategory
  const n:any=similar
  const { proinf, products,cartshopin } = useSelector((state:any)=>state)
  const [imgselect, setimgselect] = useState(0)
  const navigate =useNavigate()
  const dispatch=useDispatch()

    useEffect(() => {
      setnavigator(6)
      const url:string=`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${proinf?.brand}`
      axios.get(url)
        .then(res=>setsimilaproducts(res.data))
        .catch(err=>console.log(err));
    }, [proinf])
 console.log(products)

      useEffect(() => {
         if ( similaproducts ) {
          const f:any=s.filter((product:any)=>proinf.id !=product.id)
          setsimilar(f)
          
          }
      }, [proinf,s])
      



    useEffect(() => {
      if (proinf){
        const s:any=products.filter((product:any)=>product.category.id===proinf.category.id)
        const t:any=s.filter((product:any)=>proinf.id !=product.id)
        setsimilarcategory(t);
      }
    }, [proinf])
    
    
    const agregarcarrito=()=>{
      let s,t
      for (let index = 0; index < cartshopin.length; index++) {
          if(proinf?.id===cartshopin[index].productId){
              s=(cartshopin[index].id)
              t=cartshopin?.[index].quantity
            }
      }
      
      t=t+count
  
      if (s) {
          const url=`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${s}`
          const data={
              quantity: t
          }
          axios.put(url,data,config)
              .then(res=>{console.log('con exito')
              dispatch(getcarthunk())
          })
    setcount(0)
      }else{
          if (add===1) {
              const url:any='https://e-commerce-api-v2.academlo.tech/api/v1/cart'
              const data={
                  quantity: add,
                  productId:proinf?.id
              }
              axios.post(url,data,config)
              .then(res=>{console.log('agregado con exito');
              dispatch(getcarthunk())
          })
              .catch(err=>{console.log(err)})
          }
      }
  
  }

    const handleminus=()=>{
      if (count >= 1) {
        setcount(count-1)
      }
    }
    
    const handlscroll=(index:any)=>{
      if (index==0) {
        slider.scrollLeft =0
        setimgselect(0)
      }
      if (index==1) {
        slider.scrollLeft =350
        setimgselect(1)
      }
      if (index==2) {
        slider.scrollLeft =700
        setimgselect(2)
      }
    }

    const hand=()=>{

      if(slider.scrollLeft<=300){
        setimgselect(0)
      }
      if(slider.scrollLeft>=210){
        setimgselect(1)
      }
      if(slider.scrollLeft>=400){
        setimgselect(2)
      }

    }
    


  return (
    <div className='contentall'>
      <div className='contpunto'>
        <h3 className='home' onClick={()=>navigate('/')}>Home</h3>
        <div className='punto'></div>
        <div>{proinf?.title}</div>
      </div>

      <div className='sec1'>

        <div>
          <div className='slider'>
          <i onClick={()=>{slider.scrollLeft -= 100; hand()}} className='buttrigh bx bxs-chevrons-left bx-lg'></i>

              {
                proinf?.images.map((im:any)=>{
                  return <div className='ss'>
                            <img className='im' src={`${im.url}`} alt="" />
                          </div>
                })
              }
              <i onClick={()=>{slider.scrollLeft += 100;hand()}} className='buttleft bx bxs-chevrons-right bx-lg'></i>
          </div>

          <div className='contimages'>
            {
              proinf?.images.map((im:any,index:number)=>{
                return <div className={`b ${index===imgselect && 'activ'}`}>
                          <img onClick={()=>handlscroll(index)} className={`imag `} src={`${im.url}`} alt="" />
                      </div>
                  })
            }
          </div>
          
        </div>
        <div className='cardinfo'>
            <div>
              <span>{proinf?.brand}</span>
              <h2>{proinf?.title}</h2>
            </div>
            <div>
              <p>{proinf?.description}</p>
            </div>

            <div className='contentvalues'>
              <div className='conprice'>
                <span>price</span>
                <b>{proinf?.price}</b>
              </div>
              <div className='contall'>
                <div onClick={handleminus} className='minus'><i className='bx bx-minus'></i></div>
                <div  className='value'>{count}</div>
                <div onClick={()=>setcount(count+1)} className='minus'><i className='bx bx-plus'></i></div>
              </div>
              <button onClick={agregarcarrito} className='btn2'>add to card <i className='bx bx-cart'></i></button>

            </div>
        </div>
      </div>

      <div className='cotentsimilarall'>
      <div className='Dis'>Discover similar items</div>
      <div className='contentsimilar'>
        {
            n?.map((produ:any)=>{
                return <Products key={produ.id} produ={(produ)}/>
            }) 
        }
        {
            t?.map((produ:any)=>{
              return <Products key={produ.id} produ={(produ)}/>
            }) 
        }
      </div>
      
      </div>

    </div>
    

  )
}

export default Productpage