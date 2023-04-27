import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Products from '../componets/Products'
import './productpage.css'
import { useNavigate } from 'react-router-dom'
import config from '../utils/bearertoken'
import { Globalstore } from '../secstore/Store_global'
import { productts } from '../utils/interfase'
import { useAppSelector } from '../hooks/redux'


type props={
  setnavigator:(number:number)=>void,
}




const Productpage:React.FC<props>= ({setnavigator}) => {
  const [similar, setsimilar] = useState<productts[]>()
  const [similaproducts, setsimilaproducts] = useState<productts[]>()
  const [similarcategory, setsimilarcategory] = useState<productts[]>()
  const [add, setadd] = useState(1)
  const [count, setcount] = useState(0)
  const slider:HTMLButtonElement | null =document.querySelector('.slider')
  const [first, setfirst] = useState<productts>()

 
  const { todo } = useAppSelector((state)=>state)

  useEffect(() => {
      todo.todoCard.map(state=>{
        setfirst(state)
      })
  }, [todo])

  const [imgselect, setimgselect] = useState(0)
  const {pproducts, carshopp, ThunkCarshop  }=Globalstore()

  const navigate =useNavigate()
  const dispatch=useDispatch()
    
    useEffect(() => {
      setnavigator(6)
      const url:string=`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${first?.brand}`
      axios.get(url)
        .then(res=>setsimilaproducts(res.data))
        .catch(err=>console.log(err));
    }, [first])

      useEffect(() => {
         if ( similaproducts ) {
          setsimilar(similaproducts.filter((product)=>first?.id !=product.id))
          }
      }, [first,similaproducts])
      
      
 


    useEffect(() => {
      if (first){
        const s:productts[]=pproducts.filter((product)=>product.category.id===first.category.id)
        const t:productts[]=s.filter((product)=>first.id !=product.id)
        setsimilarcategory(t);
      }
    }, [first])
    
    
    const agregarcarrito=()=>{
      let s:number=0,t:number=0
      for (let index = 0; index < carshopp.length; index++) {
          if(first?.id===carshopp[index].productId){
              s=(carshopp[index].id)
              t=carshopp?.[index].quantity
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
              ThunkCarshop()
          })
    setcount(0)
      }else{
          if (add) {
              const url='https://e-commerce-api-v2.academlo.tech/api/v1/cart'
              const data={
                  quantity: add,
                  productId:first?.id
              }
              axios.post(url,data,config)
              .then(res=>{console.log('agregado con exito');
              ThunkCarshop()
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
    
    
    const handlscroll=(index:number)=>{
      if (slider) {
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

    }

    const hand1=()=>{
      if (slider) {
        slider.scrollLeft -= 100
        hand()
      }
    }
    const hand2=()=>{
      if (slider) {
        slider.scrollLeft += 100
        hand()
      }
    }


    const hand =():void=>{
if (slider) {

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


    }
    

  return (
    <div className='contentall'>
      <div className='contpunto'>
        <h3 className='home' onClick={()=>navigate('/')}>Home</h3>
        <div className='punto'></div>
        <div>{first?.title}</div>
      </div>

      <div className='sec1'>

        <div>
          <div className='slider'>
          
          <i onClick={()=>{{hand1()}}} className='buttrigh bx bxs-chevrons-left bx-lg'></i>

              {
                first?.images.map((im)=>{
                  return <div className='ss'>
                            <img className='im' src={`${im.url}`} alt="" />
                          </div>
                })
              }
              <i onClick={()=>{hand2()}} className='buttleft bx bxs-chevrons-right bx-lg'></i>
          </div>

          <div className='contimages'>
            {
              first?.images.map((im,index:number)=>{
                return <div className={`b ${index===imgselect && 'activ'}`}>
                          <img onClick={()=>handlscroll(index)} className={`imag `} src={`${im.url}`} alt="" />
                      </div>
                  })
            }
          </div>
          
        </div>
        <div className='cardinfo'>
            <div>
              <span>{first?.brand}</span>
              <h2>{first?.title}</h2>
            </div>
            <div>
              <p>{first?.description}</p>
            </div>

            <div className='contentvalues'>
              <div className='conprice'>
                <span>price</span>
                <b>{first?.price}</b>
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
            similar?.map((produ)=>{
                return <Products key={produ.id} produ={(produ)}/>
            }) 
        }
        {
            similarcategory?.map((produ)=>{
              return <Products key={produ.id} produ={(produ)}/>
            }) 
        }
      </div>
      
      </div>

    </div>
    

  )
}

export default Productpage