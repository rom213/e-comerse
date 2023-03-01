import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Products from '../componets/Products'
import './productpage.css'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Wrapper=styled.div`
border-top: 1px solid rgb(87, 81, 81);
border-bottom: 1px solid rgb(87, 81, 81);
border-left: 1px solid rgb(87, 81, 81) ;
border-right: 1px solid rgb(87, 81, 81);
`


const Productpage= () => {
  const [similaproducts, setsimilaproducts] = useState()
  const [similarcategory, setsimilarcategory] = useState()
  const [count, setcount] = useState(0)
  const [image, setimage] = useState(0)
  const slider:any=document.querySelector('.slider')
  const s:any=similaproducts
  const t:any=similarcategory
  const { proinf, products } = useSelector((state:any)=>state)
  const navigate =useNavigate()
    
    useEffect(() => {
      const url:string=`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${proinf?.brand}`
      axios.get(url)
        .then(res=>setsimilaproducts(res.data))
        .catch(err=>console.log(err));
    }, [proinf])
    
    
    
    useEffect(() => {
      if (proinf){
        const s:any=products.filter((product:any)=>product.category.id===proinf.category.id)
        setsimilarcategory(s);
      }
    }, [proinf])
    
    

    const handleminus=()=>{
      if (count >= 1) {
        setcount(count-1)
      }
    }
    
    const handlscroll=(index:any)=>{
      slider.scrollLeft +=300
      if (index==0) {
        slider.scrollLeft =0
      }
      if (index==1) {
        slider.scrollLeft =300
      }
      if (index==2) {
        slider.scrollLeft =600
      }
    }


    

  return (
    <div className='contentall'>
      <div className='contpunto'>
        <h3 className='home' onClick={()=>navigate('/')}>home</h3>
        <div className='punto'></div>
        <div>{proinf?.title}</div>
      </div>

      <div className='sec1'>

        <div>
          <div className='slider'>
              {
                proinf?.images.map((im:any)=>{
                  return <div className='ss'>
                            <img className='im' src={`${im.url}`} alt="" />
                          </div>
                })
              }
          </div>

          <div className='contimages'>
            {
              proinf?.images.map((im:any,index:number)=>{
                return <div>
                          <img onClick={()=>handlscroll(index)} className={`imag selc${index}`} src={`${im.url}`} alt="" />
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
              <button className='btn2'>add to card <i className='bx bx-cart'></i></button>

            </div>
        </div>
      </div>

      <div className='cotentsimilarall'>
      <div className='Dis'>Discover similar items</div>
      <div className='contentsimilar'>
        {
            s?.map((produ:any)=>{
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